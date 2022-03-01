import * as React from "react";
import cx from "clsx";
import { scope } from "../../lib/utils";
import type {
	RadioGroupContextValue,
	RadioGroupProps,
	RadioProps,
	RadioContextValue,
	RadioInputProps,
	RadioLabelProps,
} from "./types";

const RadioGroupContext = React.createContext<null | RadioGroupContextValue>(
	null
);

const RadioGroup: React.FC<RadioGroupProps> = ({
	children,
	checked,
	onChange,
	name,
}) => {
	return (
		<RadioGroupContext.Provider value={{ checked, onChange, name }}>
			{children}
		</RadioGroupContext.Provider>
	);
};

const RadioContext = React.createContext<RadioContextValue | null>(null);

const Radio: React.FC<RadioProps> = ({ children, id, value }) => {
	return (
		<RadioContext.Provider value={{ id: String(id), value: String(value) }}>
			{children}
		</RadioContext.Provider>
	);
};

const RadioInput = React.forwardRef<HTMLInputElement, RadioInputProps>(
	({ children, className, ...props }, forwardedRef) => {
		let { id, value } = useRadioContext("RadioInput");
		let { checked, onChange, name } = useRadioGroupContext("RadioInput");

		return (
			<input
				{...props}
				className={cx(className, scope("radio__input"))}
				type="radio"
				id={id}
				ref={forwardedRef}
				name={name}
				value={value}
				onChange={(event) => {
					props.onChange?.(event);
					if (!event.defaultPrevented) {
						onChange(event.target.value);
					}
				}}
				checked={checked === value}
			>
				{children}
			</input>
		);
	}
);

RadioInput.displayName = "RadioInput";

const RadioLabel = React.forwardRef<HTMLLabelElement, RadioLabelProps>(
	({ children, className, ...props }, forwardedRef) => {
		let { id } = useRadioContext("RadioLabel");

		return (
			<label
				{...props}
				className={cx(scope("radio__label"), className)}
				htmlFor={id}
				ref={forwardedRef}
			>
				{children}
			</label>
		);
	}
);

RadioLabel.displayName = "RadioLabel";

export { RadioGroup, Radio, RadioInput, RadioLabel };

function useRadioGroupContext(name: string) {
	const ctx = React.useContext(RadioGroupContext);

	if (!ctx) {
		throw new Error(
			`A ${name} was rendered outside of a RadioGroup component. Wrap the ${name} with a RadioGroup to get rid of this error.`
		);
	}

	return ctx;
}

function useRadioContext(name: string) {
	const ctx = React.useContext(RadioContext);

	if (!ctx) {
		throw new Error(
			`A ${name} was rendered outside of a Radio component. Wrap the ${name} with a Radio to get rid of this error.`
		);
	}

	return ctx;
}
