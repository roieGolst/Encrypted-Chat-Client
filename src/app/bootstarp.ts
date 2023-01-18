import { ViewClass } from "../modules/cli/modules/screenManager/common/ViewClass";
import uiTread from "../modules/cli/modules/screenManager/ScreenManager";

type BootstarpArgs = {
    splashScreen: ViewClass,
    initialFunction: () => Promise<void>,
    mainScreen: ViewClass
}

export default async function bootstarp(args: BootstarpArgs) {
    uiTread.startView(args.splashScreen);

    await args.initialFunction();
    uiTread.startView(args.mainScreen);
}