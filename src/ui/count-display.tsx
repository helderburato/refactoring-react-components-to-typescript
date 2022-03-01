import * as React from "react";
import cx from "clsx";
import { scope } from "../lib/utils";

type CountDisplayProps = {
	count: number;
	className?: string;
};

// React.VFC doesn't add "children" prop if you don't need that, it's a better approach
// also, it gives a better autocomplete related to the React properties added by the React.VFC.
const CountDisplay: React.VFC<CountDisplayProps> = ({ count, className }) => {
	let countString = String(Math.max(Math.min(count, 999), -99));
	return (
		<div className={cx(scope("count-display"), className)}>{countString}</div>
	);
};

export { CountDisplay };

CountDisplay.displayName = "Count";
