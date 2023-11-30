import { BaseError } from './BaseError';

export interface ValidationInterface {
    [key: string]: string[];
}

export interface ValidationErrorInterface {
    validation : ValidationInterface;
    stackTrace? : string;
}

class ValidationError extends BaseError {
    constructor( public params? : ValidationErrorInterface ) {
        super( 400, 'Validation Error', params?.stackTrace, );
    }

    public override toPlainObject(): object {

        // this.validation = {
        //     email : ['email is required'],
        //     password : ['password is required'],
        // }

        // this.params!!.validation = {
        //     email : ['email is required']
        // }

        return {
            ...super.toPlainObject(),
            validation : this.params?.validation,
            // field: this.params.field,
            // validator: this.params.validator,
        };
    }
}

export { ValidationError };