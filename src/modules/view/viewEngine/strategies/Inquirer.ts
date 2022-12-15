import inquirer, { Answers } from "inquirer";
import { Prompt, ConsoleStrategy, PromptAnswer, ConsoleOptions, TextColor } from "../types";
import ansi from "ansi-colors";

export default class InquirerStrategy implements ConsoleStrategy {

    log(content: string, consoleOptions: ConsoleOptions): void {
        const color = this.getColorString(consoleOptions.color);
        console.log(color(content));
    }

    error(message: string): void {
        const error = ansi.bgRedBright(message);
        console.log(error);
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

    private getColorString(color: TextColor): ansi.StyleFunction {
        switch(color) {
            case TextColor.Black:
                return ansi.black
            
            case TextColor.Blue:
                return ansi.blue;
            
            
            case TextColor.BlueBright:
                return ansi.blueBright;
            
            
            case TextColor.Cyan:
                return ansi.cyan;
            
            
            case TextColor.CyanBright:
                return ansi.cyanBright;
            
            
            case TextColor.Green:
                return ansi.green;
            
            
            case TextColor.GreenBright:
                return ansi.greenBright;
            
            
            case TextColor.Magenta:
                return ansi.magentaBright;
            
            
            case TextColor.Red:
                return ansi.red
            
            
            case TextColor.RedBright:
                return ansi.redBright;
            
            
            case TextColor.White:
                return ansi.white;
            
            
            case TextColor.WhiteBright:
                return ansi.whiteBright;
            
            
            case TextColor.Yellow:
                return ansi.yellow;
            
            
            case TextColor.YellowBright:
                return ansi.yellowBright;
            
            default {
                return ansi.black;
            }
        }
    }

    clearScreen() {
        console.clear();
    }
};