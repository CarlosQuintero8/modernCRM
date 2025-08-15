
import React from 'react';
import type { WidgetProps } from '../types';

interface Props extends WidgetProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const CustomizeButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="p-1 rounded-md text-slate-400 hover:bg-slate-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
        {children}
    </button>
);

const UpArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
);

const DownArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);


export const Widget: React.FC<Props> = ({ title, description, children, isCustomizeMode, onMoveUp, onMoveDown, isFirst, isLast }) => {
    return (
        <div className="h-full flex flex-col bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg transition-all duration-300 hover:border-slate-600 hover:shadow-cyan-500/10">
            <header className="p-4 border-b border-slate-700 flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-white">{title}</h3>
                    <p className="text-sm text-slate-400">{description}</p>
                </div>
                {isCustomizeMode && (
                    <div className="flex items-center space-x-1 flex-shrink-0 ml-4">
                        <CustomizeButton onClick={onMoveUp} disabled={isFirst}>
                            <UpArrowIcon />
                        </CustomizeButton>
                        <CustomizeButton onClick={onMoveDown} disabled={isLast}>
                           <DownArrowIcon />
                        </CustomizeButton>
                    </div>
                )}
            </header>
            <div className="p-4 flex-grow">
                {children}
            </div>
        </div>
    );
};
