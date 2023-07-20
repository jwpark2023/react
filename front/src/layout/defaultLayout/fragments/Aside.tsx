import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <aside className="aside-menu">
      우측 메뉴
    </aside>
  );
};

export default Aside;

const styles = {
  meetingsTyp1: {
    borderLeft: "4px solid #ffa94d",
  },
  meetingsTyp2: {
    borderLeft: "4px solid #74c0fc",
  },
  meetingsTyp3: {
    borderLeft: "4px solid #74c0fc",
  },
};
