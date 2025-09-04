import React, { useState, Suspense } from 'react';
import ClientDashboard from './pages/ClientDashboard';
import routes from './routes/route';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import * as d from 'dotenv';


function App() {
  return (
    <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, idx) => {
          if (route.children) {
            if (route.layout === true) {
              return (
                <Route key="ClientDashboard" element={<ClientDashboard title={route.title}/>}>
                  <Route key={idx} path={route.path} element={route.element}>
                    {route.children.map((child, cIdx) =>
                      child.index ? (
                        <Route key={cIdx} index element={child.element} />
                      ) : (
                        <Route
                          key={cIdx}
                          path={child.path}
                          element={child.element}
                        />
                      )
                    )}
                  </Route>
                </Route>
              );
            }
            return (
              <Route key={idx} path={route.path} element={route.element}>
                {route.children.map((child, cIdx) =>
                  child.index ? (
                    <Route key={cIdx} index element={child.element} />
                  ) : (
                    <Route
                      key={cIdx}
                      path={child.path}
                      element={child.element}
                    />
                  )
                )}
              </Route>
            );
          }
          if (route.layout === true) {
            return (
              <Route element={<ClientDashboard title={route.title}/>}>
                <Route key={idx} path={route.path} element={route.element} />
              </Route>
            );  
          }
          return (
            <Route key={idx} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </Suspense>
    </Router>
  )
}

export default App;