import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export function generateToken(userId: Number): string {
    const secretKey = process.env.JWT_SECRET || '';
    const token = jwt.sign({ id: userId }, secretKey, {
        expiresIn: '1h', // Token expiration time
    });
    return token;
}

export function decodeToken(token: string): any {
    const secretKey = process.env.JWT_SECRET || '';
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
}