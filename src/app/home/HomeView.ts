import BasePresnter from "../../utils/BasePresnter";
import BaseView from "../../utils/BaseView";
import { PromptType } from "../../utils/viewEngine/types";
import { HomeViewContract } from "./HomeContract";
import HomePresenter from "./HomePresenter";

export default class extends BaseView implements HomeViewContract {
    private presenter: HomePresenter

    override setPresenter(prester: BasePresnter): void {
        this.presenter = prester;
    }

    override onStart(): void {
        this.presenter.subscribe();
    }

    showMenu(): void {
        this.view.prompt([
            {
                type: PromptType.List,
                message: "Hello welcome to Encrypt-chat choose opstion",
                name: "homeQuestion",
                choices: ["login", "register"]
            }
        ], false);
    }

    override onDestroy(): void {
       this.presenter.unSubscribe();
    }
    
};