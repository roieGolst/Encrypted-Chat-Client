export enum PromptType {
    Input = "input",
    Number ="number",
    Confirm = "confirm", 
    List = "list", 
    Rawlist = "rawlist", 
    // Expand, 
    // Checkbox, 
    // Password, 
    // Editor
};

export type Prompt = {
    readonly type: PromptType,
    readonly message: string,
    readonly name: string,
    readonly choices?: string[]
};

export type PromptAnswer = Map<string, string>;

export interface ConsoleStrategy {
    prompt(prompts: Prompt[]): Promise<PromptAnswer>;
    log(content: string): void;
    error(message: string): void;
    clearScreen(): void;
};
