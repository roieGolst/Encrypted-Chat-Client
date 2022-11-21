import BasePresnter from "../../common/mvp/BasePresnter";
import RegisterModel from "./data";
import { RegisterPresenterContract, RegisterViewContract } from "./RegisterContract";
import { RegisterViewInput } from "./RegisterView";

export default class RegisterPresenter extends RegisterPresenterContract {
    private readonly model: RegisterModel = new RegisterModel();
    private readonly view: RegisterViewContract;

    constructor(RegisterView: RegisterViewContract) {
        super()
        this.view = RegisterView
    }

    override async subscribe(): Promise<void> {
        this.view.showRegisterPrompt();
    }

    override async handelRegisterInput(userAttributs: RegisterViewInput): Promise<void> {
        const result = await this.model.sendRegisterPacket(userAttributs);

        if(result) {
            this.view.showAuthScreen()
        } else {
            this.view.showErrorMessage();
        }
    }

    override onErrorMessageShown(clearInterval: number): void {
        setTimeout(() => {
            if(this.view.isActive()) {
                this.view.initRegisterFlow();
            }
            
        }, clearInterval)
    }
    
    override unSubscribe(): void {
        return;
    }
    
}