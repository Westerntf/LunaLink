'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const mockEarnings = [50, 120, 90, 170, 200, 250, 300];
const mockLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const data = {
  labels: mockLabels,
  datasets: [
    {
      label: 'Earnings',
      data: mockEarnings,
      fill: false,
      borderColor: '#9333ea',
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        color: '#ccc',
      },
      grid: {
        color: '#333',
      },
    },
    x: {
      ticks: {
        color: '#ccc',
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: any) => `$${context.parsed.y}`,
      },
    },
  },
};

export default function EarningsGraph() {
  const [range] = useState('This Week');

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Earnings Overview</h2>
        <span className="text-sm text-neutral-400">{range}</span>
      </div>
      <Line data={data} options={options} />
      <div className="grid grid-cols-3 gap-4 text-sm text-neutral-300">
        <div>
          <p className="text-white font-semibold">$250</p>
          <p className="text-xs">This Week</p>
        </div>
        <div>
          <p className="text-white font-semibold">$1,020</p>
          <p className="text-xs">This Month</p>
        </div>
        <div>
          <p className="text-white font-semibold">$5,480</p>
          <p className="text-xs">All Time</p>
        </div>
      </div>
    </div>
  );
}
