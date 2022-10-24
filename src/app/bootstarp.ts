import uiTread from "../modules/view/UITread"
import View from "../modules/view/View"

type BootstarpArgs = {
    spalshScreen: View,
    initialFunction: () => Promise<void>,
    mainScreen: View
}

export default async function bootstarp(args: BootstarpArgs) {
    uiTread.startView(args.spalshScreen);

    await args.initialFunction();
    uiTread.startView(args.mainScreen);
}