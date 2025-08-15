import React from 'react';
import { Widget } from './Widget';
import type { WidgetProps, SalesMetric } from '../types';
import { SALES_METRICS_DATA, WIDGETS_DATA } from '../constants';

const MetricCard: React.FC<{ metric: SalesMetric }> = ({ metric }) => {
    const isIncrease = metric.changeType === 'increase';
    const Icon = metric.icon;
    return (
        <div className="bg-slate-700/50 p-4 rounded-lg flex-1">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{metric.label}</p>
                <div className="text-slate-500"><Icon /></div>
            </div>
            <p className="text-2xl font-bold text-white mt-2">{metric.value}</p>
            <p className={`text-sm font-semibold mt-1 ${isIncrease ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
            </p>
        </div>
    );
};

export const SalesMetricsWidget: React.FC<WidgetProps> = (props) => {
    const data = WIDGETS_DATA.salesMetrics;
    return (
        <Widget title={data.title} description={data.description} {...props}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
                {SALES_METRICS_DATA.map(metric => (
                    <MetricCard key={metric.label} metric={metric} />
                ))}
            </div>
        </Widget>
    );
};