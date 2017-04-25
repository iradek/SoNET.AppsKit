import { OAuthGrant } from './enums';
import { Injectable } from "@angular/core";

/**
 * Configures OAuth requests.
 */
@Injectable()
export class OAuthConfig {
    /** Supported OAuth grant type. */
    oAuthGrant: OAuthGrant;

    /** Name of the Site when Site-level access is being requested */
    siteName: string;

    /** Name of the user when ResourceOwner grant is used. */
    userName: string;

    /** User password when ResourceOwner grant is used. */
    userPassword: string;

    /** User password is already encrypted */
    passwordAlreadyEncrypted: boolean
}