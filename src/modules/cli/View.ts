import { Answers } from "inquirer";
import screenManager from "./modules/screenManager/ScreenManager";
import { ConsoleOptions, Prompt } from "./modules/viewEngine/types";
import viewEngine, { IViewEngine } from "./modules/viewEngine";
import { IScreenManager } from "./modules/screenManager/IScreenManager";
import { ViewConfigsBundle } from "./modules/screenManager/common/ViewConfigsBundle";
import { ViewClass } from "./modules/screenManager/common/ViewClass";

//TODO: add a intent concept

export default abstract class View {
    private readonly screen: IScreenManager = screenManager;
    private readonly ui: IViewEngine = viewEngine;

    abstract onStart(viewConfigs?: ViewConfigsBundle): void;
    abstract onDestroy(): void;

    clear(): void {
        this.checkScreenPermission();

        this.ui.clear();
    }

    log(content: string, consoleOptions?: ConsoleOptions): void {
        // this.checkScreenPermission();

        this.ui.log(content, consoleOptions);
    }

    error(message: string): void {
        this.checkScreenPermission();

        this.ui.error(message);
    }
    
    async prompt<T extends Answers = Answers>(prompts: Prompt[], clear: boolean): Promise<T> {
        this.checkScreenPermission();

        return this.ui.prompt(prompts, clear);
    }

    startScreen(view: ViewClass, viewConfigs?: ViewConfigsBundle): void {
        this.checkScreenPermission();

        this.screen.startView(view, viewConfigs);
    }

    incudeView(view: ViewClass, viewConfigs?: ViewConfigsBundle): void {
        this.checkScreenPermission();

        this.screen.include(view, viewConfigs);
    }

    isActive() {
        return this.screen.isCurrentView(this);
    }

    private checkScreenPermission(): void {
        if(! this.screen.hasPerformPermission(this)) {
            throw new Error("Only displayed view can perform ui actions");
        }
    }
}

