import { HomePresenterContract, HomeViewContract } from "./HomeContract";

export default class implements HomePresenterContract {

    private readonly view: HomeViewContract;

    constructor(view: HomeViewContract) {
        this.view = view;
    }

    subscribe(): void {
        this.view.showMenu();
    }

    unSubscribe(): void {
        // throw new Error("Method not implemented.");
    }
    
}; 