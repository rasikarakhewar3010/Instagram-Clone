import Login from './components/Login';
import Signup from './components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import ChatPage from './components/ChatPage';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/chatSlice';
import { setLikeNotification } from './redux/rtnSlice';
import ProtectedRoutes from './components/ProtectedRoute';

// Singleton pattern for socket
let socket;

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutes>  <MainLayout /> </ProtectedRoutes>,
    children: [
      { path: '/', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: '/profile/:id', element: <ProtectedRoutes><Profile /></ProtectedRoutes> },
      { path: '/account/edit', element: <ProtectedRoutes><EditProfile /></ProtectedRoutes> },
      { path: '/chat', element: <ProtectedRoutes> <ChatPage /> </ProtectedRoutes> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

function App() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // Initialize socket only if not already initialized
      if (!socket) {
        socket = io('http://localhost:8000', {
          query: { userId: user._id },
          transports: ['websocket'], // Ensure WebSocket is used directly
        });

        // Save socket instance in Redux (optional)
        dispatch(setSocket(socket));

        // Log connection
        socket.on('connect', () => {
          console.log('Socket connected:', socket.id);
        });

        // Handle incoming events
        socket.on('getOnlineUsers', (onlineUsers) => {
          dispatch(setOnlineUsers(onlineUsers));
        });

        socket.on('notification', (notification) => {
          dispatch(setLikeNotification(notification))
        });

        // Handle disconnection
        socket.on('disconnect', () => {
          console.log('Socket disconnected');
        });
      }

      // Cleanup on component unmount
      return () => {
        if (socket) {
          socket.disconnect();
          socket = null; // Clear socket instance
        }
      };
    }
  }, [user, dispatch]);

  return <RouterProvider router={browserRouter} />;
}

export default App;
