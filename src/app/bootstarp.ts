import uiTread from "../modules/cli/modules/screenManager/ScreenManager"
import View from "../modules/cli/View"

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