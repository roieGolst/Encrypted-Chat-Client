import BasePresnter from "./BasePresnter";
import View from "../utils/view/View";
import logoView from "./common/LogoView";
export default abstract class BaseView extends View {
    abstract setPresenter(prester: BasePresnter): void;

    override onStart(): void {
        this.log(logoView);
    }
};