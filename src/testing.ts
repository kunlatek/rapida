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
DB=animation
NODEMAILER_USER=administrativo@kunlatek.com
NODEMAILER_PASS=yetyxhgzjzktuwef
ADMIN_USERS=contato@kunlatek.com
`;

const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/ryzzan/Projects/animation";

import { ANIMATION } from "../collections-frontend/example/animation/animation";
import { ANIMATION_FORM } from "../collections-frontend/example/animation/animation-form";
import { ANIMATION_TABLE } from "../collections-frontend/example/animation/animation-table";

import { CHARACTER } from "../collections-frontend/example/animation/character";
import { CHARACTER_FORM } from "../collections-frontend/example/animation/character-form";
import { CHARACTER_TABLE } from "../collections-frontend/example/animation/character-table";

// import { CLIENT_PERSON } from "../collections-frontend/kunlatek/kliento/client-person";
// import { CLIENT_PERSON_FORM } from "../collections-frontend/kunlatek/kliento/client-person-form";
// import { CLIENT_PERSON_TABLE } from "../collections-frontend/kunlatek/kliento/client-person-table";

// import { CLIENT_COMPANY } from "../collections-frontend/kunlatek/kliento/client-company";
// import { CLIENT_COMPANY_FORM } from "../collections-frontend/kunlatek/kliento/client-company-form";
// import { CLIENT_COMPANY_TABLE } from "../collections-frontend/kunlatek/kliento/client-company-table";

const array = [
  ANIMATION_FORM,
  ANIMATION_TABLE,
  ANIMATION,

  CHARACTER_FORM,
  CHARACTER_TABLE,
  CHARACTER,
  // CLIENT_COMPANY_FORM,
  // CLIENT_COMPANY_TABLE,
  // CLIENT_COMPANY,

  // CLIENT_PERSON_FORM,
  // CLIENT_PERSON_TABLE,
  // CLIENT_PERSON,
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
