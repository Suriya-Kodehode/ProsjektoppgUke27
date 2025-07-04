import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { baseUrl } from "../../config";
import { DocumentInjector } from "./injector";
import { DarkModeProvider } from "./darkmode";

import App from "../App.jsx";
import NotFound from "@/pages/notfound.jsx";
import Home from "@/pages/home.jsx";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            errorElement: <NotFound des="/home"/>,
            children: [
                {
                    index: true,
                    element: <Navigate to="home" replace />
                },
                {
                    path: "home",
                    element: <Home />
                }
            ]
        },
        {
            path: "*",
            element: <NotFound des="/home"/>
        }
    ],
    {
        basename: baseUrl
    }
);

const AppRouter = () => (
    <DarkModeProvider>
        <DocumentInjector base={baseUrl} />
        <RouterProvider router={router} />
    </DarkModeProvider>
);

export default AppRouter;