import React from 'react';
import { Widget } from './Widget';
import type { WidgetProps } from '../types';
import { ACTIVITY_DATA, WIDGETS_DATA } from '../constants';

const HeatmapCell: React.FC<{ value: number }> = ({ value }) => {
    let colorClass = 'bg-slate-700/50';
    if (value > 0) colorClass = 'bg-cyan-900';
    if (value > 10) colorClass = 'bg-cyan-700';
    if (value > 25) colorClass = 'bg-cyan-500';
    if (value > 40) colorClass = 'bg-cyan-300';

    return <div className={`w-full aspect-square rounded-sm ${colorClass}`} title={`Activity: ${value}`}></div>;
};

export const ActivityHeatmapWidget: React.FC<WidgetProps> = (props) => {
    const data = WIDGETS_DATA.activityHeatmap;

    return (
        <Widget title={data.title} description={data.description} {...props}>
            <div className="flex space-x-2">
                <div className="flex flex-col justify-around text-xs text-slate-400">
                    {['Mon', 'Wed', 'Fri'].map(day => <div key={day}>{day}</div>)}
                </div>
                <div 
                    className="grid grid-rows-7 gap-1 flex-grow" 
                    style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}
                >
                    {ACTIVITY_DATA.map((activity, index) => (
                        <HeatmapCell key={index} value={activity.value} />
                    ))}
                </div>
            </div>
        </Widget>
    );
};
