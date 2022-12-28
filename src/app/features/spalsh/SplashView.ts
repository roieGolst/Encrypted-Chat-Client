import { SplashViewContract } from "./SplashContract";
import SplashPresenter from "./SplashPresenter";

export default class SplashView extends SplashViewContract {
    private presenter: SplashPresenter;

    override onStart(): void {
        super.onStart();

        this.presenter = new SplashPresenter(this);
        this.presenter.subscribe();
    }

    override showConnectingMessage(): void {
        this.log("Connecting to the server...");
    }
    
    override onDestroy(): void {
        this.presenter.unSubscribe();
    }
    
    static factory(): SplashView {
       return new SplashView();
    }
};