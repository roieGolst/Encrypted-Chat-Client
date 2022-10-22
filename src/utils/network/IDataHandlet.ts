export interface IDateHandler {
    handleOnData(data: Buffer): void;
    handleOnError(error: Error): void;
    handleOnClose(hadError: boolean): void;
}