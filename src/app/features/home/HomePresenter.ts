import { HomePresenterContract, HomeViewContract } from "./HomeContract";

export default class HomePresenter extends HomePresenterContract {
    private readonly view: HomeViewContract;

    constructor(view: HomeViewContract) {
        super();
        this.view = view;
    }

    override onUserSelectedCreateChatOption(): void {
        this.view.showRoomPage();
    }

    override onUserSelectedJoinChatOption(): void {
        this.view.showJoinChatPrompt();
    }

    override subscribe(): void {
        this.view.showMenu();
    }

    override unSubscribe(): void {
        return;
    }
    
}