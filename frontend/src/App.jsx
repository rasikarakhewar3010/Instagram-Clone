import Login from './components/Login'
import Signup from './components/Signup'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'

const browserRouter =  createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/profile/:id',
        element:<Profile/>
      },
      {
        path:'/account/edit',
        element:<EditProfile/>
      },
      {
        path:'/chat',
        element:<ChatPage/>
      },
    ]
  },
  {
    path:'/login',
    element:< Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
])

function App() {
  return (
    <RouterProvider router={browserRouter} />
  );
}

export default App;

