import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SoNetValidationService } from "../common/sonet.validation.service";


@Component({
    selector: 'sonet-validation-message',
    template: `<div class="alert alert-danger" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ValidationMessageComponent {

    @Input() control: FormControl;
    constructor() { }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return SoNetValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }
}