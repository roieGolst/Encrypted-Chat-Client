import { HomeViewContract } from "./HomeContract";
import HomePresenter from "./HomePresenter";

export default class HomeView extends HomeViewContract {
    private presenter: HomePresenter;

    override setPresenter(prester: HomePresenter): void {
        this.presenter = prester;
    }

    override onStart(): void {
        super.onStart();
        this.presenter.subscribe();
    }

    override showConnectingMessage(): void {
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