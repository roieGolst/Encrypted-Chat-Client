import View from "../../View";
import { ViewClass } from "./common/ViewClass";
import { ViewConfigsBundle } from "./common/ViewConfigsBundle";
import { IScreenManager } from "./IScreenManager";

export class ScreenManager implements IScreenManager {
    private currentView: View;
    private includedViews: Map<number, View> = new Map();

    startView(clazz: ViewClass, viewConfigs?: ViewConfigsBundle): void {
        if(this.currentView) {
            this.currentView.onDestroy();
            this.destroyView();
        }
        else {
            this.clearScreen();
        }

        const viewClass = this.bindNew(clazz);

        this.currentView = new viewClass();
        this.currentView.onStart(viewConfigs); 
    }

    include(clazz: ViewClass, viewConfigs?: ViewConfigsBundle): void {
        const viewClass = this.bindNew(clazz);
        const view = new viewClass();

        this.includedViews.set(this.toHash(view), view);

        view.onStart(viewConfigs);
    }

    private bindNew(viewClass: ViewClass): any {
        //TODO: lern more about that!!!;
        return Function.prototype.bind.apply(viewClass, [""]);
    }

    isCurrentView(view: View): boolean {
        return view == this.currentView;
    }

    isIncludedView(view: View): boolean {
        return this.includedViews.has(this.toHash(view));
    }

    hasPerformPermission(view: View): boolean {
        return this.isCurrentView(view) || this.isIncludedView(view);
    }

    private toHash(object: Object): number {
        const str = object.toString();
        let hash = 0;
    
        if (str.length === 0) {
            return hash;  
        } 
    
        for (let i = 0; i < str.length; i++) {
          let chr = str.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    private clearScreen(): void {
        console.clear();
    }

    private destroyView(): void {
        this.includedViews.forEach((view: View) => {
            view.onDestroy();
        });

        this.includedViews = new Map();
        this.clearScreen();
    }
}

export default new ScreenManager();