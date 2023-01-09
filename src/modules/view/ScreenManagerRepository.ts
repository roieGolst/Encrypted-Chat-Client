import { Answers } from "inquirer";
import { ScreenManagerRepositoryAbstract } from "./IScreenManagerRepository";
import { ViewConfigsBundle } from "./ui/UITread";
import View from "./View";
import { Prompt, ConsoleOptions } from "./viewEngine/types";

class ScreenManagerRepository extends ScreenManagerRepositoryAbstract {

    isActive(view: View): boolean {
        return this.view.isCurrentView(view);
    }

    startView(currentView: View, view: View, viewConfigs?: ViewConfigsBundle | undefined): void {
        this.requireCurrentView(currentView);

        this.view.startView(view, viewConfigs);
    }

    include(currentView: View, view: View, viewConfigs?: ViewConfigsBundle | undefined): void {
        this.requireCurrentView(currentView);

        this.view.include(view, viewConfigs);
    }

    prompt<T extends Answers = Answers>(currentView: View, prompts: Prompt[], clear: boolean): Promise<T> {
        this.requireCurrentView(currentView);

        return this.ui.prompt(prompts, clear);
    }

    log(currentView: View, content: string, consoleOptions?: ConsoleOptions | undefined): void {
        this.requireCurrentView(currentView);

        this.ui.log(content, consoleOptions);
    }

    error(currentView: View, message: string): void {
        this.requireCurrentView(currentView);

        this.ui.error(message);
    }

    clear(currentView: View): void {
        this.requireCurrentView(currentView);

        this.ui.clear();
    }

    private requireCurrentView(currentView: View): void {
        if(!this.view.isCurrentView(currentView) && !this.view.isIncludedView(currentView)) {
            throw new Error("Only dispalyed view can perform ui actions");
        }
    }
}

export default new ScreenManagerRepository();