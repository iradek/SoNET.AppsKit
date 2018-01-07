/**
 * OAuth authentication type
 */
export enum OAuthGrant {
    /**
     * Resource owner grant.
     */
    ResourceOwner = "ResourceOwner",

    /**
     * Client credentials grant.
     */
    ClientCredentials = "ClientCredentials",

    /**
     * No authentication is expected.
     */
    None = "None"
}