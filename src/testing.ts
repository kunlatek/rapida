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
SERVER_ROOT_URI=http://localhost
CLIENT_REDIRECT_URI=http://localhost:4200
MONGO_URL=mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true
DB=rapida
NODEMAILER_USER=
NODEMAILER_PASS=
ADMIN_USERS=
`;

/**
* LOPES API
*/
// const envFrontDev = `
// export const envFrontProd = {
//     firebase: {
//         projectId: 'kunlatek-quickstart',
//         appId: '1:61322235717:web:2c454bc7bd593cc6d3f82c',
//         storageBucket: 'kunlatek-quickstart.appspot.com',
//         apiKey: 'AIzaSyCLOB3dc091tFAuj9LEsarILOBVzL-dqhQ',
//         authDomain: 'kunlatek-quickstart.firebaseapp.com',
//         messagingSenderId: '61322235717',
//         measurementId: 'G-V8W65TSX41',
//     },
//     baseUrl: 'https://devapilogin.lpsbr.com/api/v1',
//     clientId: '3bb9f7e7-a96f-4657-8039-4755de62a233',
//     clientSecret: 'b80a0043-c89d-4571-bb96-515e27a4808f',
//     production: false
// };`;
 
// const envFrontProd = `
// export const environment = {
//     firebase: {
//         projectId: 'kunlatek-quickstart',
//         appId: '1:61322235717:web:2c454bc7bd593cc6d3f82c',
//         storageBucket: 'kunlatek-quickstart.appspot.com',
//         apiKey: 'AIzaSyCLOB3dc091tFAuj9LEsarILOBVzL-dqhQ',
//         authDomain: 'kunlatek-quickstart.firebaseapp.com',
//         messagingSenderId: '61322235717',
//         measurementId: 'G-V8W65TSX41',
//     },
//     baseUrl: '????',
//     clientId: '3bb9f7e7-a96f-4657-8039-4755de62a233',
//     clientSecret: 'b80a0043-c89d-4571-bb96-515e27a4808f',
//     production: true
// };`;

// const cloneFrontendPath = 'https://github.com/ryzzan/new-lopes-quickstart';


const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/ryzzan/Projects/rapida-backoffice";


// import { ANIMATION_FORM } from "../collections-frontend/example/animation/animation-form";
// import { ANIMATION_TABLE } from "../collections-frontend/example/animation/animation-table";
// import { ANIMATION } from "../collections-frontend/example/animation/animation";

// import { CHARACTER_FORM } from "../collections-frontend/example/animation/character-form";
// import { CHARACTER_TABLE } from "../collections-frontend/example/animation/character-table";
// import { CHARACTER } from "../collections-frontend/example/animation/c

import { PROJECT_FORM } from "../collections-frontend/kunlatek/rapida-backoffice/project-form";
import { PROJECT_TABLE } from "../collections-frontend/kunlatek/rapida-backoffice/project-table";
import { PROJECT } from "../collections-frontend/kunlatek/rapida-backoffice/project";

import { COMPONENT_FORM } from "../collections-frontend/kunlatek/rapida-backoffice/component-form";
import { COMPONENT_TABLE } from "../collections-frontend/kunlatek/rapida-backoffice/component-table";
import { COMPONENT } from "../collections-frontend/kunlatek/rapida-backoffice/component";

import { MODULE_FORM } from "../collections-frontend/kunlatek/rapida-backoffice/module-form";
import { MODULE_TABLE } from "../collections-frontend/kunlatek/rapida-backoffice/module-table";
import { MODULE } from "../collections-frontend/kunlatek/rapida-backoffice/module";

//////////////////////////////////////////////////////////

const array = [
  /**
   * ANIMATION
   */

  // ANIMATION_FORM,
  // ANIMATION_TABLE,
  // ANIMATION,

  // CHARACTER_FORM,
  // CHARACTER_TABLE,
  // CHARACTER,

  PROJECT_FORM,
  PROJECT_TABLE,
  PROJECT,

  COMPONENT_FORM,
  COMPONENT_TABLE,
  COMPONENT,

  MODULE_FORM, 
  MODULE_TABLE, 
  MODULE,
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
