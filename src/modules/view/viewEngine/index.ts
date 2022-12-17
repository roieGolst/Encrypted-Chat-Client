import { Prompt, ConsoleStrategy, ConsoleOptions } from "./types";
import Inquirer from "./strategies/Inquirer";
import { Answers } from "inquirer";

export abstract class ViewEngineAbstract {
    abstract prompt<T extends Answers = Answers>(prompts: Prompt[], clear: boolean): Promise<T>;
    abstract log(content: string, consoleOptions?: ConsoleOptions): void;
    abstract error(message: string): void;
    abstract clear(): void;
};

class ViewEngine extends ViewEngineAbstract{
    private readonly strategy: ConsoleStrategy;

    constructor(engine: ConsoleStrategy) {
        super();
        this.strategy = engine;
    }

    override clear(): void {
        this.strategy.clearScreen();
    }

    override log(content: string, consoleOptions: ConsoleOptions): void {
        this.strategy.log(content, consoleOptions);
    }

    override error(message: string): void {
        this.strategy.error(message);
    }
    
    override prompt<T extends Answers = Answers>(prompts: Prompt[], clear: boolean): Promise<T> {
        if(clear) {
            this.strategy.clearScreen();
        }
        
        return this.strategy.prompt(prompts);
    }
};

export default new ViewEngine(new Inquirer());