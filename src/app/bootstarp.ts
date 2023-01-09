import uiTread from "../modules/view/ui/UITread"
import View from "../modules/view/View"

type BootstarpArgs = {
    splashScreen: View,
    initialFunction: () => Promise<void>,
    mainScreen: View
}

export default async function bootstarp(args: BootstarpArgs) {
    uiTread.startView(args.splashScreen);

    await args.initialFunction();
    uiTread.startView(args.mainScreen);
}