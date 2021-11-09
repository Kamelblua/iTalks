import { FC } from "react";
import { List } from "@material-ui/core";
import { UserShort as UserShortType } from "api/types/user";
import UserShort from "components/Submodules/UserShort/UserShort";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { useStyles } from "./UserList.styles";

export interface UserListProps {
	users: UserShortType[];
	selectedUserId?: string;
}

const UserList: FC<UserListProps> = ({ users, selectedUserId }) => {
	const styles = useStyles();

	return (
		<List>
			{users.length > 0 &&
				users.map((u, i) => (
					<ResetLink key={i} to={`/messages/${u.id}`}>
						<UserShort
							className={`${
								selectedUserId && parseInt(selectedUserId) === u.id ? styles.selected : styles.notSelected
							}`}
							user={u}
						/>
					</ResetLink>
				))}
		</List>
	);
};

export default UserList;
