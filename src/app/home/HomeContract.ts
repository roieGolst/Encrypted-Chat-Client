export interface HomeViewContract {
    showAuthScreen(): void;
    showConnectingMessage(): void;
    showErrorMessage(content: string): void;
};

export interface HomePresenterContract {
};