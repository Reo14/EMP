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
import ErrorPage from "./pages/ErrorPage";

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
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </GridItem>
        <GridItem bg="#111827" area={"footer"}>
          <Footer />
        </GridItem>
      </Grid>
    </Router>
  );
}

export default App;
