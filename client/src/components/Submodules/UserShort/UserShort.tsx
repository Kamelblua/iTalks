import { FC, ReactElement } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { UserShort as UserShortType } from "api/types/user";
import Avatar from "components/Elements/Avatar/Avatar";

export interface UserProps {
	user?: UserShortType;
	[x: string]: any;
}

const UserShort: FC<UserProps> = ({ user, ...rest }): ReactElement<any, any> | null => {
	if (!user) {
		return null;
	}

	return (
		<ListItem button key={user.id} {...rest}>
			<ListItemIcon>
				<Avatar username={user.username} link={user.avatar} />
			</ListItemIcon>
			<ListItemText primary={user.username}>{user.username}</ListItemText>
		</ListItem>
	);
};

export default UserShort;
