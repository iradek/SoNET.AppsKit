import { AbstractControl } from "@angular/forms";

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidEmailAddress': 'Invalid email address',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'maxlength': `Maximum length ${validatorValue.requiredLength}`,
            'invalidNumber': `Not a number`,
        };
        return config[validatorName];
    }

    static emailValidator(control: AbstractControl) {
        let error = { 'invalidEmailAddress': true };
        if (!control || !control.value)
            return error;
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/))
            return null;
        return error;
    }

    static invalidNumber(control: AbstractControl) {
        let error = { 'invalidNumber': true };
        if (!control || !control.value)
            return error;
        if (!isNaN(control.value))
            return null; //number already
        return control.value.match(/^[0-9]+$/) ? null : error;
    }
}