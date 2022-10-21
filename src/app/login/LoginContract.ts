import { LoginViewInput } from "./LoginView";

export interface LoginViewContract {
    showLoginPrompt(): void;
    showErrorMessage(conttent: string): void;
    showChatScreen(): void;
}

export interface LoginPresenterContract {
    handelLoginInput(userAttributs: LoginViewInput): void
}