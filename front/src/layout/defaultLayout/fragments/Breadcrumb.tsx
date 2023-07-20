import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <ol className="breadcrumb">
      <li className="breadcrumb-item">Home</li>
      <li className="breadcrumb-item">1Depth</li>
      <li className="breadcrumb-item active">2Depth</li>
      <li className="breadcrumb-menu d-md-down-none">
        <div className="btn-group" role="group" aria-label="Button group">
          <a className="btn" href="/dashboard">
            {" "}
            <i className="icon-graph"></i> Dashboard
          </a>
          <a className="btn" href="/">
            <i className="cui-calendar"></i> 일정
          </a>
        </div>
      </li>
    </ol>
  );
};

export default Breadcrumb;
