import React from "react";
/**
 * Login
 *
 * @var [type]
 */
const Login = React.lazy(() => import("../pages/Login"));
const SignUp = React.lazy(() => import("../pages/SignupRequest"));
const ClientHome = React.lazy(() => import("../pages/client/ClientHome"));
const ClientAssessment = React.lazy(() => import("../pages/client/ClientAssessments"));
const ClientFramework = React.lazy(() => import("../pages/client/ClientFrameworks"));
const ClientReports = React.lazy(() => import("../pages/client/ClientReports"));
const ClientSettings = React.lazy(() => import("../pages/client/ClientSettings"));
const ClientDocuments = React.lazy(() => import("../pages/client/ClientDocuments"));

const routes = [
    {
        path: "/login",
        element: <Login />,
        layout: false,
        auth: false,
    },
    {
        path: "/signup",
        element: <SignUp />,
        layout: false,
        auth: false,
    },
    {
        path: "/",
        element: <ClientHome />,
        layout: true,
        auth: true,
        title: "Dashboard"
    },
    {
        path: "/assessments",
        element: <ClientAssessment />,
        layout: true,
        auth: true,
        title: "Assessments"
    },
    {
        path: "/frameworks",
        element: <ClientFramework />,
        layout: true,
        auth: true,
        title: "Frameworks"
    },
    {
        path: "/documents",
        element: < ClientDocuments/>,
        layout: true,
        auth: true,
        title: "Documents & Evidence"
    },
    {
        path: "/reports",
        element: <ClientReports />,
        layout: true,
        auth: true,
        title: "Reports"
    },
    {
        path: "/user-management",
        element: <ClientSettings />,
        layout: true,
        auth: true,
        title: "Users"
    },
    {
        path: "/settings",
        element: <ClientHome />,
        layout: true,
        auth: true,
        title: "Setting"
    }
];

export default routes;