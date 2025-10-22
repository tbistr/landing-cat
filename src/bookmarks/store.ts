import { storage } from "#imports";
import type { Bookmark } from "./types";

const bookmarksItem = storage.defineItem<Bookmark[]>("local:bookmarks", {
	fallback: [],
});

export const getBookmarks = async (): Promise<Bookmark[]> => {
	return bookmarksItem.getValue();
};

export const setBookmarks = async (bookmarks: Bookmark[]) => {
	return bookmarksItem.setValue(bookmarks);
};
