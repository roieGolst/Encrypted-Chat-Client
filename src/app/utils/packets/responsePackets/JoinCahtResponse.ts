import { PackTypes, Statuses } from "../commonTypes";
import { IBuilder } from "../../../common/IBuilder";
import ResponsePacket from "./ResponsePacket";
export default class JoinChat extends ResponsePacket {
    readonly members?: Map<string, string> | undefined;

    constructor(packetid: string, status: Statuses, type: PackTypes, members: Map<string, string> | undefined = undefined) {
        super();
        this.packetId = packetid;
        this.type = type;
        this.status = status;
        this.members = members;
    }

    static Builder = class implements IBuilder<JoinChat> {
        packetid: string;
        type: PackTypes;
        status: Statuses;
        members?: Map<string, string>;

        setPacketid(packetid: string): this {
            this.packetid = packetid;
            return this;
        }
        
        setType(type: PackTypes): this {
            this.type = type;
            return this;
        }

        setStatus(status: Statuses): this {
            this.status = status;
            return this;
        }

        setMembers(members: Map<string, string>): this {
            this.members = members;
            return this;
        }

        build(): JoinChat {
            if(!this.packetid) {
                throw new Error("'Packet id is required'");
            }

            else if(!this.status) {
                throw new Error("'Status id is required'");
            }

            else if(!this.type) {
                throw new Error("'Type id is required'");
            }

            return new JoinChat(this.packetid, this.status, this.type, this.members);
        }
    }
}