import { IDateHandler } from "../../../modules/network/IDataHandlet";
import packetParser from "../packets/parser";

export class DataHandler implements IDateHandler {

    handleOnData(data: Buffer): void {
            const { result, isError } = packetParser.parse(data);

            if(!result) {
                console.log(isError);
            } else {
                console.log(result);
            }
        }

        handleOnClose(hadError: boolean): void {

            // console.log(hadError);
        }

        handleOnError(err: Error): void {

            console.log(`Error message: ${err}`);
        }
    
}