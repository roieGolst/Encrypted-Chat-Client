import BasePresnter from "../BasePresnter";
import { HomePresenterContract, HomeViewContract } from "./HomeContract";

export default class HomePresenter extends BasePresnter implements HomePresenterContract {

    private readonly view: HomeViewContract;

    constructor(view: HomeViewContract) {
        super();
        this.view = view;
    }

    override subscribe(): void {
        this.view.showMenu()
    }

    onUserSelectedLoginOption(): void {
        this.view.showLoginScreen();
    }

    onUserSelectedRegisterOption(): void {
        console.log("Now inmplemts yet");
    }

    override unSubscribe(): void {
        return;
    }
    
}; 