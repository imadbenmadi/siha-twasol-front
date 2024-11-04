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

import Worker_Profile from "./Components/Profiles/Worker/Profile/Profile.jsx";
import Malad_Profile from "./Components/Profiles/Malad/Profile/Profile.jsx";

// import Malad from "./Components/Profiles/Director/Director.jsx";
import Director_default from "./Components/Profiles/Director/Director_Default.jsx";
import Malad_default from "./Components/Profiles/Malad/Malad_Default.jsx";
import Medecin_default from "./Components/Profiles/Medecin/Medecin_Default.jsx";
import Worker_default from "./Components/Profiles/Worker/Worker_Default.jsx";

import Director_workers from "./Components/Profiles/Director/Workers/Director_workers.jsx";
import Director_worker from "./Components/Profiles/Director/Workers/Wroker.jsx";
import Director_Add_Worker from "./Components/Profiles/Director/Workers/Director_Add_workers.jsx";
import Director_Edit_Worker from "./Components/Profiles/Director/Workers/Director_Edit_workers.jsx";

import Director_Services from "./Components/Profiles/Director/Services/Director_Services.jsx";
import Director_Services_add from "./Components/Profiles/Director/Services/Director_Add_service.jsx";
import Director_Services_edit from "./Components/Profiles/Director/Services/Edit_Service.jsx";

import Director_Medecins from "./Components/Profiles/Director/Doctores/Director_Midcens.jsx";
import Director_Medecins_add from "./Components/Profiles/Director/Doctores/Add_doctore.jsx";
import Director_doctore from "./Components/Profiles/Director/Doctores/Doctore.jsx";
import Director_Edit_doctore from "./Components/Profiles/Director/Doctores/Edit_doctore.jsx";

import Director_Blogs from "./Components/Profiles/Director/Blogs/Director_Blogs.jsx";
import Director_Blog from "./Components/Profiles/Director/Blogs/Blog.jsx";
import Director_Add_Blogs from "./Components/Profiles/Director/Blogs/Director_Add_Blogs.jsx";
import Director_Edit_Blogs from "./Components/Profiles/Director/Blogs/Director_Edit_Blogs.jsx";

import Director_Events from "./Components/Profiles/Director/Events/Director_Events.jsx";
import Director_Event from "./Components/Profiles/Director/Events/Event.jsx";
import Director_Add_Events from "./Components/Profiles/Director/Events/Director_Add_Event.jsx";
import Director_Edit_Events from "./Components/Profiles/Director/Events/Director_Edit_Events.jsx";
// ______________________________________________________

import Worker_blog from "./Components/Profiles/Worker/Blogs/Blog.jsx";
import Worker_Blogs from "./Components/Profiles/Worker/Blogs/Worker_Blogs.jsx";
import Worker_Add_Blogs from "./Components/Profiles/Worker/Blogs/Worker_Add_Blogs.jsx";
import Worker_Edit_Blogs from "./Components/Profiles/Worker/Blogs/Worker_Edit_Blogs.jsx";

import Worker_event from "./Components/Profiles/Worker/Events/Event.jsx";
import Worker_Events from "./Components/Profiles/Worker/Events/Worker_Events.jsx";
import Worker_Add_Events from "./Components/Profiles/Worker/Events/Worker_Add_Event.jsx";
import Worker_Edit_Events from "./Components/Profiles/Worker/Events/Worker_Edit_Events.jsx";
// ______________________________________________________
import Malad_Edit_Profile from "./Components/Profiles/Malad/Profile/Edit_Profile.jsx";
import Malad_Companies from "./Components/Profiles/Malad/Companies/Companies.jsx";
import Malad_Companiy from "./Components/Profiles/Malad/Companies/Company.jsx";
import Malad_Companiy_doctors from "./Components/Profiles/Malad/Companies/Company_Components/DoctorsSection.jsx";
import Malad_Companiy_blogs from "./Components/Profiles/Malad/Companies/Company_Components/BlogsSection.jsx";
import Malad_Companiy_events from "./Components/Profiles/Malad/Companies/Company_Components/EventsSection.jsx";
import Malad_Companiy_informations from "./Components/Profiles/Malad/Companies/Company_Components/info.jsx";
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
                children: [
                    {
                        index: true,
                        element: <Malad_default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Malad/Profile",
                        element: <Malad_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Malad/Profile/Edit",
                        element: <Malad_Edit_Profile />,
                    },
                    {
                        path: "/Malad/Companies",
                        element: <Malad_Companies />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Malad/Companies/:id",
                        element: <Malad_Companiy />,
                        errorElement: <ErrorElement />,
                        children: [
                            {
                                path: "/Malad/Companies/:id/Events",
                                element: <Malad_Companiy_events />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Malad/Companies/:id/Blogs",
                                element: <Malad_Companiy_blogs />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Malad/Companies/:id/Doctors",
                                element: <Malad_Companiy_doctors />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Malad/Companies/:id/Info",
                                element: <Malad_Companiy_informations />,
                                errorElement: <ErrorElement />,
                            },
                        ],
                    },

                    {
                        path: "*",
                        element: <Not_Finished />,
                    },
                ],
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
                        element: <Director_workers />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers/Add",
                        element: <Director_Add_Worker />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers/:id",
                        element: <Director_worker />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers/:id/Edit",
                        element: <Director_Edit_Worker />,
                        errorElement: <ErrorElement />,
                    },
                    // ______________________________________________________
                    {
                        path: "/Director/Doctores",
                        element: <Director_Medecins />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Doctores/Add",
                        element: <Director_Medecins_add />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Doctores/:id",
                        element: <Director_doctore />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Doctores/:id/Edit",
                        element: <Director_Edit_doctore />,
                        errorElement: <ErrorElement />,
                    },
                    // ______________________________________________________
                    {
                        path: "/Director/Blogs",
                        element: <Director_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Blogs/Add",
                        element: <Director_Add_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Blogs/:id",
                        element: <Director_Blog />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Blogs/:id/Edit",
                        element: <Director_Edit_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    // ______________________________________________________
                    {
                        path: "/Director/Events",
                        element: <Director_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Events/Add",
                        element: <Director_Add_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Events/:id",
                        element: <Director_Event />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Events/:id/Edit",
                        element: <Director_Edit_Events />,
                        errorElement: <ErrorElement />,
                    },
                    // ______________________________________________________
                    {
                        path: "/Director/Services",
                        element: <Director_Services />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Services/Add",
                        element: <Director_Services_add />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Services/:id/Edit",
                        element: <Director_Services_edit />,
                        errorElement: <ErrorElement />,
                    },
                ],
            },
            {
                path: "/Worker",
                element: <Worker />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Worker_default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Profile",
                        element: <Worker_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Blogs",
                        element: <Worker_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Blogs/Add",
                        element: <Worker_Add_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Blogs/:id",
                        element: <Worker_blog />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Blogs/:id/Edit",
                        element: <Worker_Edit_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Events",
                        element: <Worker_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Events/Add",
                        element: <Worker_Add_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Events/:id",
                        element: <Worker_event />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Events/:id/Edit",
                        element: <Worker_Edit_Events />,
                        errorElement: <ErrorElement />,
                    },
                ],
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
