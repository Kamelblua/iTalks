import { FC } from "react";
import { Box } from "@material-ui/core";
import { UserShort as UserShortType } from "api/types/user";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useStyles } from "./UserSearchResults.styles";
import UserShort from "components/Submodules/UserShort/UserShort";
import IconWithText from "components/Elements/IconWithText/IconWithText";

interface UserSearchResultsProps {
	dataUsers: {
		users: UserShortType[];
		total: number;
		count: number;
	};
}

const UserSearchResults: FC<UserSearchResultsProps> = ({ dataUsers }) => {
	const styles = useStyles();

	return (
		<Box className={styles.container}>
			<IconWithText
				size='35px'
				start
				icon={<HiOutlineUserCircle fontSize={50} />}
				label={dataUsers.users.length > 0 ? "Utilisateurs - Meilleurs résultats" : "Aucun résultat"}
			/>

			{dataUsers.total > 0 && dataUsers.users.map((u, k) => <UserShort key={k} user={u} />)}
		</Box>
	);
};

export default UserSearchResults;
