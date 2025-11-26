import { BookmarkView } from "@/bookmarks";
import { RSSView } from "@/rss";

export const App = () => {
	return (
		<>
		<div className="p-4">
			<BookmarkView />
		</div>
		<div className="p-4">
			<RSSView />
		</div>
		</>
	);
};
