import HomeView from "./features/home/HomeView";
import NetworkLayer from "./common/network";
import AuthView from "./features/auth/AuthView";
import bootstarp from "./bootstarp";

const initialFunction = async () => {
    await NetworkLayer.start();
};

bootstarp({
    spalshScreen: HomeView.factory(),
    initialFunction: initialFunction,
    mainScreen: AuthView.factory()
});
