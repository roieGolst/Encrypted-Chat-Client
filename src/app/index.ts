// import SplashView from "./features/spalsh/SplashView";
// import NetworkLayer from "./common/network";
// import AuthView from "./features/auth/AuthView";
// import bootstarp from "./bootstarp";

// const initialFunction = async () => {
//     await NetworkLayer.start();
// };

// bootstarp({
//     splashScreen: SplashView.factory(),
//     initialFunction: initialFunction,
//     mainScreen: AuthView.factory()
// });

import Encryption from "./../modules/encryption";
const plainText: string = "Roie is the men";


const encrypter = Encryption.factory();

// const publcKey = encrypter.getKeysPair({key: `-----BEGIN PUBLIC KEY-----
// MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAINtfIZH/Xrd+Ld8Tkv82xMqYlO6uXzd
// 9EEnolbyQehttBYn8WVSZgruDxpGspp8/aaxpfoiGv8HbThIC/XV9A8CAwEAAQ==
// -----END PUBLIC KEY-----`, format: "pkcs8-public"});

// const encryptedData = publcKey.encrypt({content: plainText});

const encryptedData = `JTh2w2HE1FwAO82AherCjOC0rMqeiqhJVkJiearEvAOLy0R/KLWrOo/4g1gYpJIuq58uh0SZMdTphXVHHuxTOw==`;

// console.log(encryptedData);

const privateKey = encrypter.getKeysPair({key: `-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJBAINtfIZH/Xrd+Ld8Tkv82xMqYlO6uXzd9EEnolbyQehttBYn8WVS
ZgruDxpGspp8/aaxpfoiGv8HbThIC/XV9A8CAwEAAQJAOZzwPokmZAsUMZMLW6Iv
gvpMejnbgBJoNXujXYv7OmDfFPmEXDL8iVE5UCqJ9eQeZq6mAA+aDhNMm+M72Bgd
CQIhAOrZtBg6UyVyrisYaNIVipKMurpvDDF3S2p6qE3NXunjAiEAj0NzfSgv49/i
1n61iVToZmOsuOM+huGI7XW91AgDFOUCIB5+0nHq8O0F7TPPYZ0WCv5oo76duNmb
ggF7l+syZca9AiAjdp/9CFiqgP5m+GC5ySHqTpwv/Fi7DNNXbMD73qvcnQIgYV4C
yIyBTD7H/F6CioOkKuEAhUVjGOo7BEMbdajIA7E=
-----END RSA PRIVATE KEY-----`, format: "private"});

const decryptedData = privateKey.decrypt({content: encryptedData});

console.log(decryptedData);