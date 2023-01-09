import { Answers } from "inquirer";
import screenManagerRepository from "./ScreenManagerRepository";
import { ScreenManagerRepositoryAbstract } from "./IScreenManagerRepository";
import { ViewConfigsBundle } from "./ui/UITread";
import { ConsoleOptions, Prompt } from "./viewEngine/types";

export default abstract class View {
    protected screenManager: ScreenManagerRepositoryAbstract = screenManagerRepository;

    abstract onStart(viewConfigs?: ViewConfigsBundle): void;
    abstract onDestroy(): void;

    clear(): void {
        this.screenManager.clear(this);
    }

    log(content: string, consoleOptions?: ConsoleOptions): void {
        this.screenManager.log(this, content, consoleOptions);
    }

    error(message: string): void {
        this.screenManager.error(this, message);
    }
    
    async prompt<T extends Answers = Answers>(prompts: Prompt[], clear: boolean): Promise<T> {
        return this.screenManager.prompt(this, prompts, clear);
    }

    startScreen(view: View, viewConfigs?: ViewConfigsBundle): void {
        this.screenManager.startView(this, view, viewConfigs);
    }

    incudeView(view: View, viewConfigs?: ViewConfigsBundle): void {
        this.screenManager.include(this, view, viewConfigs);
    }

    isActive() {
        return this.screenManager.isActive(this);
    }
}

