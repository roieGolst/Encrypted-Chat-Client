import BasePresnter from "../../common/mvp/BasePresnter";
import BaseView from "../../common/mvp/BaseView";

export abstract class HomeViewContract extends BaseView {
    abstract showMenu(): void;
    abstract showJoinChatPrompt(): void;
    abstract showRoomPage(): void;
    abstract showLoginPage(): void;
}

export abstract class HomePresenterContract extends BasePresnter {
    abstract onUserSelectedCreateChatOption(): void;
    abstract onUserSelectedJoinChatOption(): void;
    abstract handelJoinChatInput(roomId?: string): void;
}