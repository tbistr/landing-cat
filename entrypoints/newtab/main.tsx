import { createRoot } from "react-dom/client";
import { App } from "./App";

import "@/assets/tailwind.css";

// biome-ignore lint/style/noNonNullAssertion: We are sure the root element exists.
createRoot(document.getElementById("root")!).render(<App />);
