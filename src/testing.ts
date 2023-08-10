import { FrontendFrameworkEnum } from "./enums/main";
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
MONGO_URL=mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/__DB_NAME__?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true
DB=animation
NODEMAILER_USER=administrativo@kunlatek.com
NODEMAILER_PASS=yetyxhgzjzktuwef
ADMIN_USERS=idrobsonmedeiros@gmail.com
`;


const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/robsonpop/Projetos/dona-sara";

import { COMPANY } from "../rapida-clients/clients/backoffice-sara/company";
import { COMPANY_FORM } from "../rapida-clients/clients/backoffice-sara/company-form";
import { COMPANY_TABLE } from "../rapida-clients/clients/backoffice-sara/company-table";

import { LEAFLET } from "../rapida-clients/clients/backoffice-sara/leaflet";
import { LEAFLET_FORM } from "../rapida-clients/clients/backoffice-sara/leaflet-form";
import { LEAFLET_TABLE } from "../rapida-clients/clients/backoffice-sara/leaflet-table";

import { PRODUCT } from "../rapida-clients/clients/backoffice-sara/product";
import { PRODUCT_FORM } from "../rapida-clients/clients/backoffice-sara/product-form";
import { PRODUCT_TABLE } from "../rapida-clients/clients/backoffice-sara/product-table";

import { RECALL } from "../rapida-clients/clients/backoffice-sara/recall";
import { RECALL_FORM } from "../rapida-clients/clients/backoffice-sara/recall-form";
import { RECALL_TABLE } from "../rapida-clients/clients/backoffice-sara/recall-table";


const array = [
  COMPANY,
  COMPANY_FORM,
  COMPANY_TABLE,

  LEAFLET,
  LEAFLET_FORM,
  LEAFLET_TABLE,

  PRODUCT,
  PRODUCT_FORM,
  PRODUCT_TABLE,

  RECALL,
  RECALL_FORM,
  RECALL_TABLE,
];

array.forEach((object) => {
  // object.backendFramework = BackendFrameworkEnum.Loopback;
  object.frontendFramework = FrontendFrameworkEnum.Angular;
  object.projectPath = projectPath;
  object.cloneFrontendPath = cloneFrontendPath;
  object.envFrontendDev = envFrontDev;
  object.envFrontendProd = envFrontProd;
});

createProject(array);