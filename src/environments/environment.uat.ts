/**
 * environment uat
 */

const apiUrl = `http://localhost:9000/utcc-project-api`;
const apiAuthenticationUrl = '/token/authenticate';
export const environment = {
  production: true,
  api_url: apiUrl,
  api_authentication_url: apiUrl + apiAuthenticationUrl,
};
