import BasePresnter from "../../common/mvp/BasePresnter";
import BaseView from "../../common/mvp/BaseView";
import { Tokens } from "../../utils/encryptedChatProtocol/commonTypes";
import { LoginViewInput } from "./LoginView";

export abstract class LoginViewContract extends BaseView {
    abstract initLoginFlow(): void;
    abstract showLoginPrompt(): void;
    abstract showErrorMessage(): void;
    abstract showHomeScreen(tokens: Tokens): void;
}

export abstract class LoginPresenterContract extends BasePresnter {
    abstract handelLoginInput(userAttributs: LoginViewInput): Promise<void>;
    abstract onErrorMessageShown(clearInterval: number): void;
}