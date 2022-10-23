import BasePresnter from "../BasePresnter";
import { LoginPresenterContract, LoginViewContract } from "./LoginContract";
import LoginModel from "./LoginModel";
import { LoginViewInput } from "./LoginView";

export default class LoginPresenter extends BasePresnter implements LoginPresenterContract {
    private readonly model: LoginModel = new LoginModel();
    private readonly view: LoginViewContract;

    constructor(loginView: LoginViewContract) {
        super()
        this.view = loginView
    }

    override async subscribe(): Promise<void> {
        this.view.showLoginPrompt();
    }

    handelLoginInput(userAttributs: LoginViewInput): void {
        this.model.sendLoginPacket(userAttributs);
        //Build packet and send

        //by answer show chat page / Error;
        //this.view.showChatPage / this.view.showErrors
    }
    
    override unSubscribe(): void {
        throw new Error("Method not implemented.");
    }
    
}