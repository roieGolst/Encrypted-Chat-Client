import { PromptAnswer, PromptType } from "../../../modules/view/viewEngine/types";
import BaseView from "../../common/mvp/BaseView";
import LoginView from "../login/LoginView";
import { AuthViewContract } from "./AuthContract";
import AuthPresenter from "./AuthPresenter";

const LOGIN = "login";
const REGISTER = "register";
const HOME_QUESTION = "homeQuestion";

export default class AuthView extends BaseView implements AuthViewContract {
    private presenter: AuthPresenter;

    override setPresenter(prester: AuthPresenter): void {
        this.presenter = prester;
    }

    override onStart(): void {
        super.onStart();
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

    showRegisterScreen(): void {
        //
    }

    
    override onDestroy(): void {
        this.presenter.unSubscribe();
    }
    
    static factory() {
        const authView = new AuthView();
        authView.setPresenter(new AuthPresenter(authView));

        return authView;
    }
};