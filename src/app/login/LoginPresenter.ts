import BasePresnter from "../BasePresnter";
import { LoginPresenterContract, LoginViewContract } from "./LoginContract";
import LoginView from "./LoginView";

export default class LoginPresenter extends BasePresnter implements LoginPresenterContract {

    private readonly view: LoginViewContract;

    constructor(loginView: LoginViewContract) {
        super()
        this.view = loginView
    }

    override subscribe(): void {
        throw new Error("Method not implemented.");
    }
    override unSubscribe(): void {
        throw new Error("Method not implemented.");
    }
    
}