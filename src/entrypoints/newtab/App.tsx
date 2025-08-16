import { AppShell, Group, Title } from "@mantine/core";

import "@mantine/core/styles.css";
import { BookmarkView } from "@/bookmarks";

export const App = () => {
	return (
		<AppShell
			header={{ height: 56 }}
			padding="md"
			style={{ background: "transparent", position: "relative", zIndex: 1 }}
		>
			<AppShell.Header>
				<Group h="100%" px="md" justify="space-between">
					<Title order={4}>Landing Cat</Title>
				</Group>
			</AppShell.Header>
			<AppShell.Main>
				<BookmarkView />
			</AppShell.Main>
		</AppShell>
	);
};
