import BasePresnter from "../../common/mvp/BasePresnter";
import BaseView from "../../common/mvp/BaseView";

export abstract class AuthViewContract extends BaseView {
    abstract showMenu(): void;
    abstract showLoginScreen(): void;
    abstract showRegisterScreen(): void;
};

export abstract class AuthPresenterContract extends BasePresnter {
    abstract onUserSelectedLoginOption(): void;
    abstract onUserSelectedRegisterOption(): void;
};