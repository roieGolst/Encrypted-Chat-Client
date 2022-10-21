import { PromptAnswer, PromptType } from "../../utils/viewEngine/types";
import { HomeViewContract } from "./HomeContract";
import HomePresenter from "./HomePresenter";
import BaseView from "../BaseView";
import LoginView from "../login/LoginView";

const LOGIN = "login";
const REGISTER = "register";
const HOME_QUESTION = "homeQuestion";

export default class HomeView extends BaseView implements HomeViewContract {
    private presenter: HomePresenter;

    override setPresenter(prester: HomePresenter): void {
        this.presenter = prester;
    }

    override onStart(): void {
        this.presenter.subscribe();
    }

    showMenu(): void {
        const answerPromise = this.prompt([
            {
                type: PromptType.List,
                message: "Hello welcome to Encrypt-chat choose opstion",
                name: HOME_QUESTION,
                choices: [LOGIN, REGISTER]
            }
        ], false);

        answerPromise.then((choice: PromptAnswer) => {
            switch(choice.get(HOME_QUESTION)) {
                case LOGIN : {
                    this.presenter.onUserSelectedLoginOption();
                    break;
                }
    
                case REGISTER: {
                    this.presenter.onUserSelectedRegisterOption();
                    break;
                }
            }
        });
    }

    showLoginScreen(): void {
        this.startScreen(LoginView.factory());
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