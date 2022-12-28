import BasePresnter from "../../common/mvp/BasePresnter";
import BaseView from "../../common/mvp/BaseView";
import { LoginViewInput } from "./LoginView";

export abstract class LoginViewContract extends BaseView {
    abstract initLoginFlow(): void;
    abstract showLoginPrompt(): void;
    abstract showErrorMessage(): void;
    abstract showHomeScreen(): void;
}

export abstract class LoginPresenterContract extends BasePresnter {
    abstract handelLoginInput(userAttributs: LoginViewInput): Promise<void>;
    abstract onErrorMessageShown(clearInterval: number): void;
}