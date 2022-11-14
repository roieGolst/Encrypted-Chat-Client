import BasePresnter from "../../common/mvp/BasePresnter";
import { LoginPresenterContract, LoginViewContract } from "./LoginContract";
import LoginModel from "./data";
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

    async handelLoginInput(userAttributs: LoginViewInput): Promise<void> {
        const result = await this.model.sendLoginPacket(userAttributs);

        if(result.isSuccess) {
            this.view.showChatScreen();
        } else {
            this.view.showErrorMessage();
        }
    }


    
    override unSubscribe(): void {
        return;
    }
    
}