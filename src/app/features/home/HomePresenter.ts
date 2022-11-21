import { HomePresenterContract, HomeViewContract } from "./HomeContract";

export default class HomePresenter extends HomePresenterContract {
    private readonly view: HomeViewContract;

    constructor(view: HomeViewContract) {
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