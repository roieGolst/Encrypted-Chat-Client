import NetworkLayer from "../../utils/network";

export default new NetworkLayer({
    port: 3000,
    host: "127.0.0.1",
    dataHandler: {
        handleOnData(data: Buffer): void {
            const str = data.toString("utf-8");

            console.log(str)
        },

        handleOnClose(hadError: boolean): void {

            // console.log(hadError);
        },

        handleOnError(err: Error): void {

            console.log(`Error message: ${err}`);
        }
    }
})