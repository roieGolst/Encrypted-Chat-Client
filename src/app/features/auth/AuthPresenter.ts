import { AuthPresenterContract, AuthViewContract } from "./AuthContract";

export default class AuthPresenter extends AuthPresenterContract {
    private readonly view: AuthViewContract;

    constructor(view: AuthViewContract) {
        super();
        this.view = view;
    }

    override subscribe(): void {
        this.view.showMenu();
    }

    override onUserSelectedLoginOption(): void {
        this.view.showLoginScreen();
    }

    override onUserSelectedRegisterOption(): void {
        this.view.showRegisterScreen();
    }

    override unSubscribe(): void {
        return;
    }
}; 