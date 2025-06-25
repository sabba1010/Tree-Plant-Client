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



// Import your PrivateRoute component
import PrivateRoute from "../components/PrivateRoute";  // adjust the path if needed
import SignIn from "../components/SignIn";
import SignUp from "../components/Register";




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
        path: "add-plant",
        element: (
          <PrivateRoute>
            <AddPlants />
          </PrivateRoute>
        ),
      },
     
      {
        path: 'all-plants',
        loader: () => fetch('https://tree-plant-server.vercel.app/plants'),
        Component: AllPlants,
      },
      {
        path: 'plants/:id',
        loader: ({ params }) => fetch(`https://tree-plant-server.vercel.app/plants/${params.id}`),
        // Use `element` instead of `Component` when wrapping with PrivateRoute
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
  path: 'updatePlants/:id',  // :id must be added for param
  loader: ({ params }) => fetch(`https://tree-plant-server.vercel.app/plants/${params.id}`).then(res => res.json()),
  Component: UpdatePlants,
}
,
      

     {
  path: 'my-plants',
  element: (
    <PrivateRoute>
      <MyPlants />
    </PrivateRoute>
  ),
},

      {
        path: 'login',
        Component: SignIn,
      },
      {
        path: 'register',
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
