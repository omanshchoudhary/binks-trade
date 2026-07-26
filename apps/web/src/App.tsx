import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./pages/Dashboard";
import { balance } from "./data/mockData";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="app__main">
        <TopBar balance={balance} />
        <main className="app__content">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
