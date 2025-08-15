
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Widget } from './Widget';
import type { WidgetProps } from '../types';
import { LEAD_SOURCE_DATA, WIDGETS_DATA } from '../constants';

export const LeadSourcePieChartWidget: React.FC<WidgetProps> = (props) => {
    const data = WIDGETS_DATA.leadSources;
    return (
        <Widget title={data.title} description={data.description} {...props}>
             <div className="w-full h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip
                             contentStyle={{
                                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                                borderColor: '#475569',
                                color: '#cbd5e1'
                            }}
                             cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
                        />
                        <Legend iconType="circle" />
                        <Pie
                            data={LEAD_SOURCE_DATA}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            labelLine={false}
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) * 1.25;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                return (
                                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs">
                                        {`${(percent * 100).toFixed(0)}%`}
                                    </text>
                                );
                            }}
                        >
                            {LEAD_SOURCE_DATA.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Widget>
    );
};
