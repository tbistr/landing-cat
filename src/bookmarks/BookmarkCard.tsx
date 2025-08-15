import { Card, Center, Image, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import type { Bookmark } from "./types";

export interface BookmarkCardProps {
	item: Bookmark;
}

const BookmarkCardBase = ({ children }: { children: React.ReactNode }) => {
	return (
		<Card
			shadow="md"
			style={{
				cursor: "pointer",
			}}
			w={200}
			h={150}
			component="a"
			href="#"
		>
			{children}
		</Card>
	);
};

export const BookmarkCard = (props: BookmarkCardProps) => {
	return (
		<BookmarkCardBase>
			<Card.Section p={0}>
				<Center>
					<Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png" />
				</Center>
			</Card.Section>

			<Card.Section p={10}>
				<Text ta="center">{props.item.title}</Text>
			</Card.Section>
		</BookmarkCardBase>
	);
};

export interface EditableBookmarkCardProps {
	item: Bookmark;
	onRemove: (id: string) => void;
	onUpdate: (id: string) => void;
}

export const EditableBookmarkCard = () => {
	return (
		<BookmarkCardBase>
			<Card.Section p={0}>
				<Center>
					<Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png" />
				</Center>
			</Card.Section>

			<Card.Section p={10}>
				<Text ta="center">Editable Bookmark</Text>
			</Card.Section>
		</BookmarkCardBase>
	);
};

export const AddIconBookmarkCard = () => {
	return (
		<BookmarkCardBase>
			<Card.Section p={0}>
				<Center>
					<IconPlus />
				</Center>
			</Card.Section>
		</BookmarkCardBase>
	);
};
