import { ITimer } from "./timer.d";
export interface ITimer {
	id: number;
	name: string;
	duration: number;
	bookmarked: boolean;
}

export type TimerContextType = {
	timers: ITimer[];
	addFetchedTimers: (any) => void;
	addTimer: (ITimer) => void;
	deleteTimer: (id: number) => void;
	toggleBookmark: (id: number, ...props) => void;
};
