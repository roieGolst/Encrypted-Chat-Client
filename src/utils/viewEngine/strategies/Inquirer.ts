import inquirer, { Answers } from "inquirer";
import { Prompt, ConsoleStrategy, PromptAnswer } from "../types";

export default class InquirerStrategy implements ConsoleStrategy {

    log(content: string): void {
        console.log(content);
    }

    error(message: string): void {
        console.error(message);
    }

    async prompt(prompts: Prompt[]): Promise<PromptAnswer> {

        const answers = await inquirer.prompt(prompts.map((item: Prompt) => {
            return {
                type: item.type,
                name: item.name,
                message: item.message,
                choices: item.choices
            }
        }));

        return this.mapToPromptAnswer(answers);
    }
    

    private mapToPromptAnswer(answer: Answers): PromptAnswer {
        const promptAnswer: Map<string, string> = new Map();

        for(const [key, value] of Object.entries(answer)) {
            promptAnswer.set(key, value);
        }

        return promptAnswer;
    }

    clearScreen() {
        console.clear();
    }
};