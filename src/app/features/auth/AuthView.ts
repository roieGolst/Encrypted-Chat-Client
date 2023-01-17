import { ViewConfigsBundle } from "../../../modules/view/modules/screenManager/common/ViewConfigsBundle";
import { PromptType } from "../../../modules/view/modules/viewEngine/types";
import LoginView from "../login/LoginView";
import RegisterView from "../register/RegisterView";
import { AuthViewContract } from "./AuthContract";
import AuthPresenter from "./AuthPresenter";

type AuthQuestion = { authQuestion: string };

const LOGIN = "login";
const REGISTER = "register";
const AUTH_QUESTION = "authQuestion";

export default class AuthView extends AuthViewContract {
    private presenter: AuthPresenter;

    override onStart(viewConfigs?: ViewConfigsBundle): void {
        super.onStart();

        this.presenter = new AuthPresenter(this);
        this.presenter.subscribe();
    }

    override showMenu(): void {
        const answerPromise = this.prompt<AuthQuestion>([
            {
                type: PromptType.List,
                message: "Hello welcome to Encrypt-chat choose opstion",
                name: AUTH_QUESTION,
                choices: [LOGIN, REGISTER]
            }
        ], false);

        answerPromise.then((choice: AuthQuestion) => {
            switch(choice.authQuestion) {
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
        return new AuthView();
    }
};