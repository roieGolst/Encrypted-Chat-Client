import { IDateHandler } from "../../../modules/network/IDataHandlet";
import packetParser from "../encryptedChatProtocol/parser";

export class DataHandler implements IDateHandler {
    private readonly packetObservers: Map<string,string> = new Map();

    handleOnData(data: Buffer): void {
            const parserResult = packetParser.parse(data);

            if(!parserResult.isSuccess) {
                // console.log(parserResult.error);
            } else {
                console.log(parserResult.value);
            }
        }

        handleOnClose(hadError: boolean): void {

            // console.log(hadError);
        }

        handleOnError(err: Error): void {

            console.log(`Error message: ${err}`);
        }
    
}