import BasePresnter from "../../common/mvp/BasePresnter";
import RegisterModel from "./data";
import { RegisterPresenterContract, RegisterViewContract } from "./RegisterContract";
import { RegisterViewInput } from "./RegisterView";

export default class RegisterPresenter extends BasePresnter implements RegisterPresenterContract {
    private readonly model: RegisterModel = new RegisterModel();
    private readonly view: RegisterViewContract;

    constructor(RegisterView: RegisterViewContract) {
        super()
        this.view = RegisterView
    }

    override async subscribe(): Promise<void> {
        this.view.showRegisterPrompt();
    }

    async handelRegisterInput(userAttributs: RegisterViewInput): Promise<void> {
        const result = await this.model.sendRegisterPacket(userAttributs);

        console.log(result);

        if(result) {
            this.view.showAuthScreen()
        } else {
            this.view.showErrorMessage();
        }
    }
    
    override unSubscribe(): void {
        return;
    }
    
}