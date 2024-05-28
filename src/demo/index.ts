import Vove, {VoveEnvironment, VoveLocal} from "../lib";
import {v4 as uuidv4} from "uuid";

const vove = new Vove();

let locale = "en";
const head = document.querySelector("head")
if (head) {
 
head.innerHTML = `
<style>
body {
    font-family: Arial, sans-serif; /* Sets the font for the page */
    padding: 20px; /* Adds padding around the content */
}

#mySelector, #myButton {
    width: 200px; /* Sets a specific width for the selector and button */
    padding: 10px; /* Adds padding inside the selector and button */
    margin-top: 5px; /* Adds space above the selector and button */
    font-size: 16px; /* Increases the font size inside the selector and button */
}

#mySelector {
    border: 2px solid #007BFF; /* Adds a blue border to the selector */
    border-radius: 5px; /* Rounds the corners of the selector */
}

#myButton {
    background-color: #007BFF; /* Sets the background color of the button */
    color: white; /* Sets the text color of the button */
    border: none; /* Removes the border from the button */
    cursor: pointer; /* Changes the mouse cursor to a pointer when over the button */
    border-radius: 5px; /* Rounds the corners of the button */
}

#myButton:hover {
    background-color: #0056b3; /* Changes the background color when hovering over the button */
}
</style>
`;
}
const body = document.querySelector("body")
if (body) {
    
body.innerHTML = `
    <div id="vove-id-demo" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <h1>VoveID Demo</h1>
        <select id="mySelector">
            <option value="en">English</option>
            <option value="fr">Francais</option>
            <option value="ar">العربية</option>
            <option value="ar-ma">الدارجة</option>
        </select>
        <button id="myButton">Start ID Scan</button>
    </div>
`;
}

const button = document.getElementById("myButton");
if (button) {
    button.addEventListener("click", function() {
        startIDScan();
    });
}
const selector = document.getElementById('mySelector') as HTMLSelectElement;
if (selector) {
    selector.addEventListener('change', function() {
        locale = this.value;
    });
}

const AuthURL = "https://demo-api.voveid.com";

function onVerificationComplete(status: string) {
    if (status === "success") {
        console.log("ID Matching successful");
    }
}
function startIDScan() {
    fetchNewToken().then(async (authToken) => {
        const sessionToken = await startUserSession(authToken);
        vove.processIDMatching({sessionToken, environment: VoveEnvironment.SANDBOX, onVerificationComplete, local: locale as VoveLocal, enableVocalGuidance: true});
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
