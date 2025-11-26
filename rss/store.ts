import { storage } from "#imports";
import type { Subscription } from "./types";

const subscriptionsItem = storage.defineItem<Subscription[]>(
	"local:subscriptions",
	{
		fallback: [],
	},
);

export const getSubscriptions = async (): Promise<Subscription[]> => {
	return subscriptionsItem.getValue();
};

export const setSubscriptions = async (subscriptions: Subscription[]) => {
	return subscriptionsItem.setValue(subscriptions);
};
