import { api } from "api/api.request";
import { ApiListDataResult, Search } from "api/types/api";
import { User } from "api/types/user";
import { FC, useState, useEffect } from "react";
import DataTable from "components/Modules/DataTable/DataTable";
import { Box, TextField } from "@material-ui/core";
import Paginate from "components/Submodules/Paginate/Paginate";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { useStyles } from "./Manage.styles";
import Select from "react-select";
import _ from "lodash";
import { AxiosError } from "axios";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";

// Data
import userData from "components/Modules/DataTable/Data/UserData";
import postData from "components/Modules/DataTable/Data/PostData";
import categoryData from "components/Modules/DataTable/Data/CategoryData";
import badgeData from "components/Modules/DataTable/Data/BadgeData";
import roleData from "components/Modules/DataTable/Data/RoleData";

const limitOptions: any[] = [
	{ value: 10, label: "10" },
	{ value: 25, label: "25" },
	{ value: 50, label: "50" },
];
const dynamicTableOptions: any = [
	{
		value: {
			api: "users",
			data: userData,
		},
		label: "Utilisateurs",
	},
	{
		value: {
			api: "posts",
			data: postData,
		},
		label: "Posts",
	},
	{
		value: {
			api: "categories",
			data: categoryData,
		},
		label: "Catégories",
	},
	{
		value: {
			api: "badges",
			data: badgeData,
		},
		label: "Badges",
	},
	{
		value: {
			api: "roles",
			data: roleData,
		},
		label: "Roles",
	},
];

const Manage: FC<{}> = () => {
	const [loading, setLoading] = useState(true);
	const [options, setOptions] = useState<Search>({
		limit: 25,
		page: 1,
		search: "",
	});
	const [users, setUsers] = useState<User[]>([]);
	const [total, setTotal] = useState(0);
	const [fetchAction, setFecthAction] = useState<{ action: { api: string; data: any }; name: string }>({
		action: {
			api: "users",
			data: userData,
		},
		name: "Utilisateurs",
	});
	// Functions
	const changePage = (event: unknown, newPage: number) => {
		setOptions({ ...options, page: newPage });
	};
	const changeLimit = (e: any) => {
		setOptions({ ...options, limit: e.value as number, page: 1 });
	};
	const changeTable = (e: any) => {
		setFecthAction({ ...fetchAction, action: e.value, name: e.label });
	};
	const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOptions({ ...options, search: event.target.value });
	};

	useEffect(() => {
		setLoading(true);

		api.admin[fetchAction.action.api](options)
			.then((res: ApiListDataResult<any>) => {
				console.log(res);
				setUsers(res.data.items);
				setTotal(res.data.total);
			})
			.catch((err: AxiosError) => console.error(err))
			.finally(() => {
				setLoading(false);
			});
	}, [options, fetchAction]);

	const OptionsHeader: FC<{ options: Search }> = ({ options }) => {
		const styles = useStyles();

		return (
			<Flex
				style={{ padding: "15px", color: "var(--text)", height: "50px" }}
				fullWidth
				align={FlexAlignEnum.Center}
				direction={FlexDirectionEnum.Horizontal}
			>
				<Select
					isSearchable={false}
					styles={{
						container: (provided) => ({
							...provided,
							width: "150px",
						}),
						option: (provided, state) => ({
							...provided,
							borderBottom: "1px dotted pink",
							color: "var(--bg) !important",
							padding: 20,
						}),
						valueContainer: (provided) => ({
							...provided,
							color: "var(--bg) !important",
						}),
						input: (provided) => ({
							...provided,
							color: "var(--bg)",
						}),
						singleValue: (provided, state) => ({
							...provided,
							color: "var(--bg) !important",
						}),
					}}
					value={{ value: fetchAction, label: fetchAction.name }}
					onChange={changeTable}
					options={dynamicTableOptions}
				/>
				<Select
					isSearchable={false}
					styles={{
						container: (provided) => ({
							...provided,
							width: "150px",
						}),
						option: (provided, state) => ({
							...provided,
							borderBottom: "1px dotted pink",
							color: "var(--bg) !important",
							padding: 20,
						}),
						valueContainer: (provided) => ({
							...provided,
							color: "var(--bg) !important",
						}),
						input: (provided) => ({
							...provided,
							color: "var(--bg)",
						}),
						singleValue: (provided, state) => ({
							...provided,
							color: "var(--bg) !important",
						}),
					}}
					value={{ value: options.limit, label: options.limit }}
					onChange={changeLimit}
					options={limitOptions}
				/>
				<TextField
					className={styles.search}
					label='Recherche'
					defaultValue={options.search}
					InputLabelProps={{
						classes: {
							root: styles.searchLabel,
						},
					}}
					InputProps={{
						classes: {
							root: styles.searchInput,
							notchedOutline: styles.notchedOutline,
						},
						inputMode: "numeric",
					}}
					onChange={_.debounce(changeSearch, 500)}
					placeholder='Rechercher ...'
					variant='outlined'
				/>
			</Flex>
		);
	};

	return (
		<Box>
			<Title semantic={TitleVariantEnum.H4}>Gestion</Title>

			<DataTable
				optionsHeader={<OptionsHeader options={options} />}
				items={users}
				headers={fetchAction.action.data.headers}
				itemProperties={fetchAction.action.data.properties}
				actions={fetchAction.action.data.actions}
				loading={loading}
				pagination={
					<Paginate style={{ background: "var(--bg)" }} options={options} total={total} action={changePage} />
				}
			/>
		</Box>
	);
};

export default Manage;
