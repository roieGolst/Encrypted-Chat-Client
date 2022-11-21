import BasePresnter from "../../common/mvp/BasePresnter";
import BaseView from "../../common/mvp/BaseView";

export abstract class HomeViewContract extends BaseView {
    abstract showConnectingMessage(): void;
};

export abstract class HomePresenterContract extends BasePresnter {
};