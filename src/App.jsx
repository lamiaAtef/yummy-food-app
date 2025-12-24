import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import AuthLayout from './SharedComponents/components/AuthLayout/AuthLayout'
import Login from './AuthModule/components/Login/Login'
import Register from './AuthModule/components/Register/Register'
import ChangePass from './AuthModule/components/ChangePass/ChangePass'
import ForgetPass from './AuthModule/components/ForgetPass/ForgetPass'
import ResetPass from './AuthModule/components/ResetPass/ResetPass'
import VerifyAccount from './AuthModule/components/VerifyAccount/VerifyAccount'
import NotFound from "./SharedComponents/components/NotFound/NotFound"
import MasterLayout from "./SharedComponents/components/MasterLayout/MasterLayout"
import Dashboard from "./DashboradModule/Dashboard/Dashboard"
import RecipeData from "./RecipeModule/components/RecipeData/RecipeData"
import RecipesList from './RecipeModule/components/RecipesList/RecipesList'
import CategoryData from "./CategoryModule/components/CategoryData/CategoryData"
import CategoryList from "./CategoryModule/components/CategoriesList/CategoriesList"
import UsersList from "./UserModule/components/UsersList/UsersList"

import ProtectedRoute from './SharedComponents/components/ProtectedRoute/ProtectedRoute'

import AuthContextProvider from './context/AuthContext'
import RecipesContextProvider from './context/RecipesContext'
import CategoryContextProvider from './context/CategoryContext'
import UsersContextProvider from './context/UsersContext'
import { SidebarProvider } from './context/SidebarContext'

function App() {

  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "change-pass", element: <ChangePass /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ]
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-date/:id?", element: <RecipeData /> },
        { path: "categories", element: <CategoryList /> },
        { path: "category-data", element: <CategoryData /> },
        { path: "users", element: <UsersList /> },
      ]
    }
  ])

  return (
    <>
      <ToastContainer />

      <AuthContextProvider>
        <RecipesContextProvider>
          <CategoryContextProvider>
            <UsersContextProvider>
              <SidebarProvider>

                <RouterProvider router={routes} />

              </SidebarProvider>
            </UsersContextProvider>
          </CategoryContextProvider>
        </RecipesContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
