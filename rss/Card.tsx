import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Feed } from "./types";

export const FeedCard = ({ feed }: { feed: Feed }) => {
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
					{feed.imageUrl && (
						<img
							src={feed.imageUrl}
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
