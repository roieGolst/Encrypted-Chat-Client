import uiTread from "./utils/UITread";
import HomeView from "./app/home/HomeView"
import HomePresenter from "./app/home/HomePresenter";

const homeView = new HomeView();
homeView.setPresenter(new HomePresenter(homeView));

uiTread.startView(homeView);