// react
import { FC } from "react";
// Lib
import { Box, Button } from "@material-ui/core";
// API
import { UserProfil } from "api/types/user";
import { api } from "api/api.request";
import auth from "api/auth";
// Components
import Flex from "components/Elements/Layout/Flex/Flex";
import Avatar from "components/Elements/Avatar/Avatar";
import Title from "components/Elements/Typograhpy/Title/Title";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { FlexDirectionEnum, FlexAlignEnum } from "components/Elements/Layout/Flex/Flex.d";
import Role from "components/Elements/Role/Role";
// Style
import { useStyles } from "./UserInfo.styles";

export interface UserProps {
	user: UserProfil;
	setUser: Function;
	[x: string]: any;
}

const UserInfo: FC<UserProps> = ({ user, setUser, ...rest }) => {
	const styles = useStyles();

	const follow = () => {
		api.user
			.follow({ id: user.id, type: "user" })
			.then((res) => {
				setUser({ ...user, following: true });
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const unfollow = () => {
		api.user
			.unfollow({ id: user.id, type: "user" })
			.then((res) => {
				setUser({ ...user, following: false });
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<Box p='25px' boxShadow='var(--medium-box-shadow)'>
			<Flex direction={FlexDirectionEnum.Vertical} align={FlexAlignEnum.Center}>
				<Avatar style={{ marginBottom: "15px" }} size={100} username={user.username} link={user.avatar} />
				<Flex direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
					<Title semantic={TitleVariantEnum.H5}>{user.username}</Title>
					{user.role !== "user" && <Role role={user.role} />}
				</Flex>
				<Flex direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
					{auth.getUserId() !== user.id && (
						<>
							{user.following ? (
								<Button onClick={unfollow} className={styles.unfollow} variant='outlined'>
									Ne plus Suivre
								</Button>
							) : (
								<Button
									onClick={follow}
									style={{ margin: "10px", background: "var(--info)" }}
									variant='contained'
									color='primary'
								>
									Suivre
								</Button>
							)}
							<ResetLink to={`/messages/${user.id}`}>
								<Button style={{ background: "var(--light)" }} variant='contained'>
									Message
								</Button>
							</ResetLink>
						</>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export default UserInfo;
