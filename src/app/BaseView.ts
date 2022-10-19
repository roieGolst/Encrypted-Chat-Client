import BasePresnter from "./BasePresnter";
import View from "../utils/View";

export default abstract class extends View {
    abstract setPresenter(prester: BasePresnter): void
};