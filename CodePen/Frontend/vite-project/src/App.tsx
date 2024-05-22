import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Button } from "./components/ui/button";
import Home from "./Pages/Home";
import Compiler from "./Pages/Compiler";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import {store} from '../src/components/Redux Store/store';

function App() {
  return (
    <>
      <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Compiler />} />
        </Routes>
      </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
