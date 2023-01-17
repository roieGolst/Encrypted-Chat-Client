import View from "../../../modules/cli/View";
import HeaderView from "../../features/header/HeaderView";
import { ViewConfigsBundle } from "../../../modules/cli/modules/screenManager/common/ViewConfigsBundle";

export default abstract class BaseView extends View {
    override onStart(viewConfigs?: ViewConfigsBundle): void {
        this.clearAndLogo();
    }

    protected clearAndLogo() {
        this.clear();
        this.incudeView(HeaderView.factory());
    }
};