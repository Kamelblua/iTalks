import { FC } from "react";
import { Avatar as MUIAvatar } from "@material-ui/core";
import { useStyles } from "./Avatar.styles";

export interface AvatarProps {
	username: string;
	link?: string;
	size?: number;
	[x: string]: any;
}

const Avatar: FC<AvatarProps> = ({ username, link, size, ...rest }) => {
	const colorFromUsername = (username: string) => {
		const firstCharacter = username.substring(0, 1).toUpperCase();
		let color = "#323232";

		switch (true) {
			case "ABCDEFG".includes(firstCharacter):
				color = "#0092cc";
				break;
			case "HIJKLMN".includes(firstCharacter):
				color = "#ff3333";
				break;
			case "OPQRSTU".includes(firstCharacter):
				color = "#dcd427";
				break;
			case "VWXYZ".includes(firstCharacter):
				color = "#779933";
				break;
		}

		return color;
	};

	const styles = useStyles({ color: colorFromUsername(username), size: size });

	return link ? (
		<MUIAvatar className={styles.avatar} alt={username} src={link} {...rest}>
			<svg viewBox='0 0 35 35'>
				<text fill='white' textAnchor='middle' dominantBaseline='middle' x='50%' y='55%'>
					{username.substring(0, 1).toUpperCase()}
				</text>
			</svg>
		</MUIAvatar>
	) : (
		<MUIAvatar className={`${styles.noLink} ${styles.avatar}`} alt={username} {...rest}>
			<svg viewBox='0 0 35 35'>
				<text fill='white' textAnchor='middle' dominantBaseline='middle' x='50%' y='55%'>
					{username.substring(0, 1).toUpperCase()}
				</text>
			</svg>
		</MUIAvatar>
	);
};

export default Avatar;
