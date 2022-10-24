import { HomeViewContract } from "./HomeContract";
import HomePresenter from "./HomePresenter";
import BaseView from "../../common/mvp/BaseView";

export default class HomeView extends BaseView implements HomeViewContract {
    private presenter: HomePresenter;

    override setPresenter(prester: HomePresenter): void {
        this.presenter = prester;
    }

    override onStart(): void {
        super.onStart();
        this.presenter.subscribe();
    }

    showConnectingMessage(): void {
        this.log("Connecting to the server...");
    }
    
    override onDestroy(): void {
        this.presenter.unSubscribe();
    }
    
    static factory() {
        const homeView = new HomeView();
        homeView.setPresenter(new HomePresenter(homeView));

        return homeView;
    }
};