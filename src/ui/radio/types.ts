export type RadioGroupContextValue = {
	checked: string | null | undefined;
	onChange(value: string): void;
	name: string;
};

export type RadioGroupProps = {
	checked: string | null | undefined;
	onChange(value: string): void;
	name: string;
};

export type RadioProps = {
	id: string | number;
	value: string | number;
};

export interface RadioInputProps
	extends Omit<
		React.ComponentPropsWithRef<"input">,
		"id" | "type" | "name" | "checked" | "value"
	> {}

export interface RadioLabelProps
	extends Omit<React.ComponentPropsWithRef<"label">, "htmlFor"> {}

export type RadioContextValue = {
	id: string;
	value: string;
};
