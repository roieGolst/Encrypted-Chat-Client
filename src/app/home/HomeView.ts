import { PromptAnswer, PromptType } from "../../utils/view/viewEngine/types";
import { HomeViewContract } from "./HomeContract";
import HomePresenter from "./HomePresenter";
import BaseView from "../BaseView";
import LoginView from "../login/LoginView";
import AuthView from "../auth/AuthView";

const LOGIN = "login";
const REGISTER = "register";
const HOME_QUESTION = "homeQuestion";

export default class HomeView extends BaseView implements HomeViewContract {
    private presenter: HomePresenter;

    override setPresenter(prester: HomePresenter): void {
        this.presenter = prester;
    }

    override onStart(): void {
        super.onStart();
        this.presenter.subscribe();
    }

    showConnectingMessage(): void {
        this.log("Connecting to the server...");
    }

    showAuthScreen(): void {
        this.startScreen(AuthView.factory());
    }

    showErrorMessage(content: string): void {
        this.error(content);
    }
    
    override onDestroy(): void {
        this.presenter.unSubscribe();
    }
    
    static factory() {
        const homeView = new HomeView();
        homeView.setPresenter(new HomePresenter(homeView));

        return homeView;
    }
};