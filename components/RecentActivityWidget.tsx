
import React from 'react';
import { Widget } from './Widget';
import type { WidgetProps, RecentActivityItem } from '../types';
import { RECENT_ACTIVITY_DATA, WIDGETS_DATA } from '../constants';

const ActivityIcon: React.FC<{ type: RecentActivityItem['type'] }> = ({ type }) => {
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0";
    const icons = {
        deal: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
        call: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
        email: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
        meeting: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    };
    const colors = {
        deal: 'bg-green-500/80',
        call: 'bg-blue-500/80',
        email: 'bg-yellow-500/80',
        meeting: 'bg-purple-500/80',
    };
    return <div className={`${baseClasses} ${colors[type]}`}>{icons[type]}</div>;
};

export const RecentActivityWidget: React.FC<WidgetProps> = (props) => {
    const data = WIDGETS_DATA.recentActivity;
    return (
        <Widget title={data.title} description={data.description} {...props}>
            <div className="space-y-4">
                {RECENT_ACTIVITY_DATA.map(item => (
                    <div key={item.id} className="flex items-start space-x-3">
                        <ActivityIcon type={item.type} />
                        <div>
                            <p className="text-sm text-slate-300">
                                <span className="font-semibold text-white">{item.person}</span> {item.description}
                            </p>
                            <p className="text-xs text-slate-500">{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Widget>
    );
};
