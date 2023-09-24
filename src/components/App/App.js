import "./App.css";
import Header from "../header/Header";
import Menu from "../gamemenu/Menu";
import Footer from "../footer/Footer";
import PlayField from "../play-field/PlayField";

function App() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <PlayField />
      <Footer />
    </div>
  );
}

export default App;
