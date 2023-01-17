import { ViewConfigsBundle } from "../../../modules/view/modules/screenManager/common/ViewConfigsBundle";
import { PromptType } from "../../../modules/view/modules/viewEngine/types";
import BaseView from "../../common/mvp/BaseView";
import LoginView from "../login/LoginView";
import { HomePresenterContract, HomeViewContract } from "./HomeContract";
import HomePresenter from "./HomePresenter";

type HomeQuesttion = { homeQuestion: string };
type RoomIdQuestion = { roomId: string };

const HOME_QUESTION = "homeQuestion";
const CREATE_CHAT = "createChat";
const JOIN_CHAT = "joinChat";
const ROOM_ID = "roomId";

export default class HomeView extends HomeViewContract {
    private presenter: HomePresenterContract;

    override onStart(viewConfigs?: ViewConfigsBundle): void  {
        super.onStart();

        this.presenter = new HomePresenter(this);
        this.presenter.subscribe();
    }

    override showMenu(): void {
        const menuAnswer = this.prompt<HomeQuesttion>([{
            type: PromptType.List,
            message: "Choose opstion",
            name: HOME_QUESTION,
            choices: [CREATE_CHAT, JOIN_CHAT]
        }], false);

        menuAnswer.then((choice: HomeQuesttion) => {
            switch(choice.homeQuestion) {
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
        const joinChatAnswer = this.prompt<RoomIdQuestion>([{
            type: PromptType.Input,
            name: ROOM_ID,
            message: "Room id:"
        }], false);

        joinChatAnswer.then((choice: RoomIdQuestion) => {
            const roomId = choice.roomId;
            this.presenter.handelJoinChatInput(roomId)
        })
    }

    override showRoomPage(): void {
        this.log("Roon page :)");
        //this.startScreen(RoomPage.factory());
    }

    override showLoginPage(): void {
        this.startScreen(LoginView.factory());
    }

    override onDestroy(): void {
        this.presenter.unSubscribe();
    }

    static factory(): BaseView {
        return new HomeView();
    }
    
}