import { Answers } from "inquirer";
import uiTread, { UIThread, ViewConfigsBundle } from "./ui/UITread";
import View from "./View";
import viewEngine, { ViewEngineAbstract } from "./viewEngine";
import { ConsoleOptions, Prompt } from "./viewEngine/types";

export abstract class ScreenManagerRepositoryAbstract {
    protected readonly view: UIThread = uiTread;
    protected readonly ui: ViewEngineAbstract = viewEngine;

    abstract isActive(view: View): boolean;
    abstract startView(currentView: View, view: View, viewConfigs?: ViewConfigsBundle): void;
    abstract include(currentView: View, view: View, viewConfigs?: ViewConfigsBundle): void
    abstract prompt<T extends Answers = Answers>(currentView: View, prompts: Prompt[], clear: boolean): Promise<T>;
    abstract log(currentView: View, content: string, consoleOptions?: ConsoleOptions): void;
    abstract error(currentView: View, message: string): void;
    abstract clear(currentView: View): void;
}