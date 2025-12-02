import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookmarkView } from "@/bookmarks";
import { RSSView } from "@/rss";
import { SettingsDialog } from "@/settings/Dialog";
import { Header } from "./Header";

const queryClient = new QueryClient();

export const App = () => {
	const [settingsOpened, setSettingsOpened] = useState(false);
	return (
		<QueryClientProvider client={queryClient}>
			<Header onClickSettings={() => setSettingsOpened(true)} />
			<SettingsDialog open={settingsOpened} onOpenChange={setSettingsOpened} />
			<div className="p-4">
				<BookmarkView />
			</div>
			<div className="p-4">
				<RSSView />
			</div>
		</QueryClientProvider>
	);
};
