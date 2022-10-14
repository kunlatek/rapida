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

const envBackend = `
PORT=3000
SERVER_ROOT_URI=http://localhost:3000
CLIENT_REDIRECT_URI=http://localhost:4200
MONGO_URL=mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/__DB_NAME__?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true
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

const array = [
  ANIMATION_FORM,
  ANIMATION_TABLE,
  ANIMATION,

  CHARACTER_FORM,
  CHARACTER_TABLE,
  CHARACTER,
];

array.forEach((object) => {
  object.backendFramework = BackendFrameworkEnum.Loopback,
    object.frontendFramework = FrontendFrameworkEnum.Angular,
    object.projectPath = projectPath;
  object.cloneFrontendPath = cloneFrontendPath;
  object.cloneBackendPath = cloneBackendPath;
  object.envFrontendDev = envFrontDev;
  object.envFrontendProd = envFrontProd;
  object.envBackend = envBackend;
});

createProject(array);