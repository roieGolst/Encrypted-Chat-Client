import NetworkLayer from "../../../modules/network";
import { DataHandler } from "../../utils/data/DataHndler";

export default new NetworkLayer({
    port: 3000,
    host: "127.0.0.1",
    dataHandler: new DataHandler()
})