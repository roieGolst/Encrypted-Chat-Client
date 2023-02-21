import View from "../../View";
import { ViewClass } from "./common/ViewClass";
import { ViewConfigsBundle } from "./common/ViewConfigsBundle";

export interface IScreenManager {
    isCurrentView(view: View): boolean;
    isIncludedView(view: View): boolean;
    startView(clazz: ViewClass, viewConfigs?: ViewConfigsBundle): void;
    include(clazz: ViewClass, viewConfigs?: ViewConfigsBundle): void;
    hasPerformPermission(view: View): boolean;
}