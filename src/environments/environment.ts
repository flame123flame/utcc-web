/**
 * environment
 */

/* ==== Dev ==== */
const apiUrl = 'http://192.168.1.102:9000/utcc-mini-project-mobile';

/* ==== Sit ==== */
// const apiUrl = 'http://49.0.80.15:1112/warehouse.sit-api';
const apiAuthenticationUrl = '/token/authenticate';
/* ==== Localhost ==== */
// const apiUrl = 'http://localhost:9000/warehouse.sit-api';

export const environment = {
  production: false,
  api_url: apiUrl,
  api_authentication_url: apiUrl + apiAuthenticationUrl,
};
