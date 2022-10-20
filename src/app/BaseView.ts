import BasePresnter from "./BasePresnter";
import View from "../utils/View";

export default abstract class BaseView extends View {
    abstract setPresenter(prester: BasePresnter): void;
    // abstract factory(): BaseView;
};