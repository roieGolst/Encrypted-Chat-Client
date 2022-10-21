export interface HomeViewContract {
    showMenu(): void;
    showLoginScreen(): void;
};

export interface HomePresenterContract {
    onUserSelectedLoginOption(): void;
    onUserSelectedRegisterOption(): void
};