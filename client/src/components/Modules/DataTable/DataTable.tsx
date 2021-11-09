import { cloneElement, FC } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { useStyles } from "./DataTable.styles";
import Loading from "components/Elements/Animations/Loading/Loading";
import { Header, Property, Action } from "api/types/shared";
import moment from "moment";
import Avatar from "components/Elements/Avatar/Avatar";

interface DataTableProps {
	optionsHeader: JSX.Element;
	headers: Header[];
	items: any[];
	itemProperties: Property[];
	actions: Action[];
	pagination: JSX.Element;
	loading: boolean;
}

const DataTable: FC<DataTableProps> = ({
	optionsHeader,
	headers,
	items,
	itemProperties,
	actions,
	pagination,
	loading,
}) => {
	const styles = useStyles();

	return (
		<Box>
			<TableContainer className={styles.tableContainer} component={Paper}>
				{loading && (
					<Flex className={styles.loadingOverlay} fullWidth direction={FlexDirectionEnum.Vertical} centered>
						<Loading radius={25} />
					</Flex>
				)}
				{optionsHeader}
				<Table>
					<TableHead style={{ borderColor: "red" }}>
						<TableRow>
							{headers.map((h, k) => (
								<TableCell
									style={{ fontWeight: "bold", fontSize: "20px", color: "var(--text)" }}
									align={h.align ?? "left"}
									key={k}
								>
									{h.value}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody style={{ borderColor: "red" }}>
						{items.map((i, k) => (
							<TableRow key={k}>
								{itemProperties.map((p, k) => (
									<TableCell style={{ color: "var(--text)" }} align={p.align ?? "left"} key={k}>
										{p.value === "created_at" ? (
											moment(i[p.value]).fromNow()
										) : p.value === "resource" ? (
											<Avatar username='B' link={i[p.value]} />
										) : (
											i[p.value]
										)}
									</TableCell>
								))}
								<TableCell align='center'>
									{actions.map((a, k) =>
										cloneElement(a.element, {
											onClick: () => {
												a.action.call(i);
											},
											key: k,
											className: styles.icon,
										})
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{pagination}
			</TableContainer>
		</Box>
	);
};

export default DataTable;
