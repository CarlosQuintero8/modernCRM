
import React from 'react';
import { LogoIcon } from './Icons';

interface HeaderProps {
    isCustomizeMode: boolean;
    onCustomizeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isCustomizeMode, onCustomizeToggle }) => {
    return (
        <header className="p-4 sm:p-6 lg:p-8 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <LogoIcon />
                <h1 className="text-2xl font-bold text-white tracking-tight">Modern CRM</h1>
            </div>
            <button
                onClick={onCustomizeToggle}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isCustomizeMode
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
            >
                {isCustomizeMode ? 'Done' : 'Customize'}
            </button>
        </header>
    );
};
