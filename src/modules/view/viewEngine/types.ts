import { Answers } from "inquirer";

export enum PromptType {
    Input = "input",
    Number ="number",
    Confirm = "confirm", 
    List = "list", 
    Rawlist = "rawlist", 
    Password = "password", 
    // Expand, 
    // Checkbox, 
    // Editor
};

export type Prompt = {
    readonly type: PromptType,
    readonly message: string,
    readonly name: string,
    readonly mask?: string;
    readonly choices?: string[],
};

export type ConsoleOptions = {
    color?: TextColor,
    bgColor?: BackgraundColor,
    textStyle?: TextStyle
};

export enum TextStyle {
    Dim,
    Bold,
    Hidden,
    Italic,
    Underline,
    Inverse,
    Reset
}

export enum BackgraundColor {
    Black, 
    Red,
    Green,
    Yellow,
    Blue,
    Magenta,
    Cyan,
    White,
    RedBright,
    GreenBright,
    YellowBright,
    BlueBright,
    MagentaBright,
    CyanBright,
    WhiteBright
}

export enum TextColor  {
    Black, 
    Red,
    Green,
    Yellow,
    Blue,
    Magenta,
    Cyan,
    White,
    RedBright,
    GreenBright,
    YellowBright,
    BlueBright,
    MagentaBright,
    CyanBright,
    WhiteBright
}

export interface ConsoleStrategy {
    prompt<T extends Answers = Answers>(prompts: Prompt[]): Promise<T>;
    log(content: string, consoleOptions?: ConsoleOptions): void;
    error(message: string): void;
    clearScreen(): void;
};
