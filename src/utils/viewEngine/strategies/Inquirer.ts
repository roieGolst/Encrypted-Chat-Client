import inquirer, { Answers } from "inquirer";
import { Prompt, PromptStrategy, PromptAnswer } from "../types";

export default class implements PromptStrategy {

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