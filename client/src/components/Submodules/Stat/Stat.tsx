import { Box, CircularProgress, Typography } from "@material-ui/core";
import IconWithText from "components/Elements/IconWithText/IconWithText";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { cloneElement, FC } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { useStyles } from "./Stat.styles";

interface StatProps {
	stat: number | undefined;
	label: string;
	icon: JSX.Element;
}

const Stat: FC<StatProps> = ({ stat, label, icon }) => {
	const styles = useStyles();

	return (
		<Box className={styles.container}>
			<Flex
				className={styles.firstContainer}
				direction={FlexDirectionEnum.Horizontal}
				align={FlexAlignEnum.Center}
				justify={FlexJustifyEnum.SpaceBetween}
			>
				<Flex direction={FlexDirectionEnum.Vertical}>
					{typeof stat === "undefined" || stat < 0 ? (
						<CircularProgress color='inherit' />
					) : (
						<Title semantic={TitleVariantEnum.H3}>{stat}</Title>
					)}
					<Typography style={{ fontSize: "24px" }}>{label}</Typography>
				</Flex>
				{cloneElement(icon, { fontSize: "50px" })}
			</Flex>

			<ResetLink to='#'>
				<IconWithText
					className={styles.link}
					start={false}
					icon={<IoMdArrowDropright />}
					label={"Voir tous les " + label.toLowerCase().replace("(s)", "s")}
				/>
			</ResetLink>
		</Box>
	);
};

export default Stat;
