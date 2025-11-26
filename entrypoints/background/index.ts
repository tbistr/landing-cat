import { addFetchFromBackgroundListener } from "@/rss/fetch";

export default defineBackground(() => {
	addFetchFromBackgroundListener();
});
