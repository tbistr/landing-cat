import { ExternalLink } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Bookmark } from "./types";

export const BookmarkCard = ({ bookmark }: { bookmark: Bookmark }) => {
	return (
		<a
			href={bookmark.url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={bookmark.title}
			title={bookmark.title}
		>
			<Card className={cn("py-4", "duration-150 hover:-translate-y-1")}>
				<CardContent className="px-3">
					<div className="flex items-center gap-2">
						<img
							src={bookmark.imageUrl}
							alt="favicon"
							className="h-5 w-5"
							loading="lazy"
						/>
						<p className="truncate font-medium">{bookmark.title}</p>
					</div>
				</CardContent>
			</Card>
		</a>
	);
};
