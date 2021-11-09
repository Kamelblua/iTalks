import { FC } from "react";

import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { Typography } from "@material-ui/core";
import IconButton from "components/Elements/Buttons/IconButton/IconButton";
import { IconButtonSizeEnum, IconButtonTypeEnum } from "components/Elements/Buttons/IconButton/IconButton.d";
import { HiChevronDoubleDown, HiChevronDoubleUp, HiChevronDown, HiChevronUp } from "react-icons/hi";

export interface VoteCountProps {
	votes: number;
	positive: boolean | null;
}

const VoteCount: FC<VoteCountProps> = ({ votes, positive }) => {
	return (
		<Flex direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
			<IconButton
				style={{ color: "var(--text)" }}
				type={IconButtonTypeEnum.Ghost}
				size={IconButtonSizeEnum.Md}
				icon={positive ? <HiChevronDoubleUp color='var(--success)' /> : <HiChevronUp />}
			/>
			<Typography>{votes}</Typography>
			<IconButton
				style={{ color: "var(--text)" }}
				type={IconButtonTypeEnum.Ghost}
				size={IconButtonSizeEnum.Md}
				icon={!positive && positive !== null ? <HiChevronDoubleDown color='var(--danger)' /> : <HiChevronDown />}
			/>
		</Flex>
	);
};

export default VoteCount;
