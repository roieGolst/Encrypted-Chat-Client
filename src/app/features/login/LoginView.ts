import { ViewConfigsBundle } from "../../../modules/cli/modules/screenManager/common/ViewConfigsBundle";
import { PromptType } from "../../../modules/cli/modules/viewEngine/types";
import BaseView from "../../common/mvp/BaseView";
import HomeView from "../home/HomeView";
import { LoginPresenterContract, LoginViewContract } from "./LoginContract";
import LoginPresenter from "./LoginPresenter";

type LoginQuestion = { usernameInput: string, passwordInput: string };

const USERNAME_INPUT = "usernameInput";
const PASSWORD_INPUT =  "passwordInput";
const ERROR_MESSAGE_DURATION = 10000;

export type LoginViewInput = {
    readonly username: string,
    readonly password: string 
};
export default class LoginView extends LoginViewContract {
    private presenter: LoginPresenterContract;

    override onStart(viewConfigs?: ViewConfigsBundle): void  {
        super.onStart();

        this.presenter = new LoginPresenter(this);
        this.presenter.subscribe();
    }
    
    override onDestroy(): void {
        this.presenter.unSubscribe();
    }

    override initLoginFlow() {
        this.clearAndLogo();
        this.showLoginPrompt();
    }
    
    override showLoginPrompt(): void {
        const userAttributs = this.prompt<LoginQuestion>([
            {
                type: PromptType.Input,
                name: USERNAME_INPUT,
                message: "User name: "
            },
            {
                type: PromptType.Password,
                name: PASSWORD_INPUT,
                message: "Password: ",
                mask: "*"
            }
        ], false);

        userAttributs.then((input: LoginQuestion) => {
            this.presenter.handelLoginInput({
                username: input.usernameInput,
                password: input.passwordInput
            });
        })
    }

    override showHomeScreen(): void {
        this.startScreen(HomeView);
    }

    override showErrorMessage(): void {
        this.error("login faild");
        this.presenter.onErrorMessageShown(ERROR_MESSAGE_DURATION);
    }
}