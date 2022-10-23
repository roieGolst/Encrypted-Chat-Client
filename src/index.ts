import HomeView from "./app/home/HomeView";
import NetworkLayer from "./app/common/NetworkLayer";
import AuthView from "./app/auth/AuthView";
import bootstarp from "./app/bootstarp";

const initialFunction = async () => {
    await NetworkLayer.start();
};

bootstarp({
    spalshScreen: HomeView.factory(),
    initialFunction: initialFunction,
    mainScreen: AuthView.factory()
});
