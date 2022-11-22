import BasePresnter from "../../common/mvp/BasePresnter";
import BaseView from "../../common/mvp/BaseView";

export abstract class SplashViewContract extends BaseView {
    abstract showConnectingMessage(): void;
};

export abstract class SplashPresenterContract extends BasePresnter {
};