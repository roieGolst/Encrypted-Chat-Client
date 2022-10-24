import BasePresnter from "./BasePresnter";
import View from "../../../modules/view/View";
import HeaderView from "../../features/header/HeaderView";

export default abstract class BaseView extends View {
    abstract setPresenter(prester: BasePresnter): void;

    override onStart(): void {
        this.incudeView(HeaderView.factory())
    }
};