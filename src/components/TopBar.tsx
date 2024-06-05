import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const TopBar = () => {
	return (
		<div className="top-bar">
			<div className="top-bar__title">
				<FontAwesomeIcon
					className="top-bar__title-icon"
					icon={faClock}
				/>
				<div className="top-bar__title-text">React Timer</div>
			</div>
		</div>
	);
};

export default TopBar;
