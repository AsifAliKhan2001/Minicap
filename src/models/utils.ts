import jwt from 'jsonwebtoken';


export const generateToken = (payload: object, secret: string): string => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token: string, secret: string): object | string => {
  return jwt.verify(token, secret);
};

