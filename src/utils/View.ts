import uiTread, { ViewValidator } from "./UITread";
import viewEngine, { ViewEngineAbstract } from "./viewEngine";
import { Prompt, PromptAnswer } from "./viewEngine/types";

export default abstract class View extends ViewEngineAbstract {
    private readonly viewEngine: ViewEngineAbstract = viewEngine;
    private readonly viewValidator: ViewValidator = uiTread;

    abstract onStart(): void;
    abstract onDestroy(): void;

    override log(content: string): void {
        this.requireCurrentView();
        this.viewEngine.log(content);
    }

    override error(message: string): void {
        this.requireCurrentView();
        this.viewEngine.error(message);
    }
    
    override async prompt(prompts: Prompt[], clear: boolean): Promise<PromptAnswer> {
        this.requireCurrentView();

        return this.viewEngine.prompt(prompts, clear);
    }

    startScreen(view: View): void {
        this.requireCurrentView();

        this.viewValidator.startView(view);
    }

    private requireCurrentView(): void {
        if(!this.viewValidator.isCurrentView(this)) {
            throw new Error("Only dispalyed view can perform ui actions");
        }
    }
}

