import { Answers } from "inquirer";
import uiTread, { ViewConfigsBundle, ViewValidator } from "./UITread";
import viewEngine, { ViewEngineAbstract } from "./viewEngine";
import { ConsoleOptions, Prompt } from "./viewEngine/types";

export default abstract class View extends ViewEngineAbstract {
    private readonly viewEngine: ViewEngineAbstract = viewEngine;
    private readonly viewValidator: ViewValidator = uiTread;

    abstract onStart(viewConfigs?: ViewConfigsBundle): void;
    abstract onDestroy(): void;

    override clear(): void {
        this.viewEngine.clear();
    }

    override log(content: string, consoleOptions?: ConsoleOptions): void {
        this.requireCurrentView();
        this.viewEngine.log(content, consoleOptions);
    }

    override error(message: string): void {
        this.requireCurrentView();
        this.viewEngine.error(message);
    }
    
    override async prompt<T extends Answers = Answers>(prompts: Prompt[], clear: boolean): Promise<T> {
        this.requireCurrentView();

        return this.viewEngine.prompt(prompts, clear);
    }

    startScreen(view: View, viewConfigs?: ViewConfigsBundle): void {
        this.requireCurrentView();

        this.viewValidator.startView(view, viewConfigs);
    }

    incudeView(view: View, viewConfigs?: ViewConfigsBundle): void {
        this.requireCurrentView();

        this.viewValidator.include(view, viewConfigs);
    }

    isActive() {
        return this.viewValidator.isCurrentView(this);
    }

    private requireCurrentView(): void {
        if(!this.isActive() && !this.viewValidator.isIncludedView(this)) {
            throw new Error("Only dispalyed view can perform ui actions");
        }
    }
}

