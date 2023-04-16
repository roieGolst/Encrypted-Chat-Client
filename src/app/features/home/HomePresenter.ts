import AuthRepository from "../../utils/authentication/AuthRepository";
import { Tokens } from "../../encryptedChatProtocol/common/commonTypes";
import HomeModel from "./data";
import { HomePresenterContract, HomeViewContract } from "./HomeContract";

export default class HomePresenter extends HomePresenterContract {
    private readonly view: HomeViewContract;
    private readonly model: HomeModel = new HomeModel();

    constructor(view: HomeViewContract) {
        super();
        this.view = view;
    }

    override subscribe(): void {
        if(!AuthRepository.isLoggedIn()) {
            return this.view.showLoginPage();
        }

        this.view.showMenu();
    }

    override async onUserSelectedCreateChatOption(): Promise<void> {
        const tokens = AuthRepository.getUserTokens();

        if(!tokens) {
            //do something
            return;
        }
        const result = await this.model.sendCreateChatPacket(tokens);

        if(!result.isSuccess) {
            console.error(result.error);
            return;
        }

        this.view.showRoomPage();
    }

    override onUserSelectedJoinChatOption(): void {
        this.view.showJoinChatPrompt();
    }
    
    override async handelJoinChatInput(roomId?: string): Promise<void> {
        const tokens = AuthRepository.getUserTokens();

        if(!tokens) {
            //do something
            return;
        }

        if(!roomId) {
            throw new Error("Something worng");
        }

        const result = await this.model.sendJoinChatPacket(roomId, tokens);

        if(!result.isSuccess) {
            console.error(result.error);
            return;
        }

        this.view.showRoomPage();
    }

    override unSubscribe(): void {
        return;
    }
    
}