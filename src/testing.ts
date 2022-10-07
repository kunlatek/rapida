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
AUTH_DB=uzanto
PORT=3000
SERVER_ROOT_URI=http://localhost:3000
CLIENT_REDIRECT_URI=http://localhost:4200
MONGO_URL=mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/__DB_NAME__?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true
DB=loko
NODEMAILER_USER=administrativo@kunlatek.com
NODEMAILER_PASS=yetyxhgzjzktuwef
ADMIN_USERS=contato@kunlatek.com
 
`;

const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/ryzzan/Projects/loko-backoffice";

import { MULTIVERSE } from "../collections-frontend/kunlatek/loko-backoffice/multiverse";
import { MULTIVERSE_FORM } from "../collections-frontend/kunlatek/loko-backoffice/multiverse-form";
import { MULTIVERSE_TABLE } from "../collections-frontend/kunlatek/loko-backoffice/multiverse-table";

import { GALAXY } from "../collections-frontend/kunlatek/loko-backoffice/galaxy";
import { GALAXY_FORM } from "../collections-frontend/kunlatek/loko-backoffice/galaxy-form";
import { GALAXY_TABLE } from "../collections-frontend/kunlatek/loko-backoffice/galaxy-table";

import { PLANETARY_SYSTEM } from "../collections-frontend/kunlatek/loko-backoffice/planetary-system";
import { PLANETARY_SYSTEM_FORM } from "../collections-frontend/kunlatek/loko-backoffice/planetary-system-form";
import { PLANETARY_SYSTEM_TABLE } from "../collections-frontend/kunlatek/loko-backoffice/planetary-system-table";

import { PLANET } from "../collections-frontend/kunlatek/loko-backoffice/planet";
import { PLANET_FORM } from "../collections-frontend/kunlatek/loko-backoffice/planet-form";
import { PLANET_TABLE } from "../collections-frontend/kunlatek/loko-backoffice/planet-table";

import { COUNTRY } from "../collections-frontend/kunlatek/loko-backoffice/country";
import { COUNTRY_FORM } from "../collections-frontend/kunlatek/loko-backoffice/country-form";
import { COUNTRY_TABLE } from "../collections-frontend/kunlatek/loko-backoffice/country-table";

import { STATE } from "../collections-frontend/kunlatek/loko-backoffice/state";
import { STATE_FORM } from "../collections-frontend/kunlatek/loko-backoffice/state-form";
import { STATE_TABLE } from "../collections-frontend/kunlatek/loko-backoffice/state-table";

import { CITY } from "../collections-frontend/kunlatek/loko-backoffice/city";
import { CITY_FORM } from "../collections-frontend/kunlatek/loko-backoffice/city-form";
import { CITY_TABLE } from "../collections-frontend/kunlatek/loko-backoffice/city-table";

const array = [
  MULTIVERSE_FORM,
  MULTIVERSE_TABLE,
  MULTIVERSE,

  GALAXY_FORM,
  GALAXY_TABLE,
  GALAXY,

  PLANETARY_SYSTEM_FORM,
  PLANETARY_SYSTEM_TABLE,
  PLANETARY_SYSTEM,

  PLANET_FORM,
  PLANET_TABLE,
  PLANET,

  COUNTRY_FORM,
  COUNTRY_TABLE,
  COUNTRY,

  STATE_FORM,
  STATE_TABLE,
  STATE,

  CITY_FORM,
  CITY_TABLE,
  CITY,
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