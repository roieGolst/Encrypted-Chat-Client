import BaseView from "./BaseView";

export default class {
    private currentView: BaseView;

    startView(view: BaseView): void {
        if(this.currentView) {
            this.currentView.onDestroy();
            this.destroyView();
        }
        else {
            this.clearView();
        }

        this.currentView = view;
        this.currentView.onStart(); 

    }

    private clearView(): void {
        console.clear();
    }

    private destroyView(): void {
        console.clear();
    }

}