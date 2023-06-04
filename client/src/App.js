import './App.css';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { ROUTES } from './routes/routes';
import { FilmContextProvider } from './context/FilmContext';

const routes = createBrowserRouter(ROUTES)
function App() {
  return (
   <>
   <FilmContextProvider>
   <RouterProvider router={routes}>

   </RouterProvider>
   </FilmContextProvider>
   </>
  );
}

export default App;
