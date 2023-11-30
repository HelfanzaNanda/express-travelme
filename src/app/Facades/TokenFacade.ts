import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from '../../config/auth';

class TokenFacade {
    static async sign(payload: object, options?: jwt.SignOptions) {
        return jwt.sign(payload, AUTH_SECRET, options);
    }

    static verify(token: string, audience?: string) {
        // return jwt.verify(token, AUTH_SECRET);

        let result = false;
        let message = null;

        jwt.verify(token, AUTH_SECRET, function(err, decoded) {
            console.log('JWT VERIFY ERR : ', err);
            console.log('JWT VERIFY DECODED : ', decoded);
            if (err instanceof Error) {
                message = err.stack;
                result = false;
            }else{
                message = null;
                result = true;
            }
            // return true;
        });

        return { result, message };
    }
}

export { TokenFacade };