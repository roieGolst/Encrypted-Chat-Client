import BasePresnter from "../../common/mvp/BasePresnter";
import BaseView from "../../common/mvp/BaseView";
import { RegisterViewInput } from "./RegisterView";

export abstract class RegisterViewContract extends BaseView {
    abstract initRegisterFlow(): void;
    abstract showRegisterPrompt(): void;
    abstract showErrorMessage(): void;
    abstract showAuthScreen(): void;
}

export abstract class RegisterPresenterContract extends BasePresnter {
    abstract handelRegisterInput(userAttributs: RegisterViewInput): Promise<void>
    abstract onErrorMessageShown(clearInterval: number): void;
}