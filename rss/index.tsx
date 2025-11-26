import type { DeepPartial, Rss } from "feedsmith/types";
import { cn } from "@/lib/utils";
import { FeedCard } from "./Card";
import { fetchFromBackground } from "./fetch";
import type { Subscription } from "./types";

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

export const RSSView = () => {
	const [feeds, setFeeds] = useState<DeepPartial<Rss.Feed<string>>[]>([]);
	useEffect(() => {
		for (const sub of SUBSCRIPTIONS) {
			fetchFromBackground(sub.url).then((f) => {
				setFeeds((prev) => [...prev, f]);
			});
		}
	}, []);

	return feeds.map(
		(feed) =>
			feed.items && (
				<>
					<p className="text-md">{feed.title} フィード一覧</p>
					<div
						className={cn(
							"p-4 max-w-6xl mx-auto",
							"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4",
						)}
					>
						{feed.items.map((item) => (
							<FeedCard
								feed={{
									id: item.title || "unknown",
									title: item.title || "No Title",
									url: item.link || "#",
									imageUrl: `https://favicon.is/${item.link}?larger=true`,
								}}
								key={item.title || "unknown"}
							/>
						))}
					</div>
				</>
			),
	);
};
