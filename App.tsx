
import React, { useState, useCallback } from 'react';
import { SalesMetricsWidget } from './components/SalesMetricsWidget';
import { ConversionFunnelWidget } from './components/ConversionFunnelWidget';
import { LeadSourcePieChartWidget } from './components/LeadSourcePieChartWidget';
import { CampaignPerformanceWidget } from './components/CampaignPerformanceWidget';
import { ActivityHeatmapWidget } from './components/ActivityHeatmapWidget';
import { RecentActivityWidget } from './components/RecentActivityWidget';
import { AIEnhancedSummaryWidget } from './components/AIEnhancedSummaryWidget';
import { Header } from './components/Header';
import { WIDGETS_DATA } from './constants';
import type { WidgetKey, WidgetProps } from './types';

const widgetMap: Record<WidgetKey, React.FC<WidgetProps>> = {
  salesMetrics: SalesMetricsWidget,
  conversionFunnel: ConversionFunnelWidget,
  leadSources: LeadSourcePieChartWidget,
  campaignPerformance: CampaignPerformanceWidget,
  activityHeatmap: ActivityHeatmapWidget,
  recentActivity: RecentActivityWidget,
  aiSummary: AIEnhancedSummaryWidget,
};

const App: React.FC = () => {
  const [isCustomizeMode, setIsCustomizeMode] = useState<boolean>(false);
  const [widgets, setWidgets] = useState<WidgetKey[]>([
    'salesMetrics',
    'aiSummary',
    'conversionFunnel',
    'leadSources',
    'campaignPerformance',
    'activityHeatmap',
    'recentActivity'
  ]);

  const moveWidget = useCallback((index: number, direction: 'up' | 'down') => {
    const newWidgets = [...widgets];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newWidgets.length) {
      [newWidgets[index], newWidgets[targetIndex]] = [newWidgets[targetIndex], newWidgets[index]];
      setWidgets(newWidgets);
    }
  }, [widgets]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-black">
      <Header isCustomizeMode={isCustomizeMode} onCustomizeToggle={() => setIsCustomizeMode(prev => !prev)} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {widgets.map((widgetKey, index) => {
            const WidgetComponent = widgetMap[widgetKey];
            if (!WidgetComponent) return null;
            
            const { gridSpan } = WIDGETS_DATA[widgetKey];
            const colSpanClass = `lg:col-span-${gridSpan}`;

            return (
              <div key={widgetKey} className={`${colSpanClass} md:col-span-2`}>
                 <WidgetComponent 
                    isCustomizeMode={isCustomizeMode} 
                    onMoveUp={() => moveWidget(index, 'up')} 
                    onMoveDown={() => moveWidget(index, 'down')}
                    isFirst={index === 0}
                    isLast={index === widgets.length - 1}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default App;
