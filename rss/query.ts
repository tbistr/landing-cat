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

export const getOGP = async (url: string): Promise<string | undefined> => {
	const res = await fetch(url);

	if (!res.ok) {
		console.error("fetch failed", res.status);
		return undefined;
	}

	const html = await res.text();

	// ブラウザ環境なら DOMParser が使える
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");

	const pickMetaContent = (selector: string): string | null => {
		const el = doc.querySelector<HTMLMetaElement>(selector);
		const content = el?.getAttribute("content");
		return content && content.trim().length > 0 ? content.trim() : null;
	};

	// 優先的に探す
	const candidates = [
		pickMetaContent('meta[property="og:image"]'),
		pickMetaContent('meta[property="og:image:secure_url"]'),
		pickMetaContent('meta[property="og:image:url"]'),
		pickMetaContent('meta[name="twitter:image"]'),
		pickMetaContent('meta[name="twitter:image:src"]'),
	].filter((x): x is string => !!x);

	if (candidates.length === 0) {
		return undefined;
	}

	let imageUrl = candidates[0];

	try {
		imageUrl = new URL(imageUrl, url).toString();
	} catch {}

	return imageUrl;
};
