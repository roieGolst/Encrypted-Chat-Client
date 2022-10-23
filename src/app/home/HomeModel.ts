import NetworkLayer from "../common/NetworkLayer";


export default class HomeModel {
    
    async networkLayerInit(): Promise<boolean> {
        return await NetworkLayer.start();
    }
}