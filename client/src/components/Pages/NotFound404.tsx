import { Box } from "@material-ui/core";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import Title from "components/Elements/Typograhpy/Title/Title";
import { FC } from "react";
import { useStyles } from "./NotFound404.styles";
import Button from "components/Elements/Buttons/Button/Button";
import { HiLogin } from "react-icons/hi";
import { ButtonTypeEnum } from "components/Elements/Buttons/Button/Button.d";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";

const NotFound404: FC<{}> = () => {
	const styles = useStyles();

	return (
		<Box className={styles.container}>
			<Title semantic={TitleVariantEnum.H1}>404</Title>
			<ResetLink to='/'>
				<Button startIcon={<HiLogin />} label='Retour' type={ButtonTypeEnum.Info} />
			</ResetLink>
		</Box>
	);
};

export default NotFound404;
