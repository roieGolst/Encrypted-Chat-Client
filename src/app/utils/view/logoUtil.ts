import figlet from "figlet";
import ansi  from "ansi-colors";
import gradient from "gradient-string";

const logo = figlet.textSync(`Encrypted-Chat`);
const gradientLogo = gradient.pastel.multiline(logo);

export default gradientLogo + "\r\n " + ansi.bgWhite(ansi.blackBright(` By Roie Golst`)) + "\r\n";