import BasePresnter from "../BasePresnter";
import { PromptType } from "../../utils/viewEngine/types";
import { HomeViewContract } from "./HomeContract";
import HomePresenter from "./HomePresenter";
import BaseView from "../BaseView";

const LOGIN = "login";
const REGISTER = "register";

export default class HomeView extends BaseView implements HomeViewContract {
    private presenter: HomePresenter;

    override setPresenter(prester: HomePresenter): void {
        this.presenter = prester;
    }

    override onStart(): void {
        this.presenter.subscribe();
    }

    async showMenu(): Promise<void> {
        const answer = await this.prompt([
            {
                type: PromptType.List,
                message: "Hello welcome to Encrypt-chat choose opstion",
                name: "homeQuestion",
                choices: [LOGIN, REGISTER]
            }
        ], false);

        switch(answer.get("homeQuestion")) {
            case LOGIN : {
                this.presenter.onUserSelectedLoginOption();
                break;
            }

            case REGISTER: {
                this.presenter.onUserSelectedRegisterOption();
                break;
            }
        }
    }

    showLoginScreen(): void {
        
    }

    
    override onDestroy(): void {
        this.presenter.unSubscribe();
    }
    
    static factory(): HomeView {
        const homeView = new HomeView();
        homeView.setPresenter(new HomePresenter(homeView));

        return homeView;
    }
};