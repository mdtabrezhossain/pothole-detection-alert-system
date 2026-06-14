import ImageKit from "imagekit";
import envVars from "../configs/env.config.js";

const {
    imageKitPrivateKey,
    imageKitPublicKey,
    imageKitUrl,
} = envVars;

const imageKit = new ImageKit({
    privateKey: imageKitPrivateKey,
    publicKey: imageKitPublicKey,
    urlEndpoint: imageKitUrl,
});

export default imageKit;

