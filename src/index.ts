import view from "./utils/viewEngine";
import { PromptAnswer, PromptType } from "./utils/viewEngine/types";


view.prompt([
    {
        type: PromptType.List,
        message: "Select option",
        name: "Roie",
        chooices: ["Yoni", "Roie"]
        
    }
], true).then((item: PromptAnswer) => {
    console.log(item);
});