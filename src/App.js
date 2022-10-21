import './App.css';

import { useColorMode } from "@chakra-ui/react";

import NavBar from "./components/NavBar";
import Chart from "./components/Chart";
import TableData from "./components/Table";

function App() {

  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <>
      <NavBar
        isDarkMode={isDarkMode}
        toggleColorMode={toggleColorMode}
      />
      <Chart />
      <TableData isDarkMode={isDarkMode}/>
    </>
  );
}

export default App;
