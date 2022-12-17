import { PromptType } from "../../../modules/view/viewEngine/types";
import BaseView from "../../common/mvp/BaseView";
import AuthView from "../auth/AuthView";
import { RegisterViewContract } from "./RegisterContract";
import RegisterPresenter from "./RegisterPresenter";

type RegisterQuestion = { usernameInput: string, passwordInput: string };

const USERNAME_INPUT = "usernameInput";
const PASSWORD_INPUT =  "passwordInput";
const ERROR_MESSAGE_DURATION = 5000;

export type RegisterViewInput = {
    readonly username: string,
    readonly password: string 
}

export default class RegisterView extends RegisterViewContract {
    
    private presenter: RegisterPresenter

    setPresenter(prester: RegisterPresenter): void {
        this.presenter = prester;
    }

    override onStart(): void {
        super.onStart();
        this.presenter.subscribe();
    }

    override onDestroy(): void {
        this.presenter.unSubscribe();
    }

    override initRegisterFlow(): void {
        this.clearAndLogo()
        this.showRegisterPrompt();
    }

    override showRegisterPrompt(): void {
        const userAttributs = this.prompt<RegisterQuestion>([
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

        userAttributs.then((input: RegisterQuestion) => {
            this.presenter.handelRegisterInput({
                username: input.usernameInput,
                password: input.passwordInput
            });
        })
    }

    override showErrorMessage(): void {
        this.error("Register faild");

        this.presenter.onErrorMessageShown(ERROR_MESSAGE_DURATION);
    }

    override showAuthScreen(): void {
        this.startScreen(AuthView.factory());
    }

    static factory(): BaseView {
        const registerView = new RegisterView();
        registerView.setPresenter(new RegisterPresenter(registerView));

        return registerView;
    }
    
}