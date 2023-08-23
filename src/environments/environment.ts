// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiUrl = 'http://49.0.80.15:9440/utcc-mini-project-mobile';
const apiAuthenticationUrl = '/token/authenticate';

export const environment = {
  production: false,
  api_url: apiUrl,
  api_authentication_url: apiUrl + apiAuthenticationUrl,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
