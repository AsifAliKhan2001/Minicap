import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export type UUID = string;

export const generateUUID = (): UUID => uuidv4();

export const generateToken = (payload: object, secret: string): string => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token: string, secret: string): object | string => {
  return jwt.verify(token, secret);
};

