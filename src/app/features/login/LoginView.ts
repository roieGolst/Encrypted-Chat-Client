import { PromptAnswer, PromptType } from "../../../modules/view/viewEngine/types";
import BaseView from "../../common/mvp/BaseView";
import { Tokens } from "../../utils/encryptedChatProtocol/commonTypes";
import HomeView from "../home/HomeView";
import { LoginPresenterContract, LoginViewContract } from "./LoginContract";
import LoginPresenter from "./LoginPresenter";

const USERNAME_INPUT = "usernameInput";
const PASSWORD_INPUT =  "passwordInput";
const ERROR_MESSAGE_DURATION = 5000;

export type LoginViewInput = {
    readonly username: string | undefined,
    readonly password: string | undefined 
} ;
export default class LoginView extends LoginViewContract {
    private presenter: LoginPresenterContract;

    override setPresenter(presenter: LoginPresenterContract): void {
        this.presenter = presenter;
    }

    override onStart(): void {
        super.onStart();
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
        const userAttributs = this.prompt([
            {
                type: PromptType.Input,
                name: USERNAME_INPUT,
                message: "User name: "
            },
            {
                type: PromptType.Input,
                name: PASSWORD_INPUT,
                message: "Password: "
            }
        ], false);

        userAttributs.then((input: PromptAnswer) => {
            this.presenter.handelLoginInput({
                username: input.get(USERNAME_INPUT),
                password: input.get(PASSWORD_INPUT)
            });
        })
    }

    override showHomeScreen(tokens: Tokens): void {
        this.startScreen(HomeView.factory(tokens));
    }

    override showErrorMessage(): void {
        this.error("login faild");
        this.presenter.onErrorMessageShown(ERROR_MESSAGE_DURATION);
    }
    
    static factory(): BaseView {
        const loginView = new LoginView();
        loginView.setPresenter(new LoginPresenter(loginView));

        return loginView;
    }
}