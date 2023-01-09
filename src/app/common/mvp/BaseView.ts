import BasePresnter from "./BasePresnter";
import View from "../../../modules/view/View";
import HeaderView from "../../features/header/HeaderView";
import { ViewConfigsBundle } from "../../../modules/view/ui/UITread";

export default abstract class BaseView extends View {
    override onStart(viewConfigs?: ViewConfigsBundle): void {
        this.clearAndLogo();
    }

    protected clearAndLogo() {
        this.clear();
        this.incudeView(HeaderView.factory());
    }
};