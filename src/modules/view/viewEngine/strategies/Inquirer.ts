import inquirer, { Answers } from "inquirer";
import { Prompt, ConsoleStrategy, PromptAnswer, ConsoleOptions, TextColor, BackgraundColor, TextStyle } from "../types";
import ansi from "ansi-colors";

type StringFunction = (text: string) => string;

export default class InquirerStrategy implements ConsoleStrategy {

    log(content: string, consoleOptions?: ConsoleOptions): void {
        const color = this.getColorString(consoleOptions?.color);
        const bgColor = this.getBackgraundColorString(consoleOptions?.bgColor);
        const style = this.getStyleText(consoleOptions?.textStyle);

        console.log(style(bgColor(color(content))));
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

    private getColorString(color: TextColor | undefined): ansi.StyleFunction {
        
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
            
            default: {
                return ansi.black;
            }
        }
    }

    private getBackgraundColorString(color: BackgraundColor | undefined): ansi.StyleFunction | StringFunction {
        switch(color) {
            case BackgraundColor.Black:
                return ansi.bgBlack
            
            case BackgraundColor.Blue:
                return ansi.bgBlue;
            
            
            case BackgraundColor.BlueBright:
                return ansi.bgBlueBright;
            
            
            case BackgraundColor.Cyan:
                return ansi.bgCyan;
            
            
            case BackgraundColor.CyanBright:
                return ansi.bgCyanBright;
            
            
            case BackgraundColor.Green:
                return ansi.bgGreen;
            
            
            case BackgraundColor.GreenBright:
                return ansi.bgGreenBright;
            
            
            case BackgraundColor.Magenta:
                return ansi.bgMagentaBright;
            
            
            case BackgraundColor.Red:
                return ansi.bgRed
            
            
            case BackgraundColor.RedBright:
                return ansi.bgRedBright;
            
            
            case BackgraundColor.White:
                return ansi.bgWhite;
            
            
            case BackgraundColor.WhiteBright:
                return ansi.bgWhiteBright;
            
            
            case BackgraundColor.Yellow:
                return ansi.bgYellow;
            
            
            case BackgraundColor.YellowBright:
                return ansi.bgYellowBright;
            
            default: {
                return (text) => {
                    return text;
                };
            }
        }
    }

    private getStyleText(style: TextStyle | undefined): ansi.StyleFunction | StringFunction {
        switch(style) {
            case TextStyle.Bold:
                return ansi.bold;

            case TextStyle.Dim:
                return ansi.dim
            
            
            case TextStyle.Hidden:
                return ansi.hidden
            
            
            case TextStyle.Inverse:
                return ansi.inverse
            
            
            case TextStyle.Italic:
                return ansi.italic
            
            
            case TextStyle.Reset:
                return ansi.reset
            
            
            case TextStyle.Underline:
                return ansi.underline
            
            default: {
                return (text) => {
                    return text;
                };
            }
        }
    }

    clearScreen() {
        console.clear();
    }
};