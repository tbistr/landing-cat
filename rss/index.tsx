import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/settings";
import { FeedCard } from "./Card";
import { fetchFromBackground } from "./query";
import type { Article, Subscription } from "./types";

const fetchFeeds = async (
	subs: Subscription[],
): Promise<{ sub: Subscription; articles: Article[] }[]> => {
	const feeds = await Promise.all(
		subs.map(async (sub) => {
			const data = await fetchFromBackground(sub.url);

			const articles: Article[] = (data?.items || []).map((item) => ({
				title: item.title || "No Title",
				url: item.link || "#",
			}));

			const feed = { sub, articles };

			console.log("Fetched feed:", feed);
			return feed;
		}),
	);

	return feeds;
};

export const RSSView = () => {
	const {
		settings,
		loading: settingsLoading,
		error: settingsError,
	} = useSettingsStore();

	const subscriptions = settings?.rssSubscriptions ?? [];
	const {
		data: feeds = [],
		isPending,
		error,
	} = useQuery({
		queryKey: ["feeds", subscriptions], // 設定が変わったら再フェッチ
		queryFn: () => fetchFeeds(subscriptions),
		enabled: subscriptions.length > 0, // 購読がある場合のみ有効化
	});

	// 設定ロード状態のハンドリング（SWR っぽく）
	if (settingsLoading) {
		return <p className="p-4">設定を読み込み中...</p>;
	}

	if (settingsError) {
		return (
			<p className="p-4 text-red-500">
				設定の読み込みに失敗しました: {settingsError}
			</p>
		);
	}

	if (!settings) {
		return (
			<p className="p-4">
				RSS購読の設定がまだありません。設定画面から購読フィードを追加してください。
			</p>
		);
	}

	if (subscriptions.length === 0) {
		return (
			<p className="p-4">
				購読中のフィードがありません。設定画面から追加してください。
			</p>
		);
	}

	if (isPending) {
		return <p className="p-4">フィードを読み込み中...</p>;
	}

	if (error) {
		return <p className="p-4 text-red-500">フィードの取得に失敗しました</p>;
	}

	return (
		<>
			{feeds.map((feed) => (
				<section key={feed.sub.title}>
					<p className="text-md">{feed.sub.title} フィード一覧</p>
					<div
						className={cn(
							"p-4 max-w-6xl mx-auto",
							"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
						)}
					>
						{feed.articles.map((item) => (
							<FeedCard
								feed={{
									title: item.title,
									url: item.url,
									imageUrl: `https://favicon.is/${item.url}?larger=true`,
								}}
								key={item.url}
							/>
						))}
					</div>
				</section>
			))}
		</>
	);
};
