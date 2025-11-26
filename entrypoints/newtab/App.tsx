import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookmarkView } from "@/bookmarks";
import { RSSView } from "@/rss";

const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="p-4">
				<BookmarkView />
			</div>
			<div className="p-4">
				<RSSView />
			</div>
		</QueryClientProvider>
	);
};
