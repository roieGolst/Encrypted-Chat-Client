export interface AuthViewContract {
    showMenu(): void;
    showLoginScreen(): void;
    showRegisterScreen(): void;
};

export interface AuthPresenterContract {
    onUserSelectedLoginOption(): void;
    onUserSelectedRegisterOption(): void;
};