import { FC } from "react";

import { useTimerContext } from "../contexts/TimerContext";
import { ITimer } from "../@types/timer";
import Timer from "./Timer";

const Timers: FC = () => {
	const { timers } = useTimerContext();

	return (
		<div className="timers">
			{timers.map((timer: ITimer) => (
				<Timer key={timer.id} timer={timer} />
			))}
		</div>
	);
};

export default Timers;
