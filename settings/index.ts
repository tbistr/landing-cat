import { create } from "zustand";
import type { Bookmark } from "@/bookmarks/types";
import type { Subscription } from "@/rss/types";

export type Settings = {
	bookmarks: Bookmark[];
	rssSubscriptions: Subscription[];
};

const defaultSettings: Settings = {
	bookmarks: [
		{
			title: "Twitter home",
			url: "https://twitter.com/home",
		},
		{ title: "ChatGPT", url: "https://chat.openai.com" },
		{ title: "YouTube", url: "https://youtube.com" },
		{ title: "Feedly", url: "https://feedly.com" },
		{
			title: "Google Drive",
			url: "https://drive.google.com",
		},
		{
			title: "Amazon.co.jp",
			url: "https://www.amazon.co.jp",
		},
		{
			title: "Audible",
			url: "https://www.audible.co.jp",
		},
		{ title: "GitHub", url: "https://github.com" },
		{
			title: "Netflix",
			url: "https://www.netflix.com",
		},
		{
			title: "Moneyforward",
			url: "https://moneyforward.com",
		},
		{
			title: "Google Maps",
			url: "https://maps.google.com",
		},
		{
			title: "Dash.cloudflare",
			url: "https://dash.cloudflare.com",
		},
		{
			title: "Notion.so RSSS",
			url: "https://www.notion.so",
		},
		{ title: "My Prj", url: "https://www.notion.so" },
	],
	rssSubscriptions: [
		{
			title: "BBC",
			url: "https://feeds.bbci.co.uk/news/rss.xml",
		},
		{
			title: "Zenn",
			url: "https://zenn.dev/feed",
		},
	],
};

const STORAGE_KEY = "app:settings";

type SettingsStore = {
	settings: Settings | null;
	loading: boolean;
	error: string | null;
	store: (next: Settings) => Promise<void>;
	load: () => Promise<void>;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
	settings: null,
	loading: true,
	error: null,

	store: async (next: Settings) => {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
			set({ settings: next, error: null, loading: false });
		} catch (e) {
			set({
				error: e instanceof Error ? e.message : String(e),
				loading: false,
			});
		}
	},

	load: async () => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);

			if (!raw) {
				set({ settings: defaultSettings, loading: false, error: null });
				return;
			}

			const parsed = JSON.parse(raw) as Settings;
			set({ settings: parsed, loading: false, error: null });
		} catch (e) {
			set({
				error: e instanceof Error ? e.message : String(e),
				loading: false,
			});
		}
	},
}));

useSettingsStore.getState().load();
