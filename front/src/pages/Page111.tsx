const Page111 = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <i className="icon-list"></i> test
              <div className="card-header-actions p-0"></div>
            </div>
            <div className="card-body">{JSON.stringify(process.env)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page111;
