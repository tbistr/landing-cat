import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";

import type { Bookmark } from "@/bookmarks/types";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Subscription } from "@/rss/types";

import { useSettingsStore } from ".";

export const SettingsDialog = (props: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) => {
	const { settings, loading, store } = useSettingsStore();
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const [rssSubscriptions, setRssSubscriptions] = useState<Subscription[]>([]);
	const [newBookmark, setNewBookmark] = useState({ title: "", url: "" });
	const [newRssSubscription, setNewRssSubscription] = useState({
		title: "",
		url: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	// dnd-kit センサー（マウス / タッチ操作）
	const sensors = useSensors(useSensor(PointerSensor));

	useEffect(() => {
		if (settings) {
			setBookmarks(settings.bookmarks);
			setRssSubscriptions(settings.rssSubscriptions);
		}
	}, [settings]);

	const addBookmark = () => {
		if (newBookmark.title && newBookmark.url) {
			const updatedBookmarks = [...bookmarks, { ...newBookmark }];
			setBookmarks(updatedBookmarks);
			setNewBookmark({ title: "", url: "" });
		}
	};

	const removeBookmark = (index: number) => {
		const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
		setBookmarks(updatedBookmarks);
	};

	const addRssSubscription = () => {
		if (newRssSubscription.title && newRssSubscription.url) {
			const updatedRssSubscriptions = [
				...rssSubscriptions,
				{ ...newRssSubscription },
			];
			setRssSubscriptions(updatedRssSubscriptions);
			setNewRssSubscription({ title: "", url: "" });
		}
	};

	const removeRssSubscription = (index: number) => {
		const updatedRssSubscriptions = rssSubscriptions.filter(
			(_, i) => i !== index,
		);
		setRssSubscriptions(updatedRssSubscriptions);
	};

	// ブックマークの並び替え処理
	const handleBookmarkDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = Number(active.id);
		const newIndex = Number(over.id);

		setBookmarks((items) => arrayMove(items, oldIndex, newIndex));
	};

	// RSS購読の並び替え処理
	const handleRssDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = Number(active.id);
		const newIndex = Number(over.id);

		setRssSubscriptions((items) => arrayMove(items, oldIndex, newIndex));
	};

	const handleSave = async () => {
		setIsSubmitting(true);
		try {
			await store({
				bookmarks,
				rssSubscriptions,
			});
			props.onOpenChange(false);
		} catch (error) {
			console.error("Failed to save settings:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (loading) {
		return null;
	}

	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogContent className="min-w-[80vw] max-h-[90vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Edit settings</DialogTitle>
					<DialogDescription>
						Manage your bookmarks and RSS subscriptions.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-6 overflow-y-auto flex-1 pr-2">
					{/* Bookmarks Section */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Bookmarks</h3>

						{/* Add new bookmark */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
							<Input
								placeholder="Title"
								value={newBookmark.title}
								onChange={(e) =>
									setNewBookmark({ ...newBookmark, title: e.target.value })
								}
							/>
							<Input
								placeholder="URL"
								value={newBookmark.url}
								onChange={(e) =>
									setNewBookmark({ ...newBookmark, url: e.target.value })
								}
							/>
							<Button type="button" onClick={addBookmark}>
								Add Bookmark
							</Button>
						</div>

						{/* Existing bookmarks (sortable) */}
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleBookmarkDragEnd}
						>
							<SortableContext
								// index を id に使う（配列長と順序に依存するので、必要なら固有IDに差し替えも可）
								items={bookmarks.map((_, index) => index.toString())}
								strategy={verticalListSortingStrategy}
							>
								<div className="space-y-2">
									{bookmarks.map((bookmark, index) => (
										<SortableBookmarkItem
											key={index}
											id={index.toString()}
											bookmark={bookmark}
											onRemove={() => removeBookmark(index)}
										/>
									))}
									{bookmarks.length === 0 && (
										<div className="text-gray-500 text-sm">
											No bookmarks added yet.
										</div>
									)}
								</div>
							</SortableContext>
						</DndContext>
					</div>

					{/* RSS Subscriptions Section */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">RSS Subscriptions</h3>

						{/* Add new RSS subscription */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
							<Input
								placeholder="Title"
								value={newRssSubscription.title}
								onChange={(e) =>
									setNewRssSubscription({
										...newRssSubscription,
										title: e.target.value,
									})
								}
							/>
							<Input
								placeholder="RSS URL"
								value={newRssSubscription.url}
								onChange={(e) =>
									setNewRssSubscription({
										...newRssSubscription,
										url: e.target.value,
									})
								}
							/>
							<Button type="button" onClick={addRssSubscription}>
								Add RSS
							</Button>
						</div>

						{/* Existing RSS subscriptions (sortable) */}
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleRssDragEnd}
						>
							<SortableContext
								items={rssSubscriptions.map((_, index) => index.toString())}
								strategy={verticalListSortingStrategy}
							>
								<div className="space-y-2">
									{rssSubscriptions.map((subscription, index) => (
										<SortableSubscriptionItem
											key={index}
											id={index.toString()}
											subscription={subscription}
											onRemove={() => removeRssSubscription(index)}
										/>
									))}
									{rssSubscriptions.length === 0 && (
										<div className="text-gray-500 text-sm">
											No RSS subscriptions added yet.
										</div>
									)}
								</div>
							</SortableContext>
						</DndContext>
					</div>
				</div>

				<DialogFooter className="mt-4">
					<DialogClose asChild>
						<Button variant="outline" disabled={isSubmitting}>
							Cancel
						</Button>
					</DialogClose>
					<Button onClick={handleSave} disabled={isSubmitting}>
						{isSubmitting ? "Saving..." : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

/* --- Sortable Item Components --- */

type SortableBookmarkItemProps = {
	id: string;
	bookmark: Bookmark;
	onRemove: () => void;
};

const SortableBookmarkItem = ({
	id,
	bookmark,
	onRemove,
}: SortableBookmarkItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex items-center gap-2 p-2 border rounded bg-muted/50"
		>
			{/* ドラッグハンドル */}
			<button
				type="button"
				{...attributes}
				{...listeners}
				className="cursor-grab px-1 text-xs text-muted-foreground"
				aria-label="Drag to reorder"
			>
				☰
			</button>

			<div className="flex-1">
				<div className="font-medium">{bookmark.title}</div>
				<div className="text-sm text-gray-600">{bookmark.url}</div>
			</div>
			<Button type="button" variant="destructive" size="sm" onClick={onRemove}>
				Remove
			</Button>
		</div>
	);
};

type SortableSubscriptionItemProps = {
	id: string;
	subscription: Subscription;
	onRemove: () => void;
};

const SortableSubscriptionItem = ({
	id,
	subscription,
	onRemove,
}: SortableSubscriptionItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex items-center gap-2 p-2 border rounded bg-muted/50"
		>
			{/* ドラッグハンドル */}
			<button
				type="button"
				{...attributes}
				{...listeners}
				className="cursor-grab px-1 text-xs text-muted-foreground"
				aria-label="Drag to reorder"
			>
				☰
			</button>

			<div className="flex-1">
				<div className="font-medium">{subscription.title}</div>
				<div className="text-sm text-gray-600">{subscription.url}</div>
			</div>
			<Button type="button" variant="destructive" size="sm" onClick={onRemove}>
				Remove
			</Button>
		</div>
	);
};
