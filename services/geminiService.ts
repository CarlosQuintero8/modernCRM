import { GoogleGenAI } from '@google/genai';
import {
	SALES_METRICS_DATA,
	CAMPAIGN_DATA,
	LEAD_SOURCE_DATA,
} from '../constants';

// Use Vite's import.meta.env for environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
	console.warn('API_KEY not found. AI features will be disabled.');
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getDashboardSummary = async (): Promise<string> => {
	if (!API_KEY) {
		return Promise.resolve(
			'API Key not configured. Please set the `API_KEY` environment variable to use this feature.',
		);
	}

	const dataToAnalyze = {
		salesMetrics: SALES_METRICS_DATA.map((m) => ({
			label: m.label,
			value: m.value,
			change: m.change,
		})),
		campaigns: CAMPAIGN_DATA,
		leadSources: LEAD_SOURCE_DATA,
	};

	const prompt = `
        You are a senior business analyst providing a weekly summary for a CRM dashboard.
        Analyze the following data and provide a concise, insightful summary with actionable recommendations.
        Format your response in markdown with clear headings and bullet points.
        Focus on:
        1.  Overall sales performance trends.
        2.  The most and least effective marketing campaigns.
        3.  Key insights from lead generation channels.
        4.  One or two critical recommendations for the upcoming week.

        Here is the data:
        ${JSON.stringify(dataToAnalyze, null, 2)}
    `;

	try {
		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: prompt,
		});
		return response.text;
	} catch (error) {
		console.error('Error fetching summary from Gemini API:', error);
		return 'An error occurred while generating the AI summary. Please check the console for details.';
	}
};
