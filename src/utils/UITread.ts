import View from "./View";

export interface ViewValidator {
    isCurrentView(view: View): boolean;
}
class UITread implements ViewValidator {
    private currentView: View;

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

    isCurrentView(view: View): boolean {
        return view == this.currentView;
    }

    private clearScreen(): void {
        console.clear();
    }

    private destroyView(): void {
        this.clearScreen();
    }
}

export default new UITread();