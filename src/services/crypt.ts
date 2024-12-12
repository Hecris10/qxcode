import crypto from "crypto";

const algorithm = "aes-256-ctr";
const secretKey = Buffer.from(`${process.env.QR_CODE_SECRET_KEY_ID}`, "base64");

export const encrypt = (text: string): string => {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
  } catch (e) {
    console.error(e);
    return "fail";
  }
};

export const decrypt = (hash: string): string | "fail" => {
  try {
    const [ivHex, encryptedHex] = hash.split(":");
    const ivBuffer = Buffer.from(ivHex, "hex");
    const encryptedBuffer = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv(algorithm, secretKey, ivBuffer);
    const decrypted = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]);

    return decrypted.toString();
  } catch (e) {
    console.error(e);
    return "fail";
  }
};
