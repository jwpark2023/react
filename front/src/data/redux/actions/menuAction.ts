import { request } from "src/utils/axios";
import { TOP_MENU, SIDE_MENU } from "../types/menuType";

const USER_URL = "/menu";

export type MenuAction = {
  type: string;
  payload: any;
};

export const getTopMenu = (param: any): MenuAction => {
  const data = request("get", USER_URL + "/topMenu", param);
  return {
    type: TOP_MENU,
    payload: data,
  };
};

export const getSideMenu = (param: any): MenuAction => {
  const data = param;
  return {
    type: SIDE_MENU,
    payload: data,
  };
};
