import { theme } from "../../utils/theme";
import { ThemeProvider } from "styled-components";
import MainPage from "../../pages/MainPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes> */}
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
