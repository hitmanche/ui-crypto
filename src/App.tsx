import "./App.css";
import { Authorization } from "./components/authorization";
import DashboardComponent from "./page/dashboard";

function App() {
  return (
    <Authorization>
      <DashboardComponent />
    </Authorization>
  );
}

export default App;
