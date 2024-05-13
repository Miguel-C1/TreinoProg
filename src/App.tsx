import React, { useState } from "react";
import { Text, View } from "react-native";
import Home from "./pages/Home";
import Template from "./Template";

const App = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  
  const navigateToHome = () => {
    setCurrentPage("Home");
  };
  
  const navigateToExercicio = () => {
    setCurrentPage("Exercicio");
  };

  console.log(currentPage)

  return (
    <View>
      {currentPage === "Home" ? (
        <Home gotoHome={navigateToHome} />
      ) : (
        <Text>Outra página</Text>
      )}
      <Text>Teste</Text>
    </View>
  );
};
export default App;
