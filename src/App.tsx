import { useEffect } from "react";
import CreateTimer from "./components/CreateTimer";
import Timers from "./components/Timers";
import TopBar from "./components/TopBar";

import "./style/index.scss";
import { API_URL } from "./constants";
import { useTimerContext } from "./contexts/TimerContext";

function App() {
	const { addFetchedTimers } = useTimerContext();

	useEffect(() => {
		fetchBookmarked();
	}, []);

	const fetchBookmarked = async () => {
		const response = await fetch(`${API_URL}/timers`);
		const timers = await response.json();
		addFetchedTimers(timers);
	};

	return (
		<>
			<TopBar />
			<CreateTimer />
			<Timers />
		</>
	);
}

export default App;
