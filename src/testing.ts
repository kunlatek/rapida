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
  baseUrl: "http://localhost:3000",
  production: true,
};
`;

const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const projectPath = "/home/Robson/Projetos/frontend-dona_sara-node";

import { COMPANY } from "../collections-frontend/clients/backoffice-sara/company";
import { COMPANY_FORM } from "../collections-frontend/clients/backoffice-sara/company-form";
import { COMPANY_TABLE } from "../collections-frontend/clients/backoffice-sara/company-table";

import { LEAFLET } from "../collections-frontend/clients/backoffice-sara/leaflet";
import { LEAFLET_FORM } from "../collections-frontend/clients/backoffice-sara/leaflet-form";
import { LEAFLET_TABLE } from "../collections-frontend/clients/backoffice-sara/leaflet-table";

import { PRODUCT } from "../collections-frontend/clients/backoffice-sara/product";
import { PRODUCT_FORM } from "../collections-frontend/clients/backoffice-sara/product-form";
import { PRODUCT_TABLE } from "../collections-frontend/clients/backoffice-sara/product-table";

import { RECALL } from "../collections-frontend/clients/backoffice-sara/recall";
import { RECALL_FORM } from "../collections-frontend/clients/backoffice-sara/recall-form";
import { RECALL_TABLE } from "../collections-frontend/clients/backoffice-sara/recall-table";


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
  object.backendFramework = BackendFrameworkEnum.Loopback;
  object.frontendFramework = FrontendFrameworkEnum.Angular;
  object.projectPath = projectPath;
  object.cloneFrontendPath = cloneFrontendPath;
  object.envFrontendDev = envFrontDev;
  object.envFrontendProd = envFrontProd;
});

createProject(array);

