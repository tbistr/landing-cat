import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getOGP } from "./query";
import type { Article } from "./types";

export const FeedCard = ({ feed }: { feed: Article }) => {
	const { data: ogpURL, isPending } = useQuery({
		queryKey: ["ogp", feed.url],
		queryFn: () => getOGP(feed.url),
		staleTime: 1000 * 60 * 10, // 10分キャッシュ（OGPは頻繁に変わらない）
	});

	return (
		<a
			href={feed.url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={feed.title}
			title={feed.title}
		>
			<Card
				className={cn(
					"overflow-hidden",
					"duration-150 hover:-translate-y-1",
					"py-0",
				)}
			>
				<CardContent className="p-0">
					{isPending && (
						<div className="aspect-video w-full bg-gray-100 animate-pulse" />
					)}

					{!isPending && ogpURL && (
						<img
							src={ogpURL}
							alt={feed.title}
							className="aspect-video w-full object-cover"
							loading="lazy"
						/>
					)}

					<p className="font-medium line-clamp-2 p-3">{feed.title}</p>
				</CardContent>
			</Card>
		</a>
	);
};
