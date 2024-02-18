import { Camera, CameraResultType } from "@capacitor/camera";
import { decode } from "base64-arraybuffer";

const requestCameraPermissions = async () => {
    const result = await Camera.requestPermissions({ permissions: ["camera"] });

    if (result.camera === "denied" || result.camera === "prompt") {
        return;
    }

    return result;
};

export const pickImage = async () => {
    await requestCameraPermissions();

    try {
        const result = await Camera.getPhoto({
            quality: 25,
            allowEditing: false,
            // resultType: CameraResultType.Uri,
            resultType: CameraResultType.Base64,
        });

        if (result.base64String) {
            const blob = new Blob([new Uint8Array(decode(result.base64String))]);
            return blob;
        }

        // return result.webPath;
    } catch (error) {
        console.error("Error picking image", error);
    }
};
