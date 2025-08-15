
import React, { useState, useCallback } from 'react';
import { Widget } from './Widget';
import type { WidgetProps } from '../types';
import { WIDGETS_DATA } from '../constants';
import { getDashboardSummary } from '../services/geminiService';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
    </div>
);

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    return (
        <div className="prose prose-sm prose-invert max-w-none">
            {lines.map((line, index) => {
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-white font-semibold text-base mt-4 mb-2">{line.substring(4)}</h3>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-cyan-400 font-bold text-lg mt-5 mb-2">{line.substring(3)}</h2>;
                }
                if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-white font-bold text-xl mt-6 mb-3">{line.substring(2)}</h1>;
                }
                if (line.trim().startsWith('* ')) {
                    return <li key={index} className="ml-4 list-disc text-slate-300">{line.substring(2)}</li>;
                }
                return <p key={index} className="text-slate-300">{line}</p>;
            })}
        </div>
    );
};


export const AIEnhancedSummaryWidget: React.FC<WidgetProps> = (props) => {
    const data = WIDGETS_DATA.aiSummary;
    const [summary, setSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateSummary = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setSummary('');
        try {
            const result = await getDashboardSummary();
            setSummary(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <Widget title={data.title} description={data.description} {...props}>
            <div className="flex flex-col h-full">
                {isLoading && <LoadingSpinner />}
                {error && <p className="text-red-400">Error: {error}</p>}
                {summary && <MarkdownRenderer content={summary} />}
                
                {!isLoading && !summary && !error && (
                    <div className="text-center flex-grow flex flex-col justify-center items-center">
                         <p className="text-slate-400 mb-4">Click the button to generate an AI-powered summary of your current dashboard data.</p>
                         <button
                            onClick={handleGenerateSummary}
                            className="bg-cyan-500/20 text-cyan-300 font-semibold px-4 py-2 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/40 transition-all"
                        >
                            Generate Weekly Summary
                        </button>
                    </div>
                )}

                 { !isLoading && (summary || error) && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={handleGenerateSummary}
                            disabled={isLoading}
                            className="text-xs text-slate-400 hover:text-white transition-colors"
                        >
                            {isLoading ? 'Generating...' : 'Regenerate Summary'}
                        </button>
                    </div>
                 )}
            </div>
        </Widget>
    );
};
