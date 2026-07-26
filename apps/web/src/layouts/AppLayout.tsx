import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { balance } from "../data/mockData";

export function AppLayout() {
  return (
    <div className="app">
      <Sidebar />
      <div className="app__main">
        <TopBar balance={balance} />
        <main className="app__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
