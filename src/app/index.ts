import SplashView from "./features/spalsh/SplashView";
import NetworkLayer from "./common/network";
import AuthView from "./features/auth/AuthView";
import bootstarp from "./bootstarp";

const initialFunction = async () => {
    await NetworkLayer.start();
};

bootstarp({
    splashScreen: SplashView.factory(),
    initialFunction: initialFunction,
    mainScreen: AuthView.factory()
});
