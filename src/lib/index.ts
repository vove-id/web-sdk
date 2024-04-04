import "./index.css";

type VoveStatus = "success" | "failure" | "pending" | "canceled";
export enum VoveEnvironment {
    PRODUCTION = "production",
    SANDBOX = "sandbox",
}
type VoveConfig = {
    sessionToken: string,
    environment: VoveEnvironment,
    onVerificationComplete?: (status: VoveStatus) => void,
}
class Vove {
    constructor() {
        console.log("Vove constructor loaded!");
    }

    processIDMatching = (voveConfig: VoveConfig) => {
        const {sessionToken, environment} = voveConfig;

        window.addEventListener("message", (event) => {
            if (event.data.eventName === "verification_completed") {
                voveConfig.onVerificationComplete && voveConfig.onVerificationComplete(event.data.status);
            }
        });

        window.open(`https://web.voveid.com/?authToken=${sessionToken}&environment=${environment}`, "popup", "width=800,height=800");
    };
}

export default Vove;
