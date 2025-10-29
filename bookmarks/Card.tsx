import { Card, CardContent } from "@/components/ui/card";
import type { Bookmark } from "./types";

export const BookmarkCard = (props: { bookmark: Bookmark }) => {
	const handleClick = () => {
		window.open(props.bookmark.url, "_blank");
	};

	return (
		<Card
			className="max-w-md cursor-pointer hover:shadow-md transition-shadow flex flex-col"
			onClick={handleClick}
		>
			<CardContent className="pb-2 flex-1 flex flex-col">
				{props.bookmark.imageUrl && (
					<div className="w-full h-24 mb-2 rounded-md overflow-hidden">
						<img
							src={props.bookmark.imageUrl}
							alt={props.bookmark.title}
							className="w-full h-full object-contain"
							onError={(e) => {
								e.currentTarget.style.display = "none";
							}}
						/>
					</div>
				)}
				<div className="text-center text-lg">{props.bookmark.title}</div>
			</CardContent>
		</Card>
	);
};
