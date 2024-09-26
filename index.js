const forge = require('node-forge');

/**
 * Generate a HMAC signature based on specific data (SHA-256).
 *
 * @param {string} Ee - Data to sign.
 * @param {string} $e - Secret key used for the signature.
 * @returns {string} - The HMAC signature in hexadecimal format.
 */
const generateSignature = (Ee, $e) => {
    const Ae = forge.hmac.create();
    Ae.start("sha256", $e);
    Ae.update(Ee);
    return Ae.digest().toHex();
};

/**
 * Generate a signature based on a specific set of data.
 *
 * @returns {string} - The generated signature.
 */
const getSignature = () => {
    const platformAppVersion = "7.3.2";
    const platformName = "WEB";
    const timestamp = Math.round(new Date().getTime());

    const Ae = "mutationlogin($input:LoginInput!){login(input:$input){targetTypeoperationIdoptionstokenrefreshToken}}";
    const Oe = "nBzK9MFoX4gPUTvBAXfjrymCduC"; // Cookie session static value
    const Ne = `${timestamp}${Ae}${platformName}${platformAppVersion}`;

    return generateSignature(Ne, Oe);
};

console.log("Signature:", getSignature());
console.log("Signature 2:", getSignature());

/**
 * Encrypt data using a public RSA key.
 *
 * @param {string} Ee - Data to encrypt.
 * @param {string} $e - Public key in PEM format.
 * @returns {string} - Encrypted data in base64 format.
 */
const encrypt = (Ee, $e) => {
    const Ae = $e.replace(/\\n/g, ` `); // Replace newline characters

    const Oe = forge.pki.publicKeyFromPem(Ae);
    const Ne = forge.util.encodeUtf8(Ee);
    const Le = Oe.encrypt(Ne, "RSA-OAEP");

    return forge.util.encode64(Le);
};

/**
 * Encrypt user credentials (email and password).
 *
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {string} - Encrypted credentials.
 */
const encryptedCredentials = (email, password) => {
    const publicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlgsI1voWFK88ftHAwDnz\np2pTPGxyO7hEQ4IIb/iG3oR4wZYSiUGU1TC17KUNoGg9npTfWnT+xkAWn7pJyaf4\ndkc7Kp3KIL2kvJgitTn0fobd3R/Kp8fvOIRqnPZa0rZuQJcOjEP0BFZGSBNWdUpu\n4L487hdDLXtyjJ11dplqAyp52Ha10u3d9R2YnAXI67a5hk3ez5PgqmX5toFmv0QP\nQw2Dlu9urL4gvo9vfM2t7DS9xNQSrN0BZkrWZih+mcR6cZ2oa9jLHN1sABYVOecB\nRv3m/4XcH0DCB95YtknG90jngsD4onN4iNjI/IoiJbySB14XK6ViAfmpDWjgi6Qp\nyQIDAQAB\n-----END PUBLIC KEY-----";
    const E = encrypt(`${email} ${password}`, publicKey);
    return E;
};

console.log(
    encryptedCredentials("USER", "PASS")
)
