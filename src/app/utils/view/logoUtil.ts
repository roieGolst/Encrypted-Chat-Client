import figlet from "figlet";
import chalk from "chalk";
import gradient from "gradient-string";

const logo = figlet.textSync(`Encrypted-Chat`);
const gradientLogo = gradient.pastel.multiline(logo);

export default gradientLogo + "\r\n " + chalk.bgWhite(chalk.blackBright(` By Roie Golst`)) + "\r\n";