import { parseRssFeed } from "feedsmith";
import type { DeepPartial, Rss } from "feedsmith/types";

const MSG_FETCH_RSS = "FETCH_RSS";

export const addFetchFromBackgroundListener = () => {
	// returning Promise does not work on Chrome
	browser.runtime.onMessage.addListener((msg, _, sendMsg) => {
		if (msg.type === MSG_FETCH_RSS) {
			(async () => {
				const f = await fetch(msg.url);
				const data = await f.text();
				const feed = parseRssFeed(data);
				sendMsg(feed);
			})();
		}
		return true; // Indicate async response
	});
};

export const fetchFromBackground = (
	url: string,
): Promise<DeepPartial<Rss.Feed<string>>> => {
	return browser.runtime.sendMessage({
		type: MSG_FETCH_RSS,
		url,
	});
};
