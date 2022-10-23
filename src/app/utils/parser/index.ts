// import { IResult } from "../../../common/IResult";
// import Packet from "../packetBuilder/Packet";

// class Parser {

//     private dataToJson(data: string): IResult<Packet> {
//         try {
//             return {
//                 result: JSON.parse(data)
//             };
//         }
//         catch(err) {
//             return {
//                 isError: "Invalid "
//             }
//         }
//     }

//     parse(data: Buffer): Packet {
//         const stringData = data.toString("utf8");
//     }
// }