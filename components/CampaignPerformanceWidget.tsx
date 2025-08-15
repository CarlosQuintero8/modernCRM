
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Widget } from './Widget';
import type { WidgetProps } from '../types';
import { CAMPAIGN_DATA, WIDGETS_DATA } from '../constants';

export const CampaignPerformanceWidget: React.FC<WidgetProps> = (props) => {
    const data = WIDGETS_DATA.campaignPerformance;
    const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;

    return (
        <Widget title={data.title} description={data.description} {...props}>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CAMPAIGN_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.5}/>
                        <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} className="text-xs" />
                        <YAxis tick={{ fill: '#94a3b8' }} className="text-xs" tickFormatter={formatCurrency} />
                        <Tooltip
                             contentStyle={{
                                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                                borderColor: '#475569',
                                color: '#cbd5e1'
                            }}
                            cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
                            formatter={(value: number, name: string) => (name === 'ROI' ? `${value}%` : `$${value.toLocaleString()}`)}
                        />
                        <Legend wrapperStyle={{fontSize: '14px'}} />
                        <Bar dataKey="cost" stackId="a" fill="#8884d8" name="Cost" />
                        <Bar dataKey="revenue" stackId="a" fill="#82ca9d" name="Revenue" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Widget>
    );
};
