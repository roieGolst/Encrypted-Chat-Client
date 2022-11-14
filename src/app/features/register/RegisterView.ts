import UITread from "../../../modules/view/UITread";
import { PromptAnswer, PromptType } from "../../../modules/view/viewEngine/types";
import BasePresnter from "../../common/mvp/BasePresnter";
import BaseView from "../../common/mvp/BaseView";
import AuthView from "../auth/AuthView";
import { RegisterViewContract } from "./RegisterContract";
import RegisterPresenter from "./RegisterPresenter";

const USERNAME_INPUT = "usernameInput";
const PASSWORD_INPUT =  "passwordInput";

export type RegisterViewInput = {
    username: string | undefined,
    password: string | undefined 
}

export default class RegisterView extends BaseView implements RegisterViewContract {
    
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

    showRegisterPrompt(): void {
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
            this.presenter.handelRegisterInput({
                username: input.get(USERNAME_INPUT),
                password: input.get(PASSWORD_INPUT)
            });
        })
    }

    showErrorMessage(): void {
        this.error("Register faild");
    }

    showAuthScreen(): void {
        this.startScreen(AuthView.factory());
    }

    static factory(): BaseView {
        const registerView = new RegisterView();
        registerView.setPresenter(new RegisterPresenter(registerView));

        return registerView;
    }
    
}