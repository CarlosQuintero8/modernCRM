import React from 'react';

export interface SalesMetric {
  label: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
}

export interface FunnelStage {
  name: string;
  value: number;
  fill: string;
}

export interface LeadSource {
  name: string;
  value: number;
  fill: string;
}

export interface Campaign {
  name: string;
  cost: number;
  revenue: number;
  roi: number;
}

export interface Activity {
  day: string;
  value: number;
}

export interface RecentActivityItem {
    id: number;
    type: 'deal' | 'call' | 'email' | 'meeting';
    description: string;
    person: string;
    time: string;
}

export type WidgetKey = 
  | 'salesMetrics'
  | 'conversionFunnel'
  | 'leadSources'
  | 'campaignPerformance'
  | 'activityHeatmap'
  | 'recentActivity'
  | 'aiSummary';

export interface WidgetData {
    title: string;
    description: string;
    gridSpan: number;
}

export interface WidgetProps {
    isCustomizeMode: boolean;
    onMoveUp: () => void;
    onMoveDown: () => void;
    isFirst: boolean;
    isLast: boolean;
}