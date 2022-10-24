import BasePresnter from "../../common/mvp/BasePresnter";
import { AuthPresenterContract, AuthViewContract } from "./AuthContract";

export default class AuthPresenter extends BasePresnter implements AuthPresenterContract {

    private readonly view: AuthViewContract;

    constructor(view: AuthViewContract) {
        super();
        this.view = view;
    }

    override subscribe(): void {
        this.view.showMenu();
    }

    onUserSelectedLoginOption(): void {
        this.view.showLoginScreen();
    }

    onUserSelectedRegisterOption(): void {
        console.log("Now inmplemts yet");
    }

    override unSubscribe(): void {
        return;
    }
}; 