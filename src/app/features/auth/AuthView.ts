import { PromptAnswer, PromptType } from "../../../modules/view/viewEngine/types";
import LoginView from "../login/LoginView";
import RegisterView from "../register/RegisterView";
import { AuthViewContract } from "./AuthContract";
import AuthPresenter from "./AuthPresenter";

const LOGIN = "login";
const REGISTER = "register";
const HOME_QUESTION = "homeQuestion";

export default class AuthView extends AuthViewContract {
    private presenter: AuthPresenter;

    override setPresenter(prester: AuthPresenter): void {
        this.presenter = prester;
    }

    override onStart(): void {
        super.onStart();
        this.presenter.subscribe();
    }

    override showMenu(): void {
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

    override showLoginScreen(): void {
        this.startScreen(LoginView.factory());
    }

    override showRegisterScreen(): void {
        this.startScreen(RegisterView.factory());
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