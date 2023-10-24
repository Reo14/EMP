import { Grid, GridItem } from "@chakra-ui/react";
import { FC } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
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
import VisaStatusManagementPage from "./pages/VisaManagementPage"
import HiringManagementPage from "./pages/HiringManagementPage"

const App: FC = () => {
  return (
    <Router>
      <Grid
        h="100vh"
        templateAreas={`"header" "main" "footer"`}
        gridTemplateRows={"auto 1fr 85px"}
        gridTemplateColumns={"100%"}
        autoFlow={"column"}
      >
        <GridItem bg="#111827" area={"header"}>
          <Header />
        </GridItem>
        <GridItem backgroundColor="gray.100" area={"main"}>
          <Routes>
            <Route path="/" element={<Navigate to="/sign-in" replace />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/employee-onboarding" element={<OnBoardingPage />} />
            <Route path="/employee-infos" element={<PersonalInfoPage />} />
            <Route path="/review-info" element={<ReviewOnboarding />} />
            <Route path="/employee-visa" element={<EmployeeVisaPage />} />

            <Route path="/hr/all-employees" element={<EmployeeList />} />
            <Route path="hr/hiring-management" element={<HiringManagementPage />} />
            <Route path="hr/visa-management" element={<VisaStatusManagementPage />} />
            <Route path="/hrtest" element={<HRtest />} />
            <Route path="/success" element={<LoggedIn />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </GridItem>
        <GridItem bg="#111827" area={"footer"}>
          <Footer />
        </GridItem>
      </Grid>
    </Router>
  );
};

export default App;
