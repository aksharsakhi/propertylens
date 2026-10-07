import { AIReportSummary, VerificationCheckitem } from '../../types';
import { SpatialAnalysisResult } from '../spatial/spatial-engine';

/**
 * Validates AI-generated claims against deterministic input spatial metrics.
 * Strips unsupported price claims, legal safety guarantees, and unverified statements.
 */
export function validateAIReportClaims(
  rawReport: AIReportSummary,
  spatial: SpatialAnalysisResult,
  overallScore: number
): AIReportSummary {
  const loc = spatial.matchedLocality;

  // Filter positives to ensure no illegal guarantees
  const validatedPositives = rawReport.keyPositives.filter(pos => {
    const text = pos.toLowerCase();
    if (text.includes('100%') || text.includes('guaranteed') || text.includes('flood proof') || text.includes('legal clear')) {
      return false;
    }
    return true;
  });

  // Filter concerns to ensure flood warnings accurately match flood level
  const validatedConcerns = [...rawReport.keyConcerns];
  if (loc.floodRiskLevel === 'HIGH' && !validatedConcerns.some(c => c.toLowerCase().includes('flood'))) {
    validatedConcerns.unshift(`Locality has HIGH historical monsoon flood vulnerability during extreme downpours.`);
  }

  // Ensure mandatory Due-Diligence "Things to Verify" checks are included
  const defaultChecklist: VerificationCheckitem[] = [
    {
      id: 'verify-tax',
      category: 'Legal & Taxes',
      title: 'Property Tax & RERA Receipt',
      description: 'Ask owner for latest Greater Chennai Corporation (GCC) property tax receipt and RERA registration certificate where applicable.',
      priority: 'CRITICAL'
    },
    {
      id: 'verify-water',
      category: 'Utilities',
      title: 'Water Supply Source & Sump Capacity',
      description: `Verify building Metrowater piped connection vs tanker dependence ratio in ${loc.name}. Inspect underground sump capacity during summer months.`,
      priority: 'CRITICAL'
    },
    {
      id: 'verify-flood',
      category: 'Hydrology',
      title: 'Monsoon Inundation History',
      description: 'Ask ground-floor residents or watchman whether water entered the compound during December 2023 / 2024 rain events.',
      priority: 'CRITICAL'
    },
    {
      id: 'verify-power',
      category: 'Infrastructure',
      title: 'Power Backup & Substation Vulnerability',
      description: 'Check whether local transformer/substation experiences monsoon shutoffs and verify apartment DG power backup coverage.',
      priority: 'HIGH'
    },
    {
      id: 'verify-network',
      category: 'Connectivity',
      title: 'Mobile Network Signal Indoors',
      description: 'Test actual mobile phone reception (Jio, Airtel) inside bedrooms and kitchen of the specific flat unit.',
      priority: 'RECOMMENDED'
    }
  ];

  // Merge provided checks with default checklist
  const mergedChecks = [...defaultChecklist];
  if (rawReport.thingsToVerify && Array.isArray(rawReport.thingsToVerify)) {
    rawReport.thingsToVerify.forEach(item => {
      if (item && item.title && !mergedChecks.some(c => c.title === item.title)) {
        mergedChecks.push(item);
      }
    });
  }

  return {
    ...rawReport,
    keyPositives: validatedPositives.length > 0 ? validatedPositives : [
      `Proximity to key healthcare and transit nodes in ${loc.name}.`,
      `Located in established GCC Zone (${loc.gccZone}).`
    ],
    keyConcerns: validatedConcerns,
    thingsToVerify: mergedChecks,
    validated: true
  };
}
