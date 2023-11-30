import bodyParser from "body-parser";
import { Middleware } from "../../lib/Middleware";
import { UnauthorizedError } from "../../app/Errors";
import { PasswordFacade, TokenFacade } from "../../app/Facades";

class AuthMiddleware extends Middleware {
    protected static override handle(): any {

        console.log('this.request.headers.authorization : ', this.request.headers.authorization);
        
        if (this.request.headers.authorization === undefined || this.request.headers.authorization === null) {
            throw new UnauthorizedError();
        }

        let token = this.request.headers.authorization.toString().split(" ")[1];

        if (token === ''){
            throw new UnauthorizedError();
        }

        console.log('token : ', token);
        
        
        const { result, message } = TokenFacade.verify(token);
        console.log('result : ', result);
        console.log('message : ', message);
        if (!result){
            throw new UnauthorizedError(message!!);
        }
        
        return this.next();
    }
}

export { AuthMiddleware };
