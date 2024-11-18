import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './Pages/Welcome/Welcome.jsx'
import Auth from './Pages/Auth/Auth.jsx'
import { Provider } from 'react-redux'
import store from './store/config/store.js'
import Chat from './Pages/Chat/Chat.jsx'


const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      { path: "/", element: <Welcome /> },
      { path: "/chat", element: <Chat /> },
      { path: "/auth", element: <Auth /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
