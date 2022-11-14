import { RegisterViewInput } from "./RegisterView";

export interface RegisterViewContract {
    showRegisterPrompt(): void;
    showErrorMessage(): void;
    showAuthScreen(): void;
}

export interface RegisterPresenterContract {
    handelRegisterInput(userAttributs: RegisterViewInput): void
}