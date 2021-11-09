// React
import { FC, useEffect, useState } from "react";
// Api interface
import { api } from "api/api.request";
// Types
import { AxiosError } from "axios";
import { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { useStyles } from "./Logout.styles";
// Librairies
import { IconButton } from "@material-ui/core";
import { HiOutlineRefresh } from "react-icons/hi";
// Components
import Flex from "components/Elements/Layout/Flex/Flex";
import Title from "components/Elements/Typograhpy/Title/Title";
import Loading from "components/Elements/Animations/Loading/Loading";

const Logout: FC<{}> = () => {
	const styles = useStyles();

	const [loading, setLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);

	const reload = () => {
		setRefresh(!refresh);
	};

	useEffect(() => {
		api.user
			.logout()
			.then((res) => {
				document.location.href = "/login";
			})
			.catch((err: AxiosError) => {
				console.error(err);
			});
		setTimeout(() => {
			setLoading(false);
		}, 1500);
		return () => {
			setLoading(true);
		};
	}, [refresh]);

	return (
		<Flex
			direction={FlexDirectionEnum.Vertical}
			align={FlexAlignEnum.Center}
			justify={FlexJustifyEnum.End}
			width='100%'
		>
			<img src='/assets/images/logout_floating.svg' alt='floating' className={styles.floating} />
			<img src='/assets/images/logout_sleeping.svg' alt='sleeping' className={styles.sleeping} />
			<Title semantic={TitleVariantEnum.H2}>Déconnexion</Title>
			{loading ? (
				<Loading radius={15} />
			) : (
				<IconButton onClick={reload} className={styles.refresh}>
					<HiOutlineRefresh />
				</IconButton>
			)}
		</Flex>
	);
};

export default Logout;
