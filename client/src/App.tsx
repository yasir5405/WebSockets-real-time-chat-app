import { Route, Routes } from "react-router-dom";
import Room from "./components/Room";
import Chat from "./components/Chat";

const App = () => {
  return (
    <div className="w-full min-h-dvh bg-neutral-950 flex items-center justify-center text-neutral-300">
      <Routes>
        <Route path="/" element={<Room />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
