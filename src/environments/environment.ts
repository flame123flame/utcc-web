/**
 * environment
 */

/* ==== Dev ==== */
// const apiUrl = 'http://192.168.1.187:9000/warehouse.dev-api';

/* ==== Sit ==== */
const apiUrl = 'http://49.0.80.15:1112/warehouse.sit-api';
const apiAuthenticationUrl = '/token/authenticate';
/* ==== Localhost ==== */
// const apiUrl = 'http://localhost:9000/warehouse.sit-api';

export const environment = {
  production: false,
  api_url: apiUrl,
  api_authentication_url: apiUrl + apiAuthenticationUrl,
};
