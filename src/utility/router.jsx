import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { baseUrl } from "../../config";

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

function Baseinjector({ base }) {
    useEffect(() => {
        let baseElement = document.querySelector("base");
        if (!baseElement) {
            baseElement = document.createElement("base");
            document.head.appendChild(baseElement);
        }
        baseElement.setAttribute("href", base);
    }, [base]);
    return null;
}

const AppRouter = () => (
    <>
        <Baseinjector base={baseUrl} />
        <RouterProvider router={router} />
    </>
);

export default AppRouter;