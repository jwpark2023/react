import type { MenuProps } from "antd";
import { Menu } from "antd";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import menu from "src/data/menu.json";

const HeaderTop = () => {
  const logout = () => {};

  const [current, setCurrent] = useState("mail");

  const [menus, setMenus] = useState<MenuProps["items"]>([]);

  const dispatch: any = useDispatch();

  useEffect(() => {
    console.log("HeaderTop useEffect: ", menu.dataSet[0].children);
    const menuItem: MenuProps["items"] = [];

    menu.dataSet[0].children?.forEach((menu: any, idx: number) =>
      menuItem.push({
        label: (
          <Link className="nav-link" to={menu.baseUrl}>
            {menu.menuNm}
          </Link>
        ),
        key: menu.menuId,
        children: menu.children?.map((subMenu: any) => ({
          label: (
            <Link className="nav-link" to={subMenu.baseUrl}>
              {subMenu.menuNm}
            </Link>
          ),
          key: subMenu.menuId,
        })),
      })
    );

    menuItem.push({ type: "divider" });

    setMenus(menuItem);
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="row w-100 h-50" style={styles.header}>
      <a href="/">
        <img
          src="images/logo.svg"
          className="navbar-brand-full"
          height="50"
          alt="logo"
        />
      </a>
      <Menu
        onClick={onClick}
        className="row w-80 h-50"
        style={styles.header}
        selectedKeys={[current]}
        mode="horizontal"
        items={menus}
      />
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item d-md-down-none">
          <div className="nav-link" style={{ cursor: "pointer" }}>
            <i className="icon-bell"></i>
            <span id="alarmCnt" className="badge badge-pill badge-danger">
              1511
            </span>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="/" role="button">
            <img className="img-avatar" src="images/avatars/3.png" alt="" />
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-header text-center">
              <strong>Account</strong>
            </div>

            <a className="dropdown-item" href="/">
              <i className="fa fa-bell-o"></i> Updates
              <span className="badge badge-info">42</span>
            </a>
            <a className="dropdown-item" href="/">
              <i className="fa fa-envelope-o"></i> Messages
              <span className="badge badge-success">42</span>
            </a>
            <a className="dropdown-item" href="/">
              <i className="fa fa-tasks"></i> Tasks
              <span className="badge badge-danger">42</span>
            </a>
            <a className="dropdown-item" href="/">
              <i className="fa fa-comments"></i> Comments
              <span className="badge badge-warning">42</span>
            </a>
            <div className="dropdown-header text-center">
              <strong>Settings</strong>
            </div>
            <a className="dropdown-item" href="/">
              <i className="fa fa-user"></i> Profile
            </a>
            <a className="dropdown-item" href="/">
              <i className="fa fa-wrench"></i> Settings
            </a>
            <a className="dropdown-item" href="/">
              <i className="fa fa-usd"></i> Payments
              <span className="badge badge-secondary">42</span>
            </a>
            <a className="dropdown-item" href="/">
              <i className="fa fa-file"></i> Projects
              <span className="badge badge-primary">42</span>
            </a>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={logout}>
              <i className="fa fa-shield"></i> Logout{" "}
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HeaderTop;

const styles = {
  header: {
    backgroundColor: "#000",
  },
};
