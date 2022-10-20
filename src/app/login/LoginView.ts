import BaseView from "../BaseView";
import { LoginViewContract } from "./LoginContract";
import LoginPresenter from "./LoginPresenter";

export default class LoginView extends BaseView implements LoginViewContract {

    private presenter: LoginPresenter;

    setPresenter(presenter: LoginPresenter): void {
        this.presenter = presenter;
    }

    onStart(): void {
        //
    }

    onDestroy(): void {
        throw new Error("Method not implemented.");
    }
    
    static factory(): BaseView {
        const loginView = new LoginView();
        loginView.setPresenter(new LoginPresenter(loginView));

        return loginView;
    }
}