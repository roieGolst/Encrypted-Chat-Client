import { SplashPresenterContract, SplashViewContract } from "./SplashContract";

export default class SplashPresenter extends SplashPresenterContract {
    private readonly view: SplashViewContract;

    constructor(view: SplashViewContract) {
        super();
        this.view = view;
    }

    override subscribe(): void {
        this.view.showConnectingMessage();
    }

    override unSubscribe(): void {
        return;
    }
}; 