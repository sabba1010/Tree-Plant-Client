import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../components/Home";
import AddPlants from "../components/AddPlants";
import UpdatePlants from "../components/UpdatePlants";
import AllPlants from "../components/AllPlants";
import PlantDetails from "../components/PlantDetails";
import NotFound from "../components/NotFound";
import BegainerFriendly from "../components/BegainerFriendly";
import MyPlants from "../components/MyPlants";
import PrivateRoute from "../components/PrivateRoute";
import SignIn from "../components/SignIn";
import SignUp from "../components/Register";

import Dashbord from "../components/Dashbord";
import Profile from "../components/Profile";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import Support from "../components/Support";
import DashboardOverview from "../components/DashboardOverview";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: AboutUs,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "support",
        Component: Support,
      },
      {
        path: "add-plant",
        element: (
          <PrivateRoute>
            <AddPlants />
          </PrivateRoute>
        ),
      },
      {
        path: "all-plants",
        loader: () => fetch("https://tree-plant-server.vercel.app/plants"),
        Component: AllPlants,
      },
      {
        path: "plants/:id",
        loader: ({ params }) =>
          fetch(`https://tree-plant-server.vercel.app/plants/${params.id}`),
        element: (
          <PrivateRoute>
            <PlantDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "Seasonal-Plant-Care-Tips",
        Component: BegainerFriendly,
      },
      {
        path: "updatePlants/:id",
        loader: ({ params }) =>
          fetch(`https://tree-plant-server.vercel.app/plants/${params.id}`).then(
            (res) => res.json()
          ),
        Component: UpdatePlants,
      },
      {
        path: "my-plants",
        element: (
          <PrivateRoute>
            <MyPlants />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashbord />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardOverview />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "add-plant",
            element: <AddPlants />,
          },
          {
            path: "all-plants",
            loader: () => fetch("https://tree-plant-server.vercel.app/plants"),
            element: <AllPlants />,
          },
          {
            path: "my-plants",
            element: <MyPlants />,
          },
          {
            path: "Seasonal-Plant-Care-Tips",
            element: <BegainerFriendly />,
          },
        ],
      },
      {
        path: "login",
        Component: SignIn,
      },
      {
        path: "register",
        Component: SignUp,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
