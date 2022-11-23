import { Tokens } from "../../utils/encryptedChatProtocol/commonTypes";
import HomeModel from "./data";
import { HomePresenterContract, HomeViewContract } from "./HomeContract";

export default class HomePresenter extends HomePresenterContract {
    private readonly view: HomeViewContract;
    private readonly model: HomeModel = new HomeModel();
    private readonly tokens: Tokens;

    constructor(view: HomeViewContract, tokens: Tokens) {
        super();
        this.view = view;
        this.tokens = tokens;
    }

    override subscribe(): void {
        this.view.showMenu();
    }

    override async onUserSelectedCreateChatOption(): Promise<void> {
        const result = await this.model.sendCreateChatPacket(this.tokens);

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
        if(!roomId) {
            throw new Error("Something worng");
        }

        const result = await this.model.sendJoinChatPacket(roomId, this.tokens);

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