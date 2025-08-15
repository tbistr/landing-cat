import { SimpleGrid } from "@mantine/core";
import type React from "react";

export interface BookmarksGridProps {
	bookmarkCardElements: ReadonlyArray<React.ReactNode>;
}

export const BookmarksGrid = (props: BookmarksGridProps) => {
	return (
		<SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
			{props.bookmarkCardElements}
		</SimpleGrid>
	);
};
