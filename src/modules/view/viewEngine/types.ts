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
    readonly choices?: string[],
    readonly mask?: string;
};

export type PromptAnswer = Map<string, string>;

export type ConsoleOptions = {
    color: TextColor,
    // bgColor: BackgraungColor
};

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
    prompt(prompts: Prompt[]): Promise<PromptAnswer>;
    log(content: string, consoleOptions: ConsoleOptions): void;
    error(message: string): void;
    clearScreen(): void;
};
