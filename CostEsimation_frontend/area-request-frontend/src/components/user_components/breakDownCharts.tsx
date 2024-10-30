import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CostBreakdownChartProps {
  data: { resource: string; amount: number }[];
}

const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({ data }) => {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="resource" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" fill="#0d47a1" />
    </BarChart>
  );
};

export default CostBreakdownChart;
