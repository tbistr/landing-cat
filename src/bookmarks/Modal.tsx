import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import type { Bookmark } from "./types";

export const EditBookmarkModal = (props: {
	opened: boolean;
	bookmark: Bookmark;
	onEdit: (bookmark: Bookmark) => void;
	onDelete: (bookmark: Bookmark) => void;
	onClose: () => void;
}) => {
	const [title, setTitle] = useState<string>(props.bookmark.title);
	const [url, setUrl] = useState<string>(props.bookmark.url);

	const handleSave = () => {
		if (!title.trim() || !url.trim()) return;
		props.onEdit({
			id: props.bookmark.id,
			title: title.trim(),
			url: url.trim(),
		});
		props.onClose();
	};

	const handleDelete = () => {
		props.onDelete(props.bookmark);
		props.onClose();
	};

	return (
		<Modal
			opened={props.opened}
			onClose={props.onClose}
			title={"Edit Bookmark"}
			centered
		>
			<Stack gap="md">
				<TextInput
					label="Title"
					placeholder="Enter bookmark title"
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
				/>
				<TextInput
					label="URL"
					placeholder="https://example.com"
					value={url}
					onChange={(e) => setUrl(e.currentTarget.value)}
				/>
				<Group justify="space-between">
					<Group>
						<Button variant="filled" color="red" onClick={handleDelete}>
							Delete
						</Button>
					</Group>
					<Group>
						<Button variant="subtle" onClick={props.onClose}>
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							disabled={!title.trim() || !url.trim()}
						>
							Save
						</Button>
					</Group>
				</Group>
			</Stack>
		</Modal>
	);
};

export const AddBookmarkModal = (props: {
	opened: boolean;
	onAdd: (bookmark: Bookmark) => void;
	onClose: () => void;
}) => {
	const [title, setTitle] = useState<string>("");
	const [url, setUrl] = useState<string>("");

	const handleSave = () => {
		if (!title.trim() || !url.trim()) return;
		props.onAdd({
			id: crypto.randomUUID(),
			title: title.trim(),
			url: url.trim(),
		});
	};

	return (
		<Modal
			opened={props.opened}
			onClose={props.onClose}
			title={"Add Bookmark"}
			centered
		>
			<Stack gap="md">
				<TextInput
					label="Title"
					placeholder="Enter bookmark title"
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
				/>
				<TextInput
					label="URL"
					placeholder="https://example.com"
					value={url}
					onChange={(e) => setUrl(e.currentTarget.value)}
				/>
				<Group justify="space-between">
					<Group>
						<Button variant="subtle" onClick={props.onClose}>
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							disabled={!title.trim() || !url.trim()}
						>
							Save
						</Button>
					</Group>
				</Group>
			</Stack>
		</Modal>
	);
};
