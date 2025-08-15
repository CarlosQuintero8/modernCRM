
import React from 'react';
import { ResponsiveContainer, FunnelChart, Funnel, Tooltip, LabelList } from 'recharts';
import { Widget } from './Widget';
import type { WidgetProps } from '../types';
import { FUNNEL_DATA, WIDGETS_DATA } from '../constants';

export const ConversionFunnelWidget: React.FC<WidgetProps> = (props) => {
    const data = WIDGETS_DATA.conversionFunnel;
    return (
        <Widget title={data.title} description={data.description} {...props}>
            <div className="w-full h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <FunnelChart>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                                borderColor: '#475569',
                                color: '#cbd5e1'
                            }}
                            cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
                        />
                        <Funnel dataKey="value" data={FUNNEL_DATA} isAnimationActive>
                           <LabelList position="right" fill="#fff" stroke="none" dataKey="name" />
                           <LabelList position="center" fill="#fff" stroke="none" dataKey="value" formatter={(v: number) => v.toLocaleString()} />
                        </Funnel>
                    </FunnelChart>
                </ResponsiveContainer>
            </div>
        </Widget>
    );
};
