import BasePresnter from "../BasePresnter";
import NetworkLayer from "../common/NetworkLayer";
import { HomePresenterContract, HomeViewContract } from "./HomeContract";
import HomeModel from "./HomeModel";

export default class HomePresenter extends BasePresnter implements HomePresenterContract {
    private readonly model: HomeModel = new HomeModel();
    private readonly view: HomeViewContract;

    constructor(view: HomeViewContract) {
        super();
        this.view = view;
    }

    override subscribe(): void {
        this.view.showConnectingMessage();
        this.networkLayerInit();
    }

    private networkLayerInit(): void {
        this.model.networkLayerInit()
            .then((isUp: boolean) => {
                if(isUp) {
                    this.view.showAuthScreen();
                }
            })

        this.view.showErrorMessage("Can't connect to the sever");
    }

    override unSubscribe(): void {
        return;
    }
}; 