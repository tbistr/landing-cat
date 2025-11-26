import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { FeedCard } from "./Card";
import { fetchFromBackground } from "./query";
import type { Article, Subscription } from "./types";

const SUBSCRIPTIONS: Subscription[] = [
	{
		id: "1",
		title: "BBC",
		url: "https://feeds.bbci.co.uk/news/rss.xml",
	},
	{
		id: "2",
		title: "Zenn",
		url: "https://zenn.dev/feed",
	},
];

const fetchFeeds = async (): Promise<
	{ id: string; title: string; articles: Article[] }[]
> => {
	const feeds = await Promise.all(
		SUBSCRIPTIONS.map(async (sub) => {
			const data = await fetchFromBackground(sub.url);

			const articles: Article[] = (data?.items || []).map((item) => ({
				id: item.title || "unknown",
				title: item.title || "No Title",
				url: item.link || "#",
			}));

			const feed = {
				id: sub.id,
				title: sub.title,
				articles,
			};

			console.log("Fetched feed:", feed);
			return feed;
		}),
	);

	return feeds;
};

export const RSSView = () => {
	const {
		data: feeds = [],
		isPending,
		error,
	} = useQuery({
		queryKey: ["feeds"], // キャッシュキー
		queryFn: fetchFeeds,
	});

	if (isPending) {
		return <p className="p-4">読み込み中...</p>;
	}

	if (error) {
		return <p className="p-4 text-red-500">フィードの取得に失敗しました</p>;
	}

	return (
		<>
			{feeds.map((feed) => (
				<section key={feed.id}>
					<p className="text-md">{feed.title} フィード一覧</p>
					<div
						className={cn(
							"p-4 max-w-6xl mx-auto",
							"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4",
						)}
					>
						{feed.articles.map((item) => (
							<FeedCard
								feed={{
									id: item.title,
									title: item.title,
									url: item.url,
									imageUrl: `https://favicon.is/${item.url}?larger=true`,
								}}
								key={item.id}
							/>
						))}
					</div>
				</section>
			))}
		</>
	);
};
