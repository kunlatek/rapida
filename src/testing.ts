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
DB=executa
NODEMAILER_USER=administrativo@kunlatek.com
NODEMAILER_PASS=yetyxhgzjzktuwef
ADMIN_USERS=contato@kunlatek.com
`;

const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/ryzzan/Projects/Clients/executa";

import { COURSE } from "../collections-frontend/clients/executa/course";
import { COURSE_FORM } from "../collections-frontend/clients/executa/course-form";
import { COURSE_TABLE } from "../collections-frontend/clients/executa/course-table";

import { COURSE_SCHEDULE } from "../collections-frontend/clients/executa/course-schedule";
import { COURSE_SCHEDULE_FORM } from "../collections-frontend/clients/executa/course-schedule-form";
import { COURSE_SCHEDULE_TABLE } from "../collections-frontend/clients/executa/course-schedule-table";

import { QUIZ } from "../collections-frontend/clients/executa/quiz";
import { QUIZ_FORM } from "../collections-frontend/clients/executa/quiz-form";
import { QUIZ_TABLE } from "../collections-frontend/clients/executa/quiz-table";

const array = [
  COURSE_FORM,
  COURSE_TABLE,
  COURSE,

  COURSE_SCHEDULE_FORM,
  COURSE_SCHEDULE_TABLE,
  COURSE_SCHEDULE,

  QUIZ_FORM,
  QUIZ_TABLE,
  QUIZ,
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