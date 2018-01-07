import { Injectable } from "@angular/core";

@Injectable()
export class SoNetIntegrationService {
    /**
     * Gets a value used to pass from outside interop environment.
     * @param key Key under which the value is held.
     */
    getInteropValue(key: string): string {
        if (!key)
            throw new Error("Invalid key to get interop value for");
        let value = window[key];
        if (!value)
            return "";
        return atob(value);
    }
}