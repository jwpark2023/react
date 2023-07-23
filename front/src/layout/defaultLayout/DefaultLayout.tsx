import React, { Suspense, useCallback } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Aside, Breadcrumb, HeaderMenu, HeaderTop, SideBar } from "./fragments";

const Dashboard = React.lazy(() => import("src/pages/Dashboard"));
const Page111 = React.lazy(() => import("src/pages/Page111"));
const Page121 = React.lazy(() => import("src/pages/Page121"));

const routes = [
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/page111", name: "page111", component: Page111 },
  { path: "/page121", name: "page121", component: Page121 },
];

const DefaultLayout = (props: any) => {
  const loading = useCallback(
    () => <div className="animated fadeIn pt-1 text-center">Loading....</div>,
    []
  );

  return (
    <>
      <header
        className="app-header text-white m-0 p-0 w-100"
        style={styles.header}
      >
        <HeaderTop {...props} />
        <HeaderMenu />
      </header>
      <div className="app-body">
        <SideBar />
        <main className="main">
          <Breadcrumb />
          <Container fluid>
            <Suspense fallback={loading()}>
              <Routes>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.component {...props} />}
                    />
                  ) : null;
                })}
              </Routes>              
            </Suspense>
          </Container>
        </main>
        <Aside />
      </div>
      <footer className="app-footer" style={styles.footer}>
        footer
      </footer>
    </>
  );
};

export default DefaultLayout;

const styles = {
  header: {
    backgroundColor: "#4b4b4b",
  },
  footer: {
    height: "50px",
    flex: "0 0 50px",
  },
};
