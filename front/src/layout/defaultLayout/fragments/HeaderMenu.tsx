import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import menu from "src/data/menu.json";
import { getSideMenu } from "src/data/redux/actions/menuAction";
import { Menu } from 'antd';

const HeaderMenu = () => {
  const [menus, setMenus] = useState<any>([]);

  const dispatch: any = useDispatch();

  const selectTopMenu = (menu: any) => {
    console.log("menu>>", menu);
    dispatch(getSideMenu(menu));
  };

  // useEffect(() => {
  //   console.log(menu.dataSet[0].children);
  //   setMenus(menu.dataSet[0].children);
  // }, []);

  const [current, setCurrent] = useState('');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    // <nav className="navbar row h-50">
    //   <button
    //     id="lg-menu"
    //     className="navbar-toggler sidebar-toggler d-lg-none mr-auto"
    //     type="button"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <button
    //     id="md-menu"
    //     className="navbar-toggler sidebar-toggler d-md-down-none"
    //     type="button"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <ul className="navbar-nav mr-auto">
    //     {menus?.map((menu: any) => (
    //       <li className="nav-item d-md-down-none px-3" key={menu.menuId}>
    //         <Link
    //           className="nav-link"
    //           to={menu.baseUrl}
    //           onClick={() => selectTopMenu(menu)}
    //         >
    //           {menu.menuNm}
    //         </Link>
    //       </li>
    //     ))}
    //     <li className="nav-item dropdown d-lg-none">
    //       <Link
    //         className="nav-link dropdown-toggle"
    //         to="/"
    //         id="navbardrop"
    //         data-toggle="dropdown"
    //       >
    //         Nav Bar
    //       </Link>
    //       <div className="dropdown-menu">
    //         {menus?.map((menu: any, idx: number) => (
    //           <Link key={menu.menuId}
    //             className="dropdown-item"
    //             to={menu.baseUrl}
    //             onClick={() => selectTopMenu(menu)}
    //           >
    //             {menu.menuNm}
    //           </Link>
    //         ))}
    //       </div>
    //     </li>
    //   </ul>
    // </nav>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menu} theme="dark" style={{ justifyContent:'center'}} />
  );
};

export default HeaderMenu;
