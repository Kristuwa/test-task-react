import { theme } from "../../utils/theme";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { SharedLayout } from "../SharedLayout/SharedLayout";

const Tweets = lazy(() => import("../../pages/Tweets/Tweets"));
const Home = lazy(() => import("../../pages/Home/Home"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/tweets" element={<Tweets />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
