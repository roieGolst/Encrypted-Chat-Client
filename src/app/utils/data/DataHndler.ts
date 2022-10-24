import { IDateHandler } from "../../../modules/network/IDataHandlet";

export class DataHandler implements IDateHandler {

    handleOnData(data: Buffer): void {
            const str = data.toString("utf-8");

            console.log(str)
        }

        handleOnClose(hadError: boolean): void {

            // console.log(hadError);
        }

        handleOnError(err: Error): void {

            console.log(`Error message: ${err}`);
        }
    
}