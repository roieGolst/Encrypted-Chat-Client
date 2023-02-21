import { ViewConfigsBundle } from "../../../modules/cli/modules/screenManager/common/ViewConfigsBundle";
import HomeView from "../home/HomeView";
import { RoomPresenterContract, RoomViewContranct } from "./RoomContract";
import RoomPresnter from "./RoomPresenter";

export default class RoomView extends RoomViewContranct {
    private presenter: RoomPresenterContract;

    override onStart(viewConfigs?: ViewConfigsBundle): void {
        const roomId = viewConfigs?.get("roomId");

        if(!roomId) {
            this.error("Room page can't initialize without room id!");
            this.startScreen(HomeView);
        }

        this.presenter = new RoomPresnter();
        this.presenter.subscribe();
    }

    override onDestroy(): void {
        throw new Error("Method not implemented.");
    }
} 