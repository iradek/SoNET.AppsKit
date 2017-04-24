    /**
     * OAuth authentication type
     */
    export enum OAuthGrant
    {
        /**
         * Resource owner grant.
         */
        ResourceOwner,

        /**
         * Client credentials grant.
         */
        ClientCredentials,

        /**
         * No authentication is expected.
         */
        None
    }