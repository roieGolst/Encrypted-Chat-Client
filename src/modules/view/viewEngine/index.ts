import { Prompt, PromptAnswer, ConsoleStrategy } from "./types";
import Inquirer from "./strategies/Inquirer";

export abstract class ViewEngineAbstract {
    abstract prompt(prompts: Prompt[], clear: boolean): Promise<PromptAnswer>;
    abstract log(content: string): void;
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

    override log(content: string): void {
        this.strategy.log(content);
    }

    override error(message: string): void {
        this.strategy.error(message);
    }
    
    override prompt(prompts: Prompt[], clear: boolean): Promise<PromptAnswer> {
        if(clear) {
            this.strategy.clearScreen();
        }
        
        return this.strategy.prompt(prompts);
    }
};

export default new ViewEngine(new Inquirer());