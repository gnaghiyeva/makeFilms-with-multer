import AddFilm from "../pages/AddFilm";
import Detail from "../pages/Detail";
import EditFilm from "../pages/EditFilm";
import Home from "../pages/Home";
import MainRoot from "../pages/MainRoot";
import Videos from "../pages/Videos";

export const ROUTES = [
    {
        path:'/',
        element:<MainRoot/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/add-film',
                element:<AddFilm/>
            },
            {
                path:'/:id',
                element:<Detail/>
            },
            {
                path:'/edit/:id',
                element:<EditFilm/>
            },
            {
                path:'/videos',
                element:<Videos/>
            }
        ]
    }

]