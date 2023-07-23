import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const hierarchyToPlat = (arr: any[], init: any[], depth: number): any[] => {
  return arr.reduce((pre: any, curr: any) => {
    pre.push({ ...curr, depth });
    if (curr.childSize > 0) {
      hierarchyToPlat(curr.children, pre, depth + 1);
    }
    return pre;
  }, init);
};

const Sidebar = () => {
  const [sideMenus, setSideMenus] = useState<any>([]);
  const menuState = useSelector((state: any) => state.menuSagaReducer.sideMenus);

  useEffect(() => {
    const platMenu = hierarchyToPlat(
      (menuState?.children) || [],
      [],
      0
    );
    setSideMenus(platMenu);
  }, [menuState]);

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link"
              style={{ backgroundColor: "darkslategrey" }}
              to="#">
              <i className="nav-icon cui-list"></i>
              {menuState?.menuNm}
              <span className="badge badge-primary">NEW</span>
            </Link>
          </li>
          {sideMenus?.map((menu: any) => drawMenu(menu))}
        </ul>
      </nav>
      <button
        className="sidebar-minimizer brand-minimizer"
        type="button"
        id="btn-minimizer"
        data-target="#mybody"
      ></button>
    </div>
  );
};

const drawMenu = (menu: any) => {
  if (menu.childSize > 0) {
    menu.children.map((m: any) => drawMenu(m.children));
  }
  const isBackgroundRed = true;
  return menu.isTitle ? (
    <li
      className="nav-item"
      style={{ backgroundColor: isBackgroundRed ? "#000000" : "" }}
      key={menu.menuId}
    >
      <div
        className={isBackgroundRed ? "nav-link dropdown-toggle" : ""}
        data-toggle="collapse"
        aria-expanded="false"
      >
        <i className="nav-icon icon-folder"></i>
        &nbsp;&nbsp;{menu.menuNm}
      </div>
    </li>
  ) : (
    <li className="nav-item" key={menu.menuId}>
      <Link className="nav-link" to={menu.baseUrl || "/"}>
        <i className="nav-icon cui-check"></i>
        &nbsp;&nbsp;{menu.menuNm}
      </Link>
    </li>
  );
};

export default Sidebar;
