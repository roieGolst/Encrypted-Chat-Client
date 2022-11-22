import { extend } from "joi";
import { PromptAnswer, PromptType } from "../../../modules/view/viewEngine/types";
import { HomePresenterContract, HomeViewContract } from "./HomeContract";

const HOME_QUESTION = "homeQuestion";
const CREATE_CHAT = "createChat";
const JOIN_CHAT = "joinChat";

export default class HomeView extends HomeViewContract {
    private presenter: HomePresenterContract;

    override setPresenter(presenter: HomePresenterContract): void {
        this.presenter = presenter
    }

    override onStart(): void {
        super.onStart();
        this.presenter.subscribe();
    }

    override showMenu(): void {
        const menuAnswer = this.prompt([{
            type: PromptType.List,
            message: "Choose opstion",
            name: HOME_QUESTION,
            choices: [CREATE_CHAT, JOIN_CHAT]
        }], false);

        menuAnswer.then((choice: PromptAnswer) => {
            switch(choice.get(HOME_QUESTION)) {
                case CREATE_CHAT: {
                    this.presenter.onUserSelectedCreateChatOption();
                    break;
                }
    
                case JOIN_CHAT: {
                    this.presenter.onUserSelectedJoinChatOption();
                    break;
                }
            }
        });
    }

    override showJoinChatPrompt(): void {
        
    }

    override showRoomPage(): void {
        //this.startScreen(RoomPage.factory());
    }

    override onDestroy(): void {
        this.presenter.unSubscribe();
    }
    
}