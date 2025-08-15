import { AppShell, Button, Group, MantineProvider, Title } from "@mantine/core";
import { createRoot } from "react-dom/client";

import "@mantine/core/styles.css";
import {
	AddIconBookmarkCard,
	BookmarkCard,
	EditableBookmarkCard,
} from "@/bookmarks/BookmarkCard";
import { getBookmarks } from "@/bookmarks/store";
import type { Bookmark } from "@/bookmarks/types";
import { BookmarksGrid } from "./Grid";

const DEFAULT_LINKS: Bookmark[] = [
	{
		id: "1",
		title: "Twitter home",
		url: "https://twitter.com/home",
	},
	{ id: "2", title: "ChatGPT", url: "https://chat.openai.com" },
	{ id: "3", title: "YouTube", url: "https://youtube.com" },
	{ id: "4", title: "Feedly", url: "https://feedly.com" },
	{
		id: "5",
		title: "Google Drive",
		url: "https://drive.google.com",
	},
	{
		id: "6",
		title: "Amazon.co.jp",
		url: "https://www.amazon.co.jp",
	},
	{
		id: "7",
		title: "Audible",
		url: "https://www.audible.co.jp",
	},
	{ id: "8", title: "GitHub", url: "https://github.com" },
	{
		id: "9",
		title: "Netflix",
		url: "https://www.netflix.com",
	},
	{
		id: "10",
		title: "Moneyforward",
		url: "https://moneyforward.com",
	},
	{
		id: "11",
		title: "Google Maps",
		url: "https://maps.google.com",
	},
	{
		id: "12",
		title: "Dash.cloudflare",
		url: "https://dash.cloudflare.com",
	},
	{
		id: "13",
		title: "Notion.so RSSS",
		url: "https://www.notion.so",
	},
	{ id: "14", title: "My Prj", url: "https://www.notion.so" },
];

function AppShellLayout() {
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const [editable, setEditable] = useState(false);

	useEffect(() => {
		getBookmarks().then((items) => {
			setBookmarks(items);
		});
	}, []);

	const setDefaultLinks = async () => {
		setBookmarks(DEFAULT_LINKS);
	};

	const removeDefaultLinks = async () => {
		setBookmarks([]);
	};

	const toggleEditable = () => {
		setEditable((prev) => !prev);
	};

	return (
		<div style={{ position: "relative" }}>
			<AppShell
				header={{ height: 56 }}
				padding="md"
				style={{ background: "transparent", position: "relative", zIndex: 1 }}
			>
				<AppShell.Header>
					<Group h="100%" px="md" justify="space-between">
						<Title order={4}>My Links</Title>
						<Group>
							<Button onClick={setDefaultLinks}>Set Default Links</Button>
							<Button onClick={removeDefaultLinks}>Remove Default Links</Button>
							<Button onClick={toggleEditable}>
								{editable ? "Disable Editing" : "Enable Editing"}
							</Button>
						</Group>
					</Group>
				</AppShell.Header>
				<AppShell.Main style={{ background: "transparent" }}>
					<div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 12 }}>
						{editable ? (
							<BookmarksGrid
								bookmarkCardElements={[
									...bookmarks.map((item) => (
										<EditableBookmarkCard
											key={item.id}
											item={item}
											onRemove={(id) => {}}
											onUpdate={(id) => {}}
										/>
									)),
									<AddIconBookmarkCard
										key="add"
										onClick={() => {
											// Logic to add a new bookmark
										}}
									/>,
								]}
							/>
						) : (
							<BookmarksGrid
								bookmarkCardElements={bookmarks.map((item) => (
									<BookmarkCard key={item.id} item={item} />
								))}
							/>
						)}
					</div>
				</AppShell.Main>
			</AppShell>
		</div>
	);
}

function App() {
	return (
		<MantineProvider defaultColorScheme="dark">
			<AppShellLayout />
		</MantineProvider>
	);
}

// biome-ignore lint/style/noNonNullAssertion: We are sure the root element exists.
createRoot(document.getElementById("root")!).render(<App />);
