import { BookmarkCard } from "@/bookmarks/Card";
import { cn } from "@/lib/utils";
import type { Bookmark } from "./types";

const DEFAULT_LINKS: Bookmark[] = [
	{
		id: "1",
		title: "Twitter home",
		url: "https://twitter.com/home",
	},
	{ id: "2", title: "ChatGPT", url: "https://chat.openai.com" },
	{ id: "3", title: "YouTube", url: "https://youtube.com" },
	{ id: "4", title: "Feedly", url: "https://feedly.com" },
	{
		id: "5",
		title: "Google Drive",
		url: "https://drive.google.com",
	},
	{
		id: "6",
		title: "Amazon.co.jp",
		url: "https://www.amazon.co.jp",
	},
	{
		id: "7",
		title: "Audible",
		url: "https://www.audible.co.jp",
	},
	{ id: "8", title: "GitHub", url: "https://github.com" },
	{
		id: "9",
		title: "Netflix",
		url: "https://www.netflix.com",
	},
	{
		id: "10",
		title: "Moneyforward",
		url: "https://moneyforward.com",
	},
	{
		id: "11",
		title: "Google Maps",
		url: "https://maps.google.com",
	},
	{
		id: "12",
		title: "Dash.cloudflare",
		url: "https://dash.cloudflare.com",
	},
	{
		id: "13",
		title: "Notion.so RSSS",
		url: "https://www.notion.so",
	},
	{ id: "14", title: "My Prj", url: "https://www.notion.so" },
];

export const BookmarkView = () => {
	return (
		<>
			<p className="text-md">ブックマーク一覧</p>
			<div
				className={cn(
					"p-4 max-w-6xl mx-auto",
					"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4",
				)}
			>
				{DEFAULT_LINKS.map((item) => (
					<BookmarkCard
						bookmark={{
							...item,
							imageUrl: `https://favicon.is/${item.url}?larger=true`,
						}}
						key={item.id}
					/>
				))}
			</div>
		</>
	);
};
