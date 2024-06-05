import { FC, FormEvent } from "react";

import { ITimer } from "../@types/timer";
import { useTimerContext } from "../contexts/TimerContext";

const CreateTimer: FC = () => {
	const { timers, addTimer } = useTimerContext();

	const toMs = (hours: number, minutes: number, seconds: number) => {
		return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
	};

	const onSubmit = (evt: FormEvent) => {
		evt.preventDefault();

		const formData = new FormData(evt.currentTarget as HTMLFormElement);
		const name = formData.get("name")?.toString();

		const hours = Number(formData.get("hours"));
		const minutes = Number(formData.get("minutes"));
		const seconds = Number(formData.get("seconds"));

		if (!name || name.trim() === "") {
			return;
		}

		const durationInMs = toMs(hours, minutes, seconds);

		const timer: ITimer = {
			id: timers.length > 0 ? timers[timers.length - 1].id + 1 : 1,
			name,
			duration: durationInMs,
			bookmarked: false,
		};

		addTimer(timer);
	};

	return (
		<div className="create-timer__container">
			<form className="create-timer__form" onSubmit={onSubmit}>
				<div className="input-wrapper">
					<label htmlFor="name">Timer Name</label>
					<input
						type="text"
						name="name"
						placeholder="Enter the name of the timer..."
						required
					/>
				</div>
				<div className="create-timer__form-time_container">
					<div className="create-timer__form-hours">
						<input type="number" name="hours" defaultValue="00" />
					</div>
					:
					<div className="create-timer__form-minute">
						<input type="number" name="minutes" defaultValue="25" />
					</div>
					:
					<div className="create-timer__form-seconds">
						<input type="number" name="seconds" defaultValue="00" />
					</div>
				</div>
				<button type="submit">CREATE TIMER</button>
			</form>
		</div>
	);
};

export default CreateTimer;
