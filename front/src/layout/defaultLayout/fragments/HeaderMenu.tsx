import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import menu from "../../../data/menu.json";
import { getSideMenu } from "src/data/redux/actions/menuAction";

const HeaderMenu = () => {
  const [menus, setMenus] = useState<any>([]);

  const dispatch: any = useDispatch();
  const selectTopMenu = (menu: any) => {
    console.log("menu>>", menu);
    dispatch(getSideMenu(menu));
  };

  useEffect(() => {
    console.log(menu.dataSet[0].children);
    setMenus(menu.dataSet[0].children);
  }, [menu]);

  return (
    <nav className="navbar row h-50">
      <button
        id="lg-menu"
        className="navbar-toggler sidebar-toggler d-lg-none mr-auto"
        type="button"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <button
        id="md-menu"
        className="navbar-toggler sidebar-toggler d-md-down-none"
        type="button"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="navbar-nav mr-auto">
        {menus &&
          menus.map((menu: any) => (
            <li className="nav-item d-md-down-none px-3" key={menu.menuId}>
              <Link
                className="nav-link"
                to={menu.baseUrl}
                onClick={() => selectTopMenu(menu)}
              >
                {menu.menuNm}
              </Link>
            </li>
          ))}
        <li className="nav-item dropdown d-lg-none">
          <Link
            className="nav-link dropdown-toggle"
            to="/"
            id="navbardrop"
            data-toggle="dropdown"
          >
            Nav Bar
          </Link>
          <div className="dropdown-menu">
            {menus &&
              menus.map((menu: any) => (
                <Link
                  className="dropdown-item"
                  to={menu.baseUrl}
                  onClick={() => selectTopMenu(menu)}
                >
                  {menu.menuNm}
                </Link>
              ))}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderMenu;
