import { BackendFrameworkEnum, FrontendFrameworkEnum } from "./enums/main";
import { createProject } from "./index";

const envFrontDev = `
export const environment = {
baseUrl: "http://localhost:3000",
production: false,
};
`;

const envFrontProd = `
export const environment = {
baseUrl: "https://a-plus-energy-api-tftftsuywa-ue.a.run.app",
production: true,
};
`;

const envBackend = `
PORT=3000
SERVER_ROOT_URI=http://localhost:3000
CLIENT_REDIRECT_URI=http://localhost:4200
MONGO_URL=mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/__DB_NAME__?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true
DB=aPlusEnergyFundamento
NODEMAILER_USER=administrativo@kunlatek.com
NODEMAILER_PASS=yetyxhgzjzktuwef
ADMIN_USERS=contato@kunlatek.com
`;

const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/ryzzan/Projects/a-plus-energy-fundamento";

import { CLIENT } from "../collections-frontend/clients/a-plus-energy-fundamento/client";
import { CLIENT_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/client-form";
import { CLIENT_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-table";

import { CLIENT_SETTLEMENT } from "../collections-frontend/clients/a-plus-energy-fundamento/client-settlement";
import { CLIENT_SETTLEMENT_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/client-settlement-form";
import { CLIENT_SETTLEMENT_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-settlement-table";

import { CLIENT_SERVICE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-service";
import { CLIENT_SERVICE_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/client-service-form";
import { CLIENT_SERVICE_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/client-service-table";

import { MANUFACTURER } from "../collections-frontend/clients/a-plus-energy-fundamento/manufacturer";
import { MANUFACTURER_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/manufacturer-form";
import { MANUFACTURER_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/manufacturer-table";

import { PRODUCT } from "../collections-frontend/clients/a-plus-energy-fundamento/product";
import { PRODUCT_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/product-form";
import { PRODUCT_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/product-table";

import { SERVICE } from "../collections-frontend/clients/a-plus-energy-fundamento/service";
import { SERVICE_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/service-form";
import { SERVICE_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/service-table";

import { ACTION } from "../collections-frontend/clients/a-plus-energy-fundamento/action";
import { ACTION_FORM } from "../collections-frontend/clients/a-plus-energy-fundamento/action-form";
import { ACTION_TABLE } from "../collections-frontend/clients/a-plus-energy-fundamento/action-table";

const array = [
  CLIENT_FORM,
  CLIENT_TABLE,
  CLIENT,

  CLIENT_SETTLEMENT_FORM,
  CLIENT_SETTLEMENT_TABLE,
  CLIENT_SETTLEMENT,

  CLIENT_SERVICE_FORM,
  CLIENT_SERVICE_TABLE,
  CLIENT_SERVICE,

  MANUFACTURER_FORM,
  MANUFACTURER_TABLE,
  MANUFACTURER,

  PRODUCT_FORM,
  PRODUCT_TABLE,
  PRODUCT,

  SERVICE_FORM,
  SERVICE_TABLE,
  SERVICE,

  ACTION_FORM,
  ACTION_TABLE,
  ACTION,
];

array.forEach((object) => {
  object.backendFramework = BackendFrameworkEnum.Loopback;
  object.frontendFramework = FrontendFrameworkEnum.Angular;
  object.projectPath = projectPath;
  object.cloneFrontendPath = cloneFrontendPath;
  object.cloneBackendPath = cloneBackendPath;
  object.envFrontendDev = envFrontDev;
  object.envFrontendProd = envFrontProd;
  object.envBackend = envBackend;
});

createProject(array);