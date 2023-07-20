import { MenuAction } from "data/redux/actions/menuAction";
import { TOP_MENU, SIDE_MENU } from "src/data/redux/types/menuType";

export type MenuState = {
  topMenus: [];
};

const initMenuState: MenuState = {
  topMenus: [],
};

const menuSagaReducer = (
  state = { menuState: initMenuState },
  action: MenuAction
) => {
  let topMenus: MenuState = { ...initMenuState };

  console.log("menuSagaReducer", action);

  switch (action.type) {
    case TOP_MENU:
      if (action.payload.code === "S0000001") {
        topMenus = action.payload.dataSet[0];
      }
      return { ...state, topMenus };

    case SIDE_MENU:
      return { ...state, sideMenus: action.payload };
  }

  return state;
};

export default menuSagaReducer;
