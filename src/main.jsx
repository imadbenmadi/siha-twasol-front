import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Router from "./Router";
import { RouterProvider } from "react-router";
import { AppProvider } from "./AppContext";
import { Suspense } from "react";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={Router} />
            </Suspense>
        </AppProvider>
    </React.StrictMode>
);
