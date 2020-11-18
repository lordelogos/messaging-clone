import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

function App() {
	return (
		<div className="App">
			{/* sidebar/nav */}
			<Sidebar />
			{/* chat area */}
			<Chat />
		</div>
	);
}

export default App;
