import View from "./View";
export interface ViewValidator {
    isCurrentView(view: View): boolean;
    isIncludedView(view: View): boolean
    startView(view: View, viewConfigs?: ViewConfigsBundle): void;
    include(view: View, viewConfigs?: ViewConfigsBundle): void
}

export type ViewConfigsBundle = Map<string, any>;

export class UIThread implements ViewValidator {
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

export default new UIThread();