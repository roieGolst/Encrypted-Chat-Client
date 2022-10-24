import View from "./View";

export interface ViewValidator {
    isCurrentView(view: View): boolean;
    isIncludedView(view: View): boolean
    startView(view: View): void;
    include(view: View): void
}
export class UIThread implements ViewValidator {
    private currentView: View;
    private includedViews: View[] = new Array();

    startView(view: View): void {
        if(this.currentView) {
            this.currentView.onDestroy();
            this.destroyView();
        }
        else {
            this.clearScreen();
        }

        this.currentView = view;
        this.currentView.onStart(); 
    }

    include(view: View): void {
        this.includedViews.push(view);

        view.onStart();
    }

    isCurrentView(view: View): boolean {
        return view == this.currentView;
    }

    isIncludedView(view: View): boolean {
        return this.includedViews.includes(view);
    }

    private clearScreen(): void {
        console.clear();
    }

    private destroyView(): void {
        this.includedViews.forEach((view: View) => {
            view.onDestroy();
        });

        this.includedViews = new Array();
        this.clearScreen();
    }
}

export default new UIThread();