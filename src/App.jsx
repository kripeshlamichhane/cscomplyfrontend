import React, { Suspense, useState } from 'react';
import ClientDashboard from './pages/ClientDashboard';
import LoginPage from './pages/Login';
import SignupRequestPage from './pages/SignupRequest';
import routes from './routes/route';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (email, password) => {
    // Mock authentication - accept any email/password
    console.log('Login attempt:', { email, password });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowSignup(false);
  };

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  const handleBackToLogin = () => {
    setShowSignup(false);
  };

  // Show signup page
  if (showSignup) {
    return <SignupRequestPage onBackToLogin={handleBackToLogin} />;
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} onShowSignup={handleShowSignup} />;
  }

  // Show main application if authenticated
  return (
    <Router>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          {routes.map((route, idx) => {
            if (route.children) {
              if (route.layout === true) {
                return (
                  <Route key="ClientDashboard" element={<ClientDashboard onLogout={handleLogout} title={route.title}/>}>
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
                <Route key={idx} element={<ClientDashboard onLogout={handleLogout} title={route.title}/>}>
                  <Route path={route.path} element={route.element} />
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
  );
}

export default App;