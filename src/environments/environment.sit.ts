/**
 * environment sit
 */

const apiUrl = `http://localhost:9000/utcc-mini-project-mobile`;
const apiAuthenticationUrl = '/token/authenticate';
export const environment = {
  production: true,
  api_url: apiUrl,
  api_authentication_url: apiUrl + apiAuthenticationUrl,
};
