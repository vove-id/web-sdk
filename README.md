Introduction
------------

The VoveSDK for Web enables the straightforward integration of ID verification and KYC compliance into web applications. This SDK provides a simplified, JavaScript API, allowing developers to integrate complex ID verification processes seamlessly.

Installation
------------

To incorporate the VoveSDK into your web project, you can install it via npm or Yarn:

bashCopy code

`npm install @vove-id/web-sdk`

or

bashCopy code

`yarn add @vove-id/web-sdk`

This package includes all necessary dependencies, ensuring a hassle-free setup without the need for additional configurations.

Usage
-----

The core functionality of the VoveSDK is to facilitate ID verification through an easy-to-use function call. This function orchestrates the verification process, requiring a session token and an environment setting.

### Starting ID Verification

To begin the ID verification process, utilize the `processIDMatching` function. This function needs a session token (provided by your backend server) and an environment setting. It returns a promise that resolves with the verification outcome.

#### Function Signature

```javascript
processIDMatching({
  sessionToken: string,
  environment: VoveEnvironment,
  onVerificationComplete?: (status: VoveStatus) => void
})
```

-   `sessionToken`: A token from your backend, required to start the ID verification session.
-   `environment`: Determines the SDK's operation environment, either `VoveEnvironment.Production` or `VoveEnvironment.Development`.
-   `onVerificationComplete`: An optional callback executed with the verification status.

#### Example Usage

```javascript
import { processIDMatching, VoveEnvironment } from '@vove-id/web-sdk';

processIDMatching({
  environment: VoveEnvironment.Production,
  sessionToken: 'your_session_token_here',
  onVerificationComplete: (status) => {
    console.log('Verification status:', status);
  }
});
```

### Handling Verification Results

The verification result is communicated through the `onVerificationComplete` callback:

-   The callback is invoked with a status ("success", "pending", "canceled", or "failed"), indicating the verification outcome.
-   There is no need to handle a Promise's resolve or reject states since the process completion is managed through the callback function.

```javascript
    processIDMatching({
        environment: VoveEnvironment.Production,
        sessionToken: 'your_session_token_here',
        onVerificationComplete: (status) => {
            switch (status) {
                case 'success':
                    console.log('Verification successful.');
                    break;
                case 'pending':
                    console.log('Verification pending.');
                    break;
                case 'canceled':
                    console.log('Verification canceled.');
                    break;
                default:
                    console.log('Unexpected status:', status);
            }
        }
    });
```

API Reference
-------------

### `processIDMatching`

Begins an ID verification session.

Parameters:

-   An object containing:
    -   `sessionToken`: `string`: The session token for the verification process.
    -   `environment`: `VoveEnvironment`: The SDK's operational environment.
    -   `onVerificationComplete`: An optional callback that is invoked with the verification status.


### `VoveEnvironment`

An enumeration specifying the SDK's operating environment:

-   `Production`: Use for production builds.
-   `Sandbox`: Use for development or testing purposes.

Troubleshooting
---------------

Ensure the session token is correctly generated and passed, and the appropriate environment is selected based on your application's stage. For unresolved issues, contact support with detailed information about the problem, including error messages and steps leading up to the issue.
