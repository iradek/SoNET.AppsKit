import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { IRequestInterceptor } from "../common/request-interceptor.interface";
import { IResponseInterceptor } from "../common/response-interceptor.interface";
import { SoNetProxy } from "../common/soNetProxy.service";

const DEFAULT_INDICATOR_DELAY = 500;

@Component({
    selector: 'sonet-busy-indicator',
    template: `
        <div *ngIf="showIndicator" class="sonet-busy-indicator">        
            <div class="overlay"></div>
            <div class="loader"></div>
        </div>
    `,
    styleUrls: ['./busy-indicator.component.css']
})

export class BusyIndicatorComponent implements OnDestroy, IRequestInterceptor, IResponseInterceptor {

    showIndicatorCounter: number = 0;
    showIndicator: boolean = false;

    @Input()
    displayDelay: number;

    constructor(private soNetProxy: SoNetProxy) {
        this.soNetProxy.registerRequestInterceptor(this);
        this.soNetProxy.registerResponseInterceptor(this);
    }

    beforeRequestAsync() {        
        this.showIndicatorCounter++;
        this.displayDelay = this.displayDelay || DEFAULT_INDICATOR_DELAY;

        setTimeout(() => {
            if (this.shouldShowIndicator) {
                this.showIndicator = true;
            }
        }, this.displayDelay);


        return Promise.resolve(false);
    }

    afterResponseAsync() {
        this.showIndicatorCounter--;
        if (this.shouldHideIndicator)
            this.showIndicator = false;
        return Promise.resolve(false);
    }

    get shouldShowIndicator() {
        return this.showIndicatorCounter > 0;
    }

    get shouldHideIndicator() {
        return this.showIndicatorCounter < 1;
    }

    ngOnDestroy() {
        this.soNetProxy.deregisterRequestInterceptor(this);
        this.soNetProxy.deregisterResponseInterceptor(this);
    }
}
