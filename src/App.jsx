import HomePage from "./Component/HomePage/HomePage";
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Layout from "./Component/Layout/Layout";
import Results from "./Component/Results/Results";


let route=createBrowserRouter([{
  path:'',
  element:<Layout />,
  children:[
    {
     index:true,
      element:<HomePage />
    },
    {
      path:'results',
      element:<Results />
    }
  ]
}])

function App() {


  return (<>
  <RouterProvider router={route}></RouterProvider>
  
  </>);
}

export default App;