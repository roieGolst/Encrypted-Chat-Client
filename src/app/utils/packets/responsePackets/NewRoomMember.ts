import { PacketType, Statuses } from "../commonTypes";
import { IBuilder } from "../../../common/IBuilder";
import ResponsePacket from "./ResponsePacket";

export type SingleMember = {
    socketId: string,
    nickName: string
};

export default class NewRoomMember extends ResponsePacket {
    readonly members: SingleMember;

    constructor(packetid: string, status: Statuses, type: PacketType, members: SingleMember) {
        super(type, status, packetid);
        this.members = members;
    }

    static Builder = class implements IBuilder<NewRoomMember> {
        packetid: string;
        type: PacketType;
        status: Statuses;
        member: SingleMember;

        setPacketid(packetid: string): this {
            this.packetid = packetid;
            return this;
        }
        
        setType(type: PacketType): this {
            this.type = type;
            return this;
        }

        setStatus(status: Statuses): this {
            this.status = status;
            return this;
        }

        setMembers(member: SingleMember): this {
            this.member = member;
            return this;
        }

        build(): NewRoomMember {
            if(!this.packetid) {
                throw new Error("'Packet' id is required");
            }

            else if(!this.status) {
                throw new Error("'Status' id is required");
            }

            else if(!this.type) {
                throw new Error("'Type' id is required");
            }

            else if(!this.member) {
                throw new Error("'Member' is is required");
            }

            return new NewRoomMember(this.packetid, this.status, this.type, this.member);
        }
    }
}