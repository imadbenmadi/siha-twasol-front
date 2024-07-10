import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import App from "./App";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import Default from "./Default";

import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";

import Malad from "./Components/Profiles/Malad/Malad.jsx";
import Medecin from "./Components/Profiles/Medecin/Medecin.jsx";
import Director from "./Components/Profiles/Director/Director.jsx";
import Worker from "./Components/Profiles/Worker/Worker.jsx";

// import Malad from "./Components/Profiles/Director/Director.jsx";
import Director_default from "./Components/Profiles/Director/Director_Default.jsx";

// import Medecin from "./Components/Profiles/Director/Director.jsx";
// import Worker from "./Components/Profiles/Director/Director.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorElement />,
        children: [
            {
                index: true,
                element: <Default />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Home",
                element: <Home />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Malad",
                element: <Malad />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Medecin",
                element: <Medecin />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Director",
                element: <Director />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Director_default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers",
                        element: <Worker />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers",
                        element: <Worker />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers",
                        element: <Worker />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers",
                        element: <Worker />,
                        errorElement: <ErrorElement />,
                    },
                ],
            },
            {
                path: "/Worker",
                element: <Worker />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Login",
                element: <Login />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Register",
                element: <Register />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Register",
                element: <Login />,
                errorElement: <ErrorElement />,
            },

            {
                path: "*",
                element: <Not_Found />,
            },
        ],
    },
]);

export default routes;
