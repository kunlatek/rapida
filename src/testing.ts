import { BackendFrameworkEnum, FrontendFrameworkEnum } from "./enums/main";
import { createProject } from "./index";

const envFrontDev = `
export const environment = {
baseUrl: "http://localhost:3000",
cookieDomain: "localhost",
production: false,
};
`;

const envFrontProd = `
export const environment = {
baseUrl: "http://localhost:3000",
cookieDomain: "localhost",
production: true,
};
`;

const cloneFrontendPath = "https://github.com/alexisbarros/rapida-quickstart-client.git";
const cloneBackendPath = "https://github.com/alexisbarros/rapida-quickstart-api.git";
const projectPath = "/Users/alexisbarros/Documents/projects/kunlatek/Demo/animation";

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
  object.backendFramework = BackendFrameworkEnum.Loopback;
  object.frontendFramework = FrontendFrameworkEnum.Angular;
  object.projectPath = projectPath;
  object.cloneFrontendPath = cloneFrontendPath;
  object.cloneBackendPath = cloneBackendPath;
  object.envFrontendDev = envFrontDev;
  object.envFrontendProd = envFrontProd;
  object.envBackend = ``;
});

createProject(array);