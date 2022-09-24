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
AUTH_DB=uzanto
PORT=3000
SERVER_ROOT_URI=http://localhost:3000
CLIENT_REDIRECT_URI=http://localhost:4200
MONGO_URL=mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true
DB=rapida
NODEMAILER_USER=administrativo@kunlatek.com
NODEMAILER_PASS=yetyxhgzjzktuwef
ADMIN_USERS=contato@kunlatek.com
`;

const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/ryzzan/Projects/rapida-backoffice";

import { COMPONENT } from "../collections-frontend/kunlatek/rapida-backoffice/component";
import { COMPONENT_FORM } from "../collections-frontend/kunlatek/rapida-backoffice/component-form";
import { COMPONENT_TABLE } from "../collections-frontend/kunlatek/rapida-backoffice/component-table";

import { MODULE } from "../collections-frontend/kunlatek/rapida-backoffice/module";
import { MODULE_FORM } from "../collections-frontend/kunlatek/rapida-backoffice/module-form";
import { MODULE_TABLE } from "../collections-frontend/kunlatek/rapida-backoffice/module-table";

import { PROJECT } from "../collections-frontend/kunlatek/rapida-backoffice/project";
import { PROJECT_FORM } from "../collections-frontend/kunlatek/rapida-backoffice/project-form";
import { PROJECT_TABLE } from "../collections-frontend/kunlatek/rapida-backoffice/project-table";

const array = [
  COMPONENT_FORM,
  COMPONENT_TABLE,
  COMPONENT,

  MODULE_FORM,
  MODULE_TABLE,
  MODULE,

  PROJECT_FORM,
  PROJECT_TABLE,
  PROJECT,
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
