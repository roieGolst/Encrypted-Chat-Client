import { Prompt, PromptAnswer, PromptStrategy } from "./types";
import Inquirer from "./strategies/Inquirer";

export abstract class ViewEngineAbstract {
    abstract prompt(prompts: Prompt[], clear: boolean): Promise<PromptAnswer>;
};

class ViewEngine extends ViewEngineAbstract{

    private readonly strategy: PromptStrategy;

    constructor(engine: PromptStrategy) {
        super();
        this.strategy = engine;
    }
    
    override prompt(prompts: Prompt[], clear: boolean): Promise<PromptAnswer> {
        if(clear) {
            this.strategy.clearScreen();
        }
        
        return this.strategy.prompt(prompts);
    }
};

export default new ViewEngine(new Inquirer());