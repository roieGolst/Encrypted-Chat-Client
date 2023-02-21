import { Prompt, ConsoleStrategy, ConsoleOptions } from "./types";
import Inquirer from "./strategies/Inquirer";
import { Answers } from "inquirer";

export interface IViewEngine {
    prompt<T extends Answers = Answers>(prompts: Prompt[], clear: boolean): Promise<T>;
    log(content: string, consoleOptions?: ConsoleOptions): void;
    error(message: string): void;
    clear(): void;
};

class ViewEngine implements IViewEngine {
    private readonly strategy: ConsoleStrategy;

    constructor(engine: ConsoleStrategy) {
        this.strategy = engine;
    }

    clear(): void {
        this.strategy.clearScreen();
    }

    log(content: string, consoleOptions: ConsoleOptions): void {
        this.strategy.log(content, consoleOptions);
    }

    error(message: string): void {
        this.strategy.error(message);
    }
    
    prompt<T extends Answers = Answers>(prompts: Prompt[], clear: boolean): Promise<T> {
        if(clear) {
            this.strategy.clearScreen();
        }
        
        return this.strategy.prompt(prompts);
    }
};

export default new ViewEngine(new Inquirer());