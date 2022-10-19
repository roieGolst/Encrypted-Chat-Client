import BasePresnter from "../BasePresnter";
import { PromptType } from "../../utils/viewEngine/types";
import { HomeViewContract } from "./HomeContract";
import HomePresenter from "./HomePresenter";
import BaseView from "../BaseView";

export default class extends BaseView implements HomeViewContract {
    private presenter: HomePresenter;

    override setPresenter(prester: HomePresenter): void {
        this.presenter = prester;
    }

    override onStart(): void {
        this.presenter.subscribe();
    }

    showMenu(): void {
        this.prompt([
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