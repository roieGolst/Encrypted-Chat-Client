import { PromptAnswer, PromptType } from "../../utils/viewEngine/types";
import BaseView from "../BaseView";
import { LoginViewContract } from "./LoginContract";
import LoginPresenter from "./LoginPresenter";

const USERNAME_INPUT = "usernameInput";
const PASSWORD_INPUT =  "passwordInput";

export type LoginViewInput = {
    username: string | undefined,
    password: string | undefined 
} ;
export default class LoginView extends BaseView implements LoginViewContract {

    private presenter: LoginPresenter;

    override setPresenter(presenter: LoginPresenter): void {
        this.presenter = presenter;
    }

    override onStart(): void {
        this.presenter.subscribe();
    }

    override onDestroy(): void {
        this.presenter.unSubscribe();
    }

    showLoginPrompt(): void {
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

    showChatScreen(): void {
        //uiThread.startView(ChatView.factory());
    }

    showErrorMessage(conttent: string): void {
        //console.error(conttent);

        //uiTrhead.startView(this.factory());
    }
    
    static factory(): BaseView {
        const loginView = new LoginView();
        loginView.setPresenter(new LoginPresenter(loginView));

        return loginView;
    }
}