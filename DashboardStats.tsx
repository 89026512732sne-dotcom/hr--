import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Booking } from './types';

interface DashboardStatsProps {
  bookings: Booking[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ bookings }) => {
  // Process data to count bookings per hour start time
  const dataMap = bookings.reduce((acc, curr) => {
    const hour = parseInt(curr.startTime.split(':')[0]);
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const data = Object.keys(dataMap).map(hour => ({
    name: `${hour}:00`,
    count: dataMap[parseInt(hour)]
  })).sort((a, b) => parseInt(a.name) - parseInt(b.name));

  if (data.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Загруженность по часам</h3>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#9CA3AF'}} 
            />
            <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                cursor={{fill: '#ECFDF5'}}
                formatter={(value) => [`${value} бронир.`, 'Записей']}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#10B981" fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardStats;