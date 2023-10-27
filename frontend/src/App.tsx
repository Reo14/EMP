import { Grid, GridItem } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/configureStore";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Sidebar from "./components/Layout/Sidebar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OnBoardingPage from "./pages/OnBoardingPage";
import ErrorPage from "./pages/ErrorPage";
import HRtest from "./pages/HRtest";
import LoggedIn from "./pages/LoggedIn";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import EmployeeVisaPage from "./pages/EmployeeVisaPage";
import EmployeeList from "./pages/AllEmployeesPage";
import ReviewOnboarding from "./pages/ReviewOnboarding";
import HiringManagementPage from "./pages/HiringManagementPage";
import VisaStatusManagementPage from "./pages/VisaManagementPage";
import HRReviewInfo from "./pages/HRReviewInfo";

const App: FC = () => {
  const [navSize, setNavSize] = useState("small");
  const role = useSelector<RootState>((state) => state.auth.role);
  const isHR = role === "HR";
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.auth.isLoggedIn
  );

  return (
    <Router>
      <Grid
        h="100vh"
        templateAreas={`"sidebar header" "sidebar main"`}
        gridTemplateRows={"auto 1fr"}
        gridTemplateColumns={navSize === "small" ? "75px 1fr" : "220px 1fr"}
        transition="grid-template-columns 0.1s"
        autoFlow={"row"}
      >
        <GridItem bg="gray.200" area={"header"}>
          <Header />
        </GridItem>
        <GridItem bg="white" area={"sidebar"}>
          <Sidebar navSize={navSize} setNavSize={setNavSize} />
        </GridItem>
        <GridItem backgroundColor="gray.100" area={"main"}>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={`${
                    isLoggedIn
                      ? isHR
                        ? "/hr/all-employees"
                        : "/employee-onboarding"
                      : "/sign-in"
                  }`}
                  replace
                />
              }
            />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            
            <Route 
              path="/employee-onboarding" 
              element={isLoggedIn ? <OnBoardingPage /> : <ErrorPage />} 
            />
            <Route 
              path="/employee-infos" 
              element={isLoggedIn ? <PersonalInfoPage /> : <ErrorPage />} 
            />
            <Route 
              path="/review-info" 
              element={isLoggedIn ? <ReviewOnboarding /> : <ErrorPage />} />
            <Route 
              path="/employee-visa" 
              element={isLoggedIn ? <EmployeeVisaPage /> : <ErrorPage />} 
            />

            <Route
              path="/employee-onboarding"
              element={isLoggedIn ? <OnBoardingPage /> : <ErrorPage />}
            />
            <Route
              path="/employee-infos"
              element={isLoggedIn ? <PersonalInfoPage /> : <ErrorPage />}
            />
            <Route
              path="/review-info"
              element={isLoggedIn ? <ReviewOnboarding /> : <ErrorPage />}
            />
            <Route
              path="/employee-visa"
              element={isLoggedIn ? <EmployeeVisaPage /> : <ErrorPage />}
            />

            <Route
              path="/hr/all-employees"
              element={isHR ? <EmployeeList /> : <ErrorPage />}
            />
            <Route
              path="/hr/hiring-management"
              element={isHR ? <HiringManagementPage /> : <ErrorPage />}
            />
            <Route
              path="/hr/visa-management"
              element={isHR ? <VisaStatusManagementPage /> : <ErrorPage />}
            />
            <Route
              path="/hr/review-info"
              element={isHR ? <HRReviewInfo /> : <ErrorPage />}
            />

            <Route path="/hrtest" element={isHR ? <HRtest /> : <ErrorPage />} />
            <Route path="/success" element={<LoggedIn />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </GridItem>
      </Grid>
    </Router>
  );
};

export default App;
