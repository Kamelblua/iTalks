import { ChangeEvent, FC } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { ceil, floor } from "lodash";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import { useStyles } from "./Paginate.styles";
import { Search } from "api/types/api";

interface PaginateProps {
	options: Search;
	total: number;
	action: (event: ChangeEvent<unknown>, page: number) => void;
	[x: string]: any;
}

const Paginate: FC<PaginateProps> = ({ options, total, action, ...rest }): JSX.Element | null => {
	const styles = useStyles();

	const display = () => {
		if (total === options.limit) {
			return false;
		}

		return floor(total / options.limit) > 0;
	};

	return display() ? (
		<Flex direction={FlexDirectionEnum.Horizontal} justify={FlexJustifyEnum.Center} fullWidth {...rest}>
			<Pagination
				page={options.page}
				showFirstButton={options.page > 10}
				showLastButton={options.page < floor(total / options.limit) - 9}
				size='medium'
				variant='outlined'
				className={styles.root}
				onChange={action}
				count={ceil(total / options.limit)}
			/>
		</Flex>
	) : null;
};

export default Paginate;
