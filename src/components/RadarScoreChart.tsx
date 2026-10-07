'use client';

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CategoryScore } from '../types';

interface RadarScoreChartProps {
  categories: CategoryScore[];
}

export const RadarScoreChart: React.FC<RadarScoreChartProps> = ({ categories }) => {
  const chartData = categories.map(cat => ({
    subject: cat.name.replace(' & Infrastructure', '').replace(' Infrastructure', '').replace(' Access', ''),
    score: cat.score,
    fullMark: 100
  }));

  return (
    <div className="w-full h-72 sm:h-80 relative flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#334155" strokeDasharray="3 3" />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 9 }} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#2dd4bf"
            fill="#14b8a6"
            fillOpacity={0.45}
            dot={{ r: 4, fill: '#5eead4', stroke: '#0f766e' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '12px',
              color: '#f8fafc',
              fontSize: '12px',
              fontWeight: 600
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
