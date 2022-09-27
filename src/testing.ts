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
MONGO_URL=mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/kliento?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true
DB=kliento
NODEMAILER_USER=administrativo@kunlatek.com
NODEMAILER_PASS=yetyxhgzjzktuwef
ADMIN_USERS=contato@kunlatek.com
`;

const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/ryzzan/Projects/kliento";

import { CLIENT_PERSON } from "../collections-frontend/kunlatek/kliento/client-person";
import { CLIENT_PERSON_FORM } from "../collections-frontend/kunlatek/kliento/client-person-form";
import { CLIENT_PERSON_TABLE } from "../collections-frontend/kunlatek/kliento/client-person-table";

import { CLIENT_COMPANY } from "../collections-frontend/kunlatek/kliento/client-company";
import { CLIENT_COMPANY_FORM } from "../collections-frontend/kunlatek/kliento/client-company-form";
import { CLIENT_COMPANY_TABLE } from "../collections-frontend/kunlatek/kliento/client-company-table";

const array = [
  CLIENT_PERSON_FORM,
  CLIENT_PERSON_TABLE,
  CLIENT_PERSON,

  CLIENT_COMPANY_FORM,
  CLIENT_COMPANY_TABLE,
  CLIENT_COMPANY,
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
