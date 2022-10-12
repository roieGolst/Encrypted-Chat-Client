import BasePresnter from "./BasePresnter";
import viewEngine, { ViewEngineAbstract } from "./viewEngine";

export default abstract class {
    readonly view: ViewEngineAbstract = viewEngine;
    
    abstract onStart(): void;
    abstract onDestroy(): void;
}

