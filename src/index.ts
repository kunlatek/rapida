import { setBackend } from "./backend/main";
import { setFrontend } from "./frontend/main";
import { MainInterface } from "./interfaces/main";

const createProject = (
  array: Array<MainInterface>
) => {  
  setFrontend(array);
  setBackend(array);
};

export {
  createProject
};