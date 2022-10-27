import View from "../../../modules/view/View";
import logo from "../../utils/view/logoUtil";

export default class HeaderView extends View {

    onStart(): void {
        this.log(logo);
    }
    
    onDestroy(): void {
    }

    static factory(): HeaderView {
        return new HeaderView();
    }
    
};