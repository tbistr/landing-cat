import { ActionIcon, Card, Center, Group, Image, Text } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
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
	return (
		<BookmarkCardBase>
			<Card.Section p={0} h={100}>
				<Center h="100%">
					<Image
						src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
						fit="cover"
						w="100%"
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
	onRemove: (id: string) => void;
	onUpdate: (id: string) => void;
}) => {
	return (
		<BookmarkCardBase>
			<Card.Section>
				<Group
					gap="xs"
					style={{
						position: "absolute",
						top: 8,
						right: 8,
					}}
				>
					<ActionIcon
						size="sm"
						variant="filled"
						onClick={(e) => {
							e.stopPropagation();
							props.onUpdate(props.item.id);
						}}
					>
						<IconEdit size={14} />
					</ActionIcon>
					<ActionIcon
						size="sm"
						variant="filled"
						color="pink"
						onClick={(e) => {
							e.stopPropagation();
							props.onRemove(props.item.id);
						}}
					>
						<IconTrash size={14} />
					</ActionIcon>
				</Group>
			</Card.Section>

			<Card.Section p={0}>
				<Center h="100%">
					<Image
						src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
						fit="cover"
						w="100%"
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

export const AddIconBookmarkCard = (props: { onClick: () => void }) => {
	return (
		<BookmarkCardBase onClick={props.onClick}>
			<Center h="100%">
				<IconPlus size={64} />
			</Center>
		</BookmarkCardBase>
	);
};
