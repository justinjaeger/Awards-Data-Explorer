Starter template for applications that connect to an API, deal with users + authentication, and benefit from server-side rendering.

Built with React, Next.js, Node, and MySQL. Best for single-page applications if looking to do client-side rendering only.

For client-side rendering / single page applications, check out the sibling application, Fullstack-Login-Starter.

Authentication flow is as follows:

-   user submits a signup form
-   if all formatting is correct, it encrypts password (via bcrypt) and enters the user in the database
-   server sends the user an email with a verification link
-   the link redirects them to the login window where they enter their password one last time
-   once logged in, an accessToken (JWT) is issued in a cookie, and is also stored in a database
-   accessToken stores an encrypted userId that is required to make any requests
-   the token expires every 10 minutes, wherein it makes a request to the database to ensure that it is valid, and reissues a token
-   because tokens are deleted in the database every time they are validated, we can detect when a hacker has obtained your token since two people would be requesting the same token (by the second request, the token will have been deleted)
-   if a request is made for a token that does not exist, the app will automatically delete all session tokens associated with the user, making it impossible to proceed without a password
