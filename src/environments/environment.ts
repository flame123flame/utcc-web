/**
 * environment
 */

/* ==== Dev ==== */
const apiUrl = `http://localhost:9000/utcc-project-api`;
const apiAuthenticationUrl = '/token/authenticate';

export const environment = {
  production: false,
  api_url: apiUrl,
  api_authentication_url: apiUrl + apiAuthenticationUrl,
};
