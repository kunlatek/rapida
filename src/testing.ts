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
DB=merkatado
NODEMAILER_USER=administrativo@kunlatek.com
NODEMAILER_PASS=yetyxhgzjzktuwef
ADMIN_USERS=contato@kunlatek.com
`;


const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/ryzzan/Projects/Clients/merkatado";


import { CLIENT_PERSON } from "../collections-frontend/clients/merkatado/client-person";
import { CLIENT_PERSON_FORM } from "../collections-frontend/clients/merkatado/client-person-form";
import { CLIENT_PERSON_TABLE } from "../collections-frontend/clients/merkatado/client-person-table";

import { CLIENT_COMPANY } from "../collections-frontend/clients/merkatado/client-company";
import { CLIENT_COMPANY_FORM } from "../collections-frontend/clients/merkatado/client-company-form";
import { CLIENT_COMPANY_TABLE } from "../collections-frontend/clients/merkatado/client-company-table";

import { EVENT } from "../collections-frontend/clients/merkatado/event";
import { EVENT_FORM } from "../collections-frontend/clients/merkatado/event-form";
import { EVENT_TABLE } from "../collections-frontend/clients/merkatado/event-table";

import { SCHEDULE_EVENT } from "../collections-frontend/clients/merkatado/schedule-event";
import { SCHEDULE_EVENT_FORM } from "../collections-frontend/clients/merkatado/schedule-event-form";
import { SCHEDULE_EVENT_TABLE } from "../collections-frontend/clients/merkatado/schedule-event-table";

import { AUDIENCE } from "../collections-frontend/clients/merkatado/audience";
import { AUDIENCE_FORM } from "../collections-frontend/clients/merkatado/audience-form";
import { AUDIENCE_TABLE } from "../collections-frontend/clients/merkatado/audience-table";

const array = [
  CLIENT_PERSON_FORM,
  CLIENT_PERSON_TABLE,
  CLIENT_PERSON,


  CLIENT_COMPANY_FORM,
  CLIENT_COMPANY_TABLE,
  CLIENT_COMPANY,


  EVENT_FORM,
  EVENT_TABLE,
  EVENT,

  SCHEDULE_EVENT_FORM,
  SCHEDULE_EVENT_TABLE,
  SCHEDULE_EVENT,

  AUDIENCE_FORM,
  AUDIENCE_TABLE,
  AUDIENCE,
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