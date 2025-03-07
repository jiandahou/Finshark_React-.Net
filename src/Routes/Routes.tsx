import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import DesignGuide from "../Pages/DesginGuide/DesginGuide";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashflowStatement from "../Components/CashflowStatement/CashflowStatement";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
export const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",element:<HomePage></HomePage>
            }
            ,  
            { path: "login", element: <LoginPage/> },
            { path: "register", element: <RegisterPage /> },
            {
                path: "search",
                element: (
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                ),
              },
            { path: "design-guide", element: <DesignGuide /> },

            {path:"company/:ticker",        element: (
                <ProtectedRoute>
                  <CompanyPage />
                </ProtectedRoute>
              ),
                children:[{path:"company-profile",element:<CompanyProfile/>},
                    {path:"income-statement",element:<IncomeStatement/>},
                    { path: "balance-sheet", element: <BalanceSheet /> },
                    { path: "cashflow-statement", element: <CashflowStatement /> },
                ]
            }
            
        ]
    }
])