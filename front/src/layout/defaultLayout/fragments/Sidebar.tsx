import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [sideMenus, setSideMenus] = useState<any>([]);
  const menuState = {
    menuNm: "empty",
  };

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <i className="nav-icon cui-list"></i>
              {menuState?.menuNm}
              <span className="badge badge-primary">NEW</span>
            </Link>
          </li>
          {sideMenus?.map((menu: any) => drawMenu(menu))}
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="nav-icon cui-check"></i>
              &nbsp;&nbsp;dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/page111">
              <i className="nav-icon cui-check"></i>
              &nbsp;&nbsp;page111
            </Link>
          </li>

          <li className="nav-item" style={{ backgroundColor: "#000000" }}>
            <div
              className="nav-link dropdown-toggle"
              data-toggle="collapse"
              aria-expanded="false"
            >
              <i className="nav-icon icon-folder"></i>
              &nbsp;&nbsp;Sub01
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/page121">
              <i className="nav-icon cui-check"></i>
              &nbsp;&nbsp;page121
            </Link>
          </li>
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
