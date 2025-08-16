import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";

import "@mantine/core/styles.css";
import { App } from "./App";

function Main() {
	return (
		<MantineProvider defaultColorScheme="dark">
			<App />
		</MantineProvider>
	);
}

// biome-ignore lint/style/noNonNullAssertion: We are sure the root element exists.
createRoot(document.getElementById("root")!).render(<Main />);
