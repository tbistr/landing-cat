import { addFetchFromBackgroundListener } from "@/rss/query";

export default defineBackground(() => {
	addFetchFromBackgroundListener();
});
