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

const publcKey = encrypter.getKeysPair({key: `-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEA3h0/0NYzwQWPEMtd
VSnvI6W4Jm9O27MSlLzdZc9FHTA41svrApmf4GvhKqw1BI/9Ka8j+kBLw4rWqday
UMPsWwIDAQABAkAEpz44BNTOvWwS4P/Ske9Votopy/kt9yFzhkVpJZ+ADgGSSkhA
DRLrWbhPr+0MvcuuhPI/Lk3UlDJ6b07/jRxhAiEA+b2KtTE3ny6JvZC6dPihe8+X
xbydF7jDC4vVYVt/wTECIQDjrnHGEgWHDGFc8/T4C2awR4PtabljnAWvZ4HjWY7D
SwIhAJNEeCT8zuXpVYQZcjpD20XdVoxd+uzgIPQQE1YD1MQhAiEA0JBCBJEJozZC
EiYfpwC6pow8W8TXYFnSE2Wb5Clrz5UCIQCXCTiIakAP7XMDJFA9S3vz8g+Gyqhe
ifFxHSTo/nhSdw==
-----END PRIVATE KEY-----`, format: "pkcs8"});

const encryptedData = publcKey.encrypt({content: plainText});

console.log(encryptedData);


// const decryptData = rsa.decrypt({content: encryptedData});

// console.log(`Decrypted data: ${decryptData}`);``