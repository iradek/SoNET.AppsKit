import { OAuthGrant } from './enums';

/**
 * Configures OAuth requests.
 */
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