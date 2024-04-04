import Vove, {VoveEnvironment} from "../lib";
import {v4 as uuidv4} from "uuid";

const vove = new Vove();

document.querySelector("body").innerHTML = `
    <div id="vove-id-demo" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <h1>VoveID Demo</h1>
        <button id="start-id-scan" style="margin: 16px; background: #007bff; color: #fff; border: none; padding: 10px 20px; font-size: 16px; border-radius: 20px; cursor: pointer;">Start ID Scan</button>
    </div>
`;

document.getElementById("start-id-scan").addEventListener("click", function() {
    startIDScan();
});

const AuthURL = "https://demo-api.voveid.com";

function onVerificationComplete(status: string) {
    if (status === "success") {
        console.log("ID Matching successful");
    }
}
function startIDScan() {


    fetchNewToken().then(async (authToken) => {
        const sessionToken = await startUserSession(authToken);
        vove.processIDMatching({sessionToken, environment: VoveEnvironment.SANDBOX, onVerificationComplete});
    });
}

async function fetchNewToken() {
    try{
        const response = await fetch(`${AuthURL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": "khalid",
                "password": "LGyxsf^zp6HaTyyTWRhzD2&s"
            })
        })
        const {access_token} = await response.json();
        return access_token;
    }catch (err) {
        console.log('error: ', {err, AuthURL});
    }
}
async function startUserSession(authToken: string) {
    try {
        const body = {
            refId: uuidv4()
        }
        const response = await fetch(`${AuthURL}/sessions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        const {token} = await response.json();
        return token;
    } catch (e) {
        console.log(e)
    }
}
