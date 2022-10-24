import net from "net";

export default function socketInitializer(): net.Socket {
    return new net.Socket();
};
