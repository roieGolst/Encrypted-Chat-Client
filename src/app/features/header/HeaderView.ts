import { ViewConfigsBundle } from "../../../modules/cli/modules/screenManager/common/ViewConfigsBundle";
import View from "../../../modules/cli/View";
import logo from "../../utils/view/logoUtil";

export default class HeaderView extends View {

    override onStart(viewConfigs?: ViewConfigsBundle): void {
        this.log(logo);
    }
    
    override onDestroy(): void {
    }
    
};