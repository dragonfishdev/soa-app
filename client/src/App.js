import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";

import 'materialize-css';
import { Header } from "./components/Header";

function App() {
  const routes = useRoutes();

  return (
    <Router>
      <Header />
      <div className="container">
        { routes }
      </div>
    </Router>
  )
}

export default App;
