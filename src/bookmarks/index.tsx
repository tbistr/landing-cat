import { Button, Center, Group, Title } from "@mantine/core";

import "@mantine/core/styles.css";

import { SimpleGrid } from "@mantine/core";
import type React from "react";
import { useEffect, useState } from "react";
import {
	AddIconBookmarkCard,
	BookmarkCard,
	EditableBookmarkCard,
} from "@/bookmarks/Card";
import { getBookmarks, setBookmarks } from "./store";
import type { Bookmark } from "./types";

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

export const BookmarksGrid = (props: {
	bookmarkCardElements: ReadonlyArray<React.ReactNode>;
}) => {
	return (
		<SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
			{props.bookmarkCardElements}
		</SimpleGrid>
	);
};

export const BookmarkView = () => {
	const [bookmarks, setBookmarksState] = useState<Bookmark[]>([]);
	const [editable, setEditable] = useState(false);

	useEffect(() => {
		(async () => {
			const items = await getBookmarks();
			setBookmarksState(items);
		})();
	}, []);
	// ローカルstateを更新しつつ、ストレージへは裏で保存（awaitしない）
	const save = (next: Bookmark[] | ((prev: Bookmark[]) => Bookmark[])) => {
		setBookmarksState((prev) => {
			const resolved = typeof next === "function" ? next(prev) : next;
			setBookmarks(resolved).catch(console.error);
			return resolved;
		});
	};

	const setDefaultLinks = () => {
		save(DEFAULT_LINKS);
	};

	const toggleEditable = () => setEditable((prev) => !prev);

	const handleEditBookmark = (bookmark: Bookmark) => {
		save((prev) =>
			prev.map((b) =>
				b.id === bookmark.id
					? { ...b, title: bookmark.title, url: bookmark.url }
					: b,
			),
		);
	};

	const handleDeleteBookmark = (bookmark: Bookmark) => {
		save((prev) => prev.filter((b) => b.id !== bookmark.id));
	};

	const handleAddBookmark = (bookmark: Bookmark) => {
		save((prev) => [...prev, bookmark]);
	};

	return (
		<>
			<Group h="100%" px="md" justify="space-between">
				<Title order={4}>Bookmarks</Title>
				<Group>
					<Button onClick={setDefaultLinks}>Set Default Links</Button>
					<Button onClick={toggleEditable}>
						{editable ? "Disable Editing" : "Enable Editing"}
					</Button>
				</Group>
			</Group>
			<Center p="md">
				{editable ? (
					<BookmarksGrid
						bookmarkCardElements={[
							...bookmarks.map((item) => (
								<EditableBookmarkCard
									key={item.id}
									item={item}
									onEdit={handleEditBookmark}
									onDelete={handleDeleteBookmark}
								/>
							)),
							<AddIconBookmarkCard key="add" onAdd={handleAddBookmark} />,
						]}
					/>
				) : (
					<BookmarksGrid
						bookmarkCardElements={bookmarks.map((item) => (
							<BookmarkCard key={item.id} item={item} />
						))}
					/>
				)}
			</Center>
		</>
	);
};
