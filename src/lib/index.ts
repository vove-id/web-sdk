import "./index.css";

type VoveStatus = "success" | "failure" | "pending" | "canceled";
export enum VoveEnvironment {
    PRODUCTION = "production",
    SANDBOX = "sandbox",
}
export enum VoveLocal {
    EN = "en",
    FR = "fr",
    AR = "ar",
    AR_MA = "ar-ma",
}
type VoveConfig = {
    sessionToken: string,
    local?: VoveLocal,
    environment: VoveEnvironment,
    onVerificationComplete?: (status: VoveStatus) => void,
    enableVocalGuidance?: boolean,
    publicKey: string,
}
class Vove {
    constructor() {
        console.log("Vove constructor loaded!");
    }

    processIDMatching = (voveConfig: VoveConfig) => {
        const {sessionToken, environment, publicKey} = voveConfig;

        window.addEventListener("message", (event) => {
            if (event.data.eventName === "verification_completed") {
                voveConfig.onVerificationComplete && voveConfig.onVerificationComplete(event.data.status);
            }
        });
        const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://web.voveid.com";

        window.open(`${baseURL}/?authToken=${sessionToken}&publicKey=${publicKey}&environment=${environment}&lg=${voveConfig.local}&enableVocalGuidance=${voveConfig.enableVocalGuidance || false}`, "popup", "width=800,height=800");
    };
}

export default Vove;
