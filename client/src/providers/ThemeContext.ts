import { createContext } from "react";

declare enum ThemeContextThemeEnum {
	Dark = "dark",
	Light = "light",
}

declare type ThemeContextProps = {
	theme: ThemeContextThemeEnum;
	setTheme?: Function;
};

const DEFAULT_CONTEXT: ThemeContextProps = {
	theme: "dark" as ThemeContextThemeEnum,
};

export const ThemeContext = createContext<Partial<ThemeContextProps>>(DEFAULT_CONTEXT);
