import { BackgraundColor, PromptAnswer, PromptType, TextColor, TextStyle } from "../../../modules/view/viewEngine/types";
import BaseView from "../../common/mvp/BaseView";
import { Tokens } from "../../utils/encryptedChatProtocol/commonTypes";
import { HomePresenterContract, HomeViewContract } from "./HomeContract";
import HomePresenter from "./HomePresenter";

const HOME_QUESTION = "homeQuestion";
const CREATE_CHAT = "createChat";
const JOIN_CHAT = "joinChat";
const ROOM_ID = "roomId";

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
        const joinChatAnswer = this.prompt([{
            type: PromptType.Input,
            name: ROOM_ID,
            message: "Room id:"
        }], false);

        joinChatAnswer.then((choice: PromptAnswer) => {
            const roomId = choice.get(ROOM_ID);
            this.presenter.handelJoinChatInput(roomId)
        })
    }

    override showRoomPage(): void {
        this.log("Roon page :)");
        //this.startScreen(RoomPage.factory());
    }

    override onDestroy(): void {
        this.presenter.unSubscribe();
    }

    static factory(tokens: Tokens): BaseView {
        const homeView = new HomeView();
        homeView.setPresenter(new HomePresenter(homeView, tokens));

        return homeView;
    }
    
}