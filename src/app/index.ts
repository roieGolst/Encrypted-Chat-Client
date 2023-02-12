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

const encrypter = Encryption.factory();

const plainText: string = "Roie is the men";

const rsa = encrypter.getKeysPair();

const encryptedData = rsa.encrypt({content: plainText});

console.log(encryptedData);

const decryptData = rsa.decrypt({content: encryptedData});

console.log(`Decrypted data: ${decryptData}`);