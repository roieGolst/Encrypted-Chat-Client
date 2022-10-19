import uiTread, { ViewValidator } from "./UITread";
import viewEngine, { ViewEngineAbstract } from "./viewEngine";
import { Prompt, PromptAnswer } from "./viewEngine/types";

export default abstract class extends ViewEngineAbstract {
    private readonly viewEngine: ViewEngineAbstract = viewEngine;
    private readonly viewValidator: ViewValidator = uiTread;

    abstract onStart(): void;
    abstract onDestroy(): void;
    
    override async prompt(prompts: Prompt[], clear: boolean): Promise<PromptAnswer> {
        if(!this.viewValidator.isCurrentView(this)) {
            throw new Error("Only dispalyed view can perform ui actions");
        }

        return this.viewEngine.prompt(prompts, clear);
    }
}

