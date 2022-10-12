export enum PromptType {
    Input = "input",
    Number ="number",
    Confirm = "confirm", 
    List = "list", 
    // Rawlist, 
    // Expand, 
    // Checkbox, 
    // Password, 
    // Editor
};

export type Prompt = {
    type: PromptType,
    message: string,
    name: string,
    choices?: string[]
};

export type PromptAnswer = Map<string, string>;

export interface PromptStrategy {
    prompt(prompts: Prompt[], clear: boolean): Promise<PromptAnswer>;
};
