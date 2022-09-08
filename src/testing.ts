import { createProject } from "./index";

const envFrontDev = `
export const environment = {
  baseUrl: "http://localhost:3000",
  production: false,
};
`;

const envFrontProd = `
export const environment = {
  baseUrl: "http://localhost:3000",
  production: true,
};
`;

const envBackend = `
PORT=3000
SERVER_ROOT_URI=http://localhost:3000
CLIENT_REDIRECT_URI=http://localhost:4200
MONGO_URL=mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true
DB=aPlusEnergyFundamento
NODEMAILER_USER=administrativo@kunlatek.com
NODEMAILER_PASS=yetyxhgzjzktuwef
ADMIN_USERS=rabbadesalman@gmail.com
`;

const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/ryzzan/Projects/a-plus-energy-fundamento";

/**
 * A+ ENERGY
 */
import { CLIENT_PERSON_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/client-person-form";
import { CLIENT_PERSON_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-person-table";
import { CLIENT_PERSON } from "../collections-frontend/clients/a-plus-energy-fundamento/client-person";

import { CLIENT_COMPANY_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/client-company-form";
import { CLIENT_COMPANY_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-company-table";
import { CLIENT_COMPANY } from "../collections-frontend/clients/a-plus-energy-fundamento/client-company";

import { CLIENT_MANUFACTURER_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/client-manufacturer-form";
import { CLIENT_MANUFACTURER_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-manufacturer-table";
import { CLIENT_MANUFACTURER } from "../collections-frontend/clients/a-plus-energy-fundamento/client-manufacturer";

import { CLIENT_PRODUCT_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/client-product-form";
import { CLIENT_PRODUCT_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-product-table";
import { CLIENT_PRODUCT } from "../collections-frontend/clients/a-plus-energy-fundamento/client-product";

import { CLIENT_SERVICE_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/client-service-form";
import { CLIENT_SERVICE_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-service-table";
import { CLIENT_SERVICE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-service";

import { CLIENT_ACTION_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/client-action-form";
import { CLIENT_ACTION_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-action-table";
import { CLIENT_ACTION } from "../collections-frontend/clients/a-plus-energy-fundamento/client-action";
//////////////////////////////////////////////////////////

const array = [
  /**
   * A+ ENERGY 
   */
  CLIENT_PERSON_FORM,
  CLIENT_PERSON_TABLE,
  CLIENT_PERSON,
  
  CLIENT_COMPANY_FORM,
  CLIENT_COMPANY_TABLE,
  CLIENT_COMPANY,
  
  CLIENT_MANUFACTURER_FORM,
  CLIENT_MANUFACTURER_TABLE,
  CLIENT_MANUFACTURER,

  CLIENT_PRODUCT_FORM,
  CLIENT_PRODUCT_TABLE,
  CLIENT_PRODUCT,

  CLIENT_SERVICE_FORM,
  CLIENT_SERVICE_TABLE,
  CLIENT_SERVICE,

  CLIENT_ACTION_FORM,
  CLIENT_ACTION_TABLE,
  CLIENT_ACTION,
];

array.forEach((object) => {
  object.projectPath = projectPath;
  object.cloneFrontendPath = cloneFrontendPath;
  object.cloneBackendPath = cloneBackendPath;
  object.envFrontendDev = envFrontDev;
  object.envFrontendProd = envFrontProd;
  object.envBackend = envBackend;
});

createProject(array);
