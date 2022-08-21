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
AUTH_DB=kunlatekAutentikigo
PORT=3000
SERVER_ROOT_URI=http://localhost:3000
CLIENT_REDIRECT_URI=http://localhost:4201
MONGO_URL=mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true
DB=kliento
NODEMAILER_USER=administrativo@kunlatek.com
NODEMAILER_PASS=yetyxhgzjzktuwef
ADMIN_USERS=rabbadesalman@gmail.com
`;

/**
 * LOPES API
 */
// const envFrontDev = `
// export const envFrontProd = {
//     baseUrl: "https://devapilogin.lpsbr.com/api/v1",
//     clientId: "3bb9f7e7-a96f-4657-8039-4755de62a233",
//     clientSecret: "b80a0043-c89d-4571-bb96-515e27a4808f",
//     production: false
// };`;

// const envFrontProd = `
// export const environment = {
//     baseUrl: "????",
//     clientId: "3bb9f7e7-a96f-4657-8039-4755de62a233",
//     clientSecret: "b80a0043-c89d-4571-bb96-515e27a4808f",
//     production: true
// };`;

// const cloneFrontendPath = "https://github.com/ryzzan/new-lopes-quickstart";

const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart-invitation-and-permission";
const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";
const projectPath = "/home/ryzzan/Projects/kliento";

/**
 * ANIMATION
 */
// import { ANIMATION_FORM } from "../collections-frontend/example/animation/animation-form";
// import { ANIMATION_TABLE } from "../collections-frontend/example/animation/animation-table";
// import { ANIMATION } from "../collections-frontend/example/animation/animation";

// import { CHARACTER_FORM } from "../collections-frontend/example/animation/character-form";
// import { CHARACTER_TABLE } from "../collections-frontend/example/animation/character-table";
// import { CHARACTER } from "../collections-frontend/example/animation/character";

/**
 * PAGO BACOKOFFICE
 */
// import { BOLETO_COMPANY_FORM } from "../collections-frontend/kunlatek/pago-backoffice/boleto-company-form";
// import { BOLETO_COMPANY_TABLE } from "../collections-frontend/kunlatek/pago-backoffice/boleto-company-table";
// import { BOLETO_COMPANY } from "../collections-frontend/kunlatek/pago-backoffice/boleto-company";

// import { BOLETO_PERSON_FORM } from "../collections-frontend/kunlatek/pago-backoffice/boleto-person-form";
// import { BOLETO_PERSON_TABLE } from "../collections-frontend/kunlatek/pago-backoffice/boleto-person-table";
// import { BOLETO_PERSON } from "../collections-frontend/kunlatek/pago-backoffice/boleto-person";
/**
 * RAPIDA BACKOFFICE
 */
// import { PROJECT_FORM } from "../collections-frontend/kunlatek/rapida-backoffice/project-form";
// import { PROJECT_TABLE } from "../collections-frontend/kunlatek/rapida-backoffice/project-table";
// import { PROJECT } from "../collections-frontend/kunlatek/rapida-backoffice/project";

// import { COMPONENT_FORM } from "../collections-frontend/kunlatek/rapida-backoffice/component-form";
// import { COMPONENT_TABLE } from "../collections-frontend/kunlatek/rapida-backoffice/component-table";
// import { COMPONENT } from "../collections-frontend/kunlatek/rapida-backoffice/component";

// import { MODULE_FORM } from "../collections-frontend/kunlatek/rapida-backoffice/module-form";
// import { MODULE_TABLE } from "../collections-frontend/kunlatek/rapida-backoffice/module-table";
// import { MODULE } from "../collections-frontend/kunlatek/rapida-backoffice/module";

/**
 * RAPIDA FUNDAMENTO
 */
// import { FORM_ELEMENT } from "../collections-frontend/kunlatek/rapida-fundamento/form-element";
// import { FORM_ELEMENT_FORM } from "../collections-frontend/kunlatek/rapida-fundamento/form-element-form";
// import { FORM_ELEMENT_TABLE } from "../collections-frontend/kunlatek/rapida-fundamento/form-element-table";

// import { DATA_TYPE } from "../collections-frontend/kunlatek/rapida-fundamento/data-type";
// import { DATA_TYPE_FORM } from "../collections-frontend/kunlatek/rapida-fundamento/data-type-form";
// import { DATA_TYPE_TABLE } from "../collections-frontend/kunlatek/rapida-fundamento/data-type-table";

// import { QUICKSTART_FRONTEND_REPOSITORY } from "../collections-frontend/kunlatek/rapida-fundamento/quickstart-frontend-repository";
// import { QUICKSTART_FRONTEND_REPOSITORY_FORM } from "../collections-frontend/kunlatek/rapida-fundamento/quickstart-frontend-repository-form";
// import { QUICKSTART_FRONTEND_REPOSITORY_TABLE } from "../collections-frontend/kunlatek/rapida-fundamento/quickstart-frontend-repository-table";

// import { QUICKSTART_BACKEND_REPOSITORY } from "../collections-frontend/kunlatek/rapida-fundamento/quickstart-backend-repository";
// import { QUICKSTART_BACKEND_REPOSITORY_FORM } from "../collections-frontend/kunlatek/rapida-fundamento/quickstart-backend-repository-form";
// import { QUICKSTART_BACKEND_REPOSITORY_TABLE } from "../collections-frontend/kunlatek/rapida-fundamento/quickstart-backend-repository-table";

// import { FRONTEND_FRAMEWORK } from "../collections-frontend/kunlatek/rapida-fundamento/frontend-framework";
// import { FRONTEND_FRAMEWORK_FORM } from "../collections-frontend/kunlatek/rapida-fundamento/frontend-framework-form";
// import { FRONTEND_FRAMEWORK_TABLE } from "../collections-frontend/kunlatek/rapida-fundamento/frontend-framework-table";

// import { BACKEND_FRAMEWORK } from "../collections-frontend/kunlatek/rapida-fundamento/backend-framework";
// import { BACKEND_FRAMEWORK_FORM } from "../collections-frontend/kunlatek/rapida-fundamento/backend-framework-form";
// import { BACKEND_FRAMEWORK_TABLE } from "../collections-frontend/kunlatek/rapida-fundamento/backend-framework-table";

/**
 * KUNLATEK-QUICKSTART-INVITATION
 */
// import { INVITATION_FORM } from "../collections-frontend/kunlatek/kunlatek-quickstart-invitation-and-permission/invitation-form";
// import { INVITATION_TABLE } from "../collections-frontend/kunlatek/kunlatek-quickstart-invitation-and-permission/invitation-table";
// import { INVITATION } from "../collections-frontend/kunlatek/kunlatek-quickstart-invitation-and-permission/invitation";

// import { PERMISSION_FORM } from "../collections-frontend/kunlatek/kunlatek-quickstart-invitation-and-permission/permission-form";
// import { PERMISSION_TABLE } from "../collections-frontend/kunlatek/kunlatek-quickstart-invitation-and-permission/permission-table";
// import { PERMISSION } from "../collections-frontend/kunlatek/kunlatek-quickstart-invitation-and-permission/permission";

// import { RELATED_USER } from "../collections-frontend/kunlatek/kunlatek-quickstart-invitation-and-permission/related-user";
// import { RELATED_USER_FORM } from "../collections-frontend/kunlatek/kunlatek-quickstart-invitation-and-permission/related-user-form";
// import { RELATED_USER_TABLE } from "../collections-frontend/kunlatek/kunlatek-quickstart-invitation-and-permission/related-user-table";

/**
 * KLIENTO FUNDAMENTO
 */
// import { CONTACT_TYPE_FORM } from "../collections-frontend/kunlatek/kliento-fundamento/contact-type-form";
// import { CONTACT_TYPE_TABLE } from "../collections-frontend/kunlatek/kliento-fundamento/contact-type-table";
// import { CONTACT_TYPE } from "../collections-frontend/kunlatek/kliento-fundamento/contact-type";

/**
 * KLIENTO
 */
import { CLIENT_PERSON_FORM } from "../collections-frontend/kunlatek/kliento/client-person-form";
import { CLIENT_PERSON_TABLE } from "../collections-frontend/kunlatek/kliento/client-person-table";
import { CLIENT_PERSON } from "../collections-frontend/kunlatek/kliento/client-person";

/**
 * DAXTV
 */
// import { DAXTV_CLIENT_COMPANY } from "../collections-frontend/clients/daxtv/client-company";
// import { DAXTV_CLIENT_COMPANY_FORM } from "../collections-frontend/clients/daxtv/client-company-form";
// import { DAXTV_CLIENT_COMPANY_TABLE } from "../collections-frontend/clients/daxtv/client-company-table";

// import { DAXTV_CLIENT_PERSON } from "../collections-frontend/clients/daxtv/client-person";
// import { DAXTV_CLIENT_PERSON_FORM } from "../collections-frontend/clients/daxtv/client-person-form";
// import { DAXTV_CLIENT_PERSON_TABLE } from "../collections-frontend/clients/daxtv/client-person-table";

// import { DAXTV_PACKAGE } from "../collections-frontend/clients/daxtv/package";
// import { DAXTV_PACKAGE_FORM } from "../collections-frontend/clients/daxtv/package-form";
// import { DAXTV_PACKAGE_TABLE } from "../collections-frontend/clients/daxtv/package-table";

/**
 * MODULO ADMIN
 */
// import { USERS_GROUP } from "../collections-frontend/lopes/modulo-admin/user-group";
// import { USERS_GROUP_FORM } from "../collections-frontend/lopes/modulo-admin/user-group-form";
// import { USERS_GROUP_TABLE } from "../collections-frontend/lopes/modulo-admin/user-group-table";

// import { MODULE } from "../collections-frontend/lopes/modulo-admin/module";
// import { MODULE_FORM } from "../collections-frontend/lopes/modulo-admin/module-form";
// import { MODULE_TABLE } from "../collections-frontend/lopes/modulo-admin/module-table";R_TABLE } from "../collections-frontend/kunlatek/kunlatek-quickstart-invitation-and-permission/related-user-table";
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

  /**
   * PAGO BACKOFFICE
   */
  // BOLETO_COMPANY_FORM,
  // BOLETO_COMPANY_TABLE,
  
  // BOLETO_PERSON_FORM,
  // BOLETO_PERSON_TABLE,

  // BOLETO_COMPANY,

  // BOLETO_PERSON,

  /**
   * RAPIDA BACKOFFICE
   */
  // PROJECT_FORM,
  // PROJECT_TABLE,
  // PROJECT,

  // COMPONENT_FORM,
  // COMPONENT_TABLE,
  // COMPONENT,

  // MODULE_FORM,
  // MODULE_TABLE,
  // MODULE,

  /**
   * RAPIDA FUNDAMENTO
   */
  // FORM_ELEMENT,
  // FORM_ELEMENT_FORM,
  // FORM_ELEMENT_TABLE,

  // DATA_TYPE,
  // DATA_TYPE_FORM,
  // DATA_TYPE_TABLE,

  // QUICKSTART_FRONTEND_REPOSITORY,
  // QUICKSTART_FRONTEND_REPOSITORY_FORM,
  // QUICKSTART_FRONTEND_REPOSITORY_TABLE,

  // QUICKSTART_BACKEND_REPOSITORY,
  // QUICKSTART_BACKEND_REPOSITORY_FORM,
  // QUICKSTART_BACKEND_REPOSITORY_TABLE,

  // FRONTEND_FRAMEWORK,
  // FRONTEND_FRAMEWORK_FORM,
  // FRONTEND_FRAMEWORK_TABLE,

  // BACKEND_FRAMEWORK,
  // BACKEND_FRAMEWORK_FORM,
  // BACKEND_FRAMEWORK_TABLE,

  /**
   * KLIENTO FUNDAMENTO
   */
  // CONTACT_TYPE_FORM,
  // CONTACT_TYPE_TABLE,

  // CONTACT_TYPE,

  /**
   * KLIENTO
   */
  CLIENT_PERSON_FORM,
  CLIENT_PERSON_TABLE,

  CLIENT_PERSON,

  /**
   * KUNLATEK-QUICKSTART-INVITATION
   */
  // INVITATION_FORM,
  // INVITATION_TABLE,
  // INVITATION,

  // PERMISSION_FORM,
  // PERMISSION_TABLE,
  // PERMISSION,

  /**
   * DAXTV
   */
  // DAXTV_CLIENT_COMPANY,
  // DAXTV_CLIENT_COMPANY_FORM,
  // DAXTV_CLIENT_COMPANY_TABLE,

  // DAXTV_CLIENT_PERSON,
  // DAXTV_CLIENT_PERSON_FORM,
  // DAXTV_CLIENT_PERSON_TABLE,

  // DAXTV_PACKAGE,
  // DAXTV_PACKAGE_FORM,
  // DAXTV_PACKAGE_TABLE,

  /**
   * MODULO ADMIN
   */
  // USERS_GROUP,
  // USERS_GROUP_FORM,
  // USERS_GROUP_TABLE,

  // MODULE,
  // MODULE_FORM,
  // MODULE_TABLE,

  // RELATED_USER,
  // RELATED_USER_FORM,
  // RELATED_USER_TABLE,
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
