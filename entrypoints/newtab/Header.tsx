import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = (props: { onClickSettings: () => void }) => {
	return (
		<div className="flex justify-between px-8 w-screen h-16 items-center">
			<h1 className="font-bold text-2xl">Landing Cat</h1>
			<div className="flex gap-3">
				<Button variant="outline" onClick={props.onClickSettings}>
					<Settings />
					Setting
				</Button>
			</div>
		</div>
	);
};
