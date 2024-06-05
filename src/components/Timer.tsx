import { FC, useEffect, useRef, useState } from "react";
import { ITimer } from "../@types/timer";

import {
	faPlayCircle,
	faPauseCircle,
	faArrowRotateLeft,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTimerContext } from "../contexts/TimerContext";
import { API_URL } from "../constants";

import alarm from "../data/alarm.mp3";

type Props = {
	timer: ITimer;
};

const Timer: FC<Props> = ({ timer }: Props) => {
	const { deleteTimer, toggleBookmark } = useTimerContext();

	const [isPlaying, setPlayingState] = useState(false);
	const [timeLeft, setTimeLeft] = useState(timer.duration);

	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		let interval: any;

		if (timeLeft <= 0 && isPlaying) {
			audioRef.current?.play();
			setPlayingState(false);
			setTimeout(() => audioRef.current?.pause(), 5000);
			clearInterval(interval);
		}

		if (isPlaying) {
			interval = setInterval(
				() => setTimeLeft((timeLeft) => timeLeft - 1000),
				1000
			);
		}

		// clear when unmounting component
		return () => clearInterval(interval);
	}, [isPlaying, timeLeft]);

	const startTimer = (evt: any) => {
		setPlayingState(true);
	};

	const pauseTimer = (evt: any) => {
		setPlayingState(false);
	};

	const resetTimer = (evt: any) => {
		setPlayingState(false);
		setTimeLeft(timer.duration);
	};

	const toggleAndSave = async () => {
		const toBookmark = !timer.bookmarked;

		if (toBookmark) {
			return saveBookmarkInDatabase()
				.then((id) => {
					toggleBookmark(timer.id, id);
				})
				.catch((err) => console.error(err));
		}

		removeBookmarkFromDatabase()
			.then(() => {
				toggleBookmark(timer.id);
			})
			.catch((err) => console.error(err));
	};

	const saveBookmarkInDatabase = async () => {
		const response = await fetch(`${API_URL}/timer`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(timer),
		});

		console.log(response);

		const data = await response.json();
		console.log(data);
		return data.id;
	};

	const removeBookmarkFromDatabase = async () => {
		return fetch(`${API_URL}/timer`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ id: timer.id }),
		});
	};

	const renderDuration = (duration: number) => {
		const hours = Math.floor(duration / 3600000);
		const remainingMilliseconds = duration % 3600000;
		const minutes = Math.floor(remainingMilliseconds / 60000);
		const seconds = Math.floor((remainingMilliseconds % 60000) / 1000);

		const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
		const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

		return (
			<div className="timer__duration">
				<div className="timer__duration-hours">{formattedHours}</div>
				<div className="timer__duration-separator">:</div>
				<div className="timer__duration-minutes">
					{formattedMinutes}
				</div>
				<div className="timer__duration-separator">:</div>
				<div className="timer__duration-seconds">
					{formattedSeconds}
				</div>
			</div>
		);
	};

	return (
		<div className="timer">
			<div className="timer__main">
				<div className="timer__main-name">{timer.name}</div>
				{isPlaying ? (
					<FontAwesomeIcon
						className="timer__main-control-play-icon"
						icon={faPauseCircle}
						onClick={pauseTimer}
					/>
				) : (
					<FontAwesomeIcon
						className="timer__main-control-play-icon"
						icon={faPlayCircle}
						onClick={startTimer}
					/>
				)}
				<FontAwesomeIcon
					className="timer__main-control-reset-icon"
					icon={faArrowRotateLeft}
					onClick={resetTimer}
				/>
				<button
					className="timer__main-bookmark-icon"
					onClick={toggleAndSave}
				>
					{timer.bookmarked ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 384 512"
						>
							<path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 384 512"
						>
							<path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
						</svg>
					)}
				</button>
			</div>
			{renderDuration(timeLeft)}
			<div
				className="timer__delete"
				onClick={(_) => deleteTimer(timer.id)}
			>
				<FontAwesomeIcon
					className="timer__delete-icon"
					icon={faTrash}
				/>
			</div>
			<audio ref={audioRef}>
				<source src={alarm} type="audio/mpeg" />
			</audio>
		</div>
	);
};

export default Timer;
