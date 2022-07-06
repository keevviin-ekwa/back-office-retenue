import Keycloak from "keycloak-js";
import settings from "../config/settings";


const keycloak = Keycloak({
    realm: "digital-app",
    url: "http://127.0.0.1:8080/auth",
    "ssl-required": "external",
    resource: settings.client,
    clientId: settings.client,
    "public-client": true,
    "verify-token-audience": true,
    "use-resource-role-mappings": true,
    "confidential-port": 0,
});

// const keycloak = Keycloak({
//     realm: "digital-app",
//     url: "https://keycloak.orange.cm/auth",
//     "ssl-required": "external",
//     resource: settings.client,
//     clientId: settings.client,
//     "public-client": true,
//     "verify-token-audience": true,
//     "use-resource-role-mappings": true,
//     "confidential-port": 0,
// });


export default keycloak;