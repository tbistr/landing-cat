import { ActionIcon, Card, Center, Image, Text } from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { AddBookmarkModal, EditBookmarkModal } from "./Modal";
import type { Bookmark } from "./types";

const BookmarkCardBase = ({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick?: () => void;
}) => {
	return (
		<Card
			shadow="md"
			style={{
				cursor: "pointer",
			}}
			w={200}
			h={150}
			onClick={onClick}
		>
			{children}
		</Card>
	);
};

export const BookmarkCard = (props: { item: Bookmark }) => {
	const openUrlInCurrentTab = () => {
		window.open(props.item.url, "_self");
	};

	return (
		<BookmarkCardBase onClick={openUrlInCurrentTab}>
			<Card.Section p={0} h={100}>
				<Center h="100%">
					<Image
						src={`https://www.google.com/s2/favicons?domain=${new URL(props.item.url).hostname}&sz=64`}
						fallbackSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
						fit="contain"
						h="100%"
					/>
				</Center>
			</Card.Section>

			<Card.Section p={10}>
				<Text ta="center">{props.item.title}</Text>
			</Card.Section>
		</BookmarkCardBase>
	);
};

export const EditableBookmarkCard = (props: {
	item: Bookmark;
	onEdit: (bookmark: Bookmark) => void;
	onDelete: (bookmark: Bookmark) => void;
}) => {
	const [editModalOpened, setEditModalOpened] = useState(false);

	return (
		<>
			<BookmarkCardBase>
				<Card.Section>
					<ActionIcon
						size="sm"
						variant="filled"
						onClick={(e) => {
							e.stopPropagation();
							setEditModalOpened(true);
						}}
						style={{
							position: "absolute",
							top: 8,
							right: 8,
						}}
					>
						<IconEdit size={14} />
					</ActionIcon>
				</Card.Section>

				<Card.Section p={0} h={100}>
					<Center h="100%">
						<Image
							src={`https://www.google.com/s2/favicons?domain=${new URL(props.item.url).hostname}&sz=64`}
							fit="contain"
							h="100%"
						/>
					</Center>
				</Card.Section>

				<Card.Section p={10}>
					<Text ta="center">{props.item.title}</Text>
				</Card.Section>
			</BookmarkCardBase>

			<EditBookmarkModal
				opened={editModalOpened}
				bookmark={props.item}
				onEdit={props.onEdit}
				onDelete={props.onDelete}
				onClose={() => setEditModalOpened(false)}
			/>
		</>
	);
};

export const AddIconBookmarkCard = (props: {
	onAdd: (bookmark: Bookmark) => void;
}) => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<>
			<BookmarkCardBase onClick={() => setModalOpened(true)}>
				<Center h="100%">
					<IconPlus size={64} />
				</Center>
			</BookmarkCardBase>
			<AddBookmarkModal
				opened={modalOpened}
				onClose={() => setModalOpened(false)}
				onAdd={props.onAdd}
			/>
		</>
	);
};
