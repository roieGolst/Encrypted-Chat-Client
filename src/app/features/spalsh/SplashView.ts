import { SplashViewContract } from "./SplashContract";
import SplashPresenter from "./SplashPresenter";

export default class SplashView extends SplashViewContract {
    private presenter: SplashPresenter;

    override setPresenter(prester: SplashPresenter): void {
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
    
    static factory(): SplashView {
        const splashView = new SplashView();
        splashView.setPresenter(new SplashPresenter(splashView));

        return splashView;
    }
};