import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  experiesIn?: string | number;
}

export const signJWTToken = (
  payload: JwtPayload,
  options: SignOption = { experiesIn: "1H" }
) => {
  const key = process.env.JWT_SECRET;
  //   @ts-ignore
  const token = jwt.sign(payload, key!, { expiresIn: options.experiesIn });
  console.log(token);
  return token;
};

export const verifyJWTToken = (token: string) => {
  try {
    const key = process.env.JWT_SECRET;
    const payload = jwt.verify(token, key!);
    return payload as JwtPayload;
  } catch (e) {
    console.log(e);
    return null;
  }
};
