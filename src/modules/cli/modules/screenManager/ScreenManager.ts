import View from "../../View";
import { ViewConfigsBundle } from "./common/ViewConfigsBundle";
import { IScreenManager } from "./IScreenManager";

export class ScreenManager implements IScreenManager {
    private currentView: View;
    private includedViews: Map<number, View> = new Map();

    startView(view: View, viewConfigs?: ViewConfigsBundle): void {
        if(this.currentView) {
            this.currentView.onDestroy();
            this.destroyView();
        }
        else {
            this.clearScreen();
        }

        this.currentView = view;
        this.currentView.onStart(viewConfigs); 
    }

    include(view: View, viewConfigs?: ViewConfigsBundle): void {
        
        this.includedViews.set(this.toHash(view), view);

        view.onStart(viewConfigs);
    }

    isCurrentView(view: View): boolean {
        return view == this.currentView;
    }

    isIncludedView(view: View): boolean {
        return this.includedViews.has(this.toHash(view));
    }

    hasPerformPermission(view: View): boolean {
        if(!this.isCurrentView(view) && !this.isIncludedView(view)) {
            return false;
        }

        return true;
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