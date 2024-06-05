import { createContext, ReactNode, useContext, useState } from "react";
import { ITimer, TimerContextType } from "../@types/timer";

const TimerContext = createContext<TimerContextType>({
	timers: [],
	addFetchedTimers: () => null,
	addTimer: () => null,
	deleteTimer: () => null,
	toggleBookmark: () => null,
});

const TimerProvider = ({ children }: { children: ReactNode }) => {
	const [timers, setTimers] = useState<ITimer[]>([]);

	const addTimer = (timer: ITimer) => {
		const newTimers = [...timers, timer];
		setTimers(newTimers);
	};

	const addFetchedTimers = (timers: any) => {
		setTimers(timers.map((timer: any) => ({ ...timer, bookmarked: true })));
	};

	const deleteTimer = (id: number) => {
		console.log(id);
		setTimers(timers.filter((timer) => timer.id !== id));
	};

	const toggleBookmark = (oldId: number, ...props: any[]) => {
		setTimers((prev) =>
			prev.map((prevTimer) => {
				if (prevTimer.id == oldId) {
					return {
						...prevTimer,
						...props,
						bookmarked: !prevTimer.bookmarked,
					};
				}
				return prevTimer;
			})
		);
	};

	return (
		<TimerContext.Provider
			value={{
				timers,
				addFetchedTimers,
				addTimer,
				deleteTimer,
				toggleBookmark,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};

export const useTimerContext = () => {
	return useContext(TimerContext);
};

export default TimerProvider;
