// React
import { FC, useState } from "react";
// Librairies
import { Box, Checkbox, FormControlLabel, FormHelperText } from "@material-ui/core";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { useForm } from "react-hook-form";
import { HiSearch } from "react-icons/hi";
import { useStyles } from "./Search.styles";
import Button from "components/Elements/Buttons/Button/Button";
import PostSearchResults from "components/Modules/Search/PostSearchResults/PostSearchResults";
import UserSearchResults from "components/Modules/Search/UserSearchResults/UserSearchResults";
import CategorySearchResults from "components/Modules/Search/CategorySearchResults/CategorySearchResults";
import { UserShort } from "api/types/user";
import { Post } from "api/types/post";
import { Category } from "api/types/category";
import { Search as SearchType } from "api/types/api";
import { api } from "api/api.request";
import _ from "lodash";
import FormControl from "components/Elements/Form/FormControl/FormControl";

const Search: FC<{}> = () => {
	// Styles
	const styles = useStyles();
	// Hook form
	const { register, handleSubmit, getValues } = useForm();
	// States
	const [fetched, setFetched] = useState(false);
	const [activate, setActivate] = useState<any>({
		posts: {
			active: true,
		},
		users: {
			active: false,
		},
		categories: {
			active: false,
		},
	});
	const [dataPosts, setDataPosts] = useState<{ posts: Post[]; total: number; count: number }>({
		posts: [],
		total: 0,
		count: 0,
	});
	const [dataUsers, setDataUsers] = useState<{ users: UserShort[]; total: number; count: number }>({
		users: [],
		total: 0,
		count: 0,
	});
	const [dataCategories, setDataCategories] = useState<{ categories: Category[]; total: number; count: number }>({
		categories: [],
		total: 0,
		count: 0,
	});
	// Custom methods
	const onSubmit = () => {
		let testEmpty = _.every(activate, { active: false });

		if (testEmpty) {
			return false;
		}

		const search: SearchType = {
			limit: 15,
			page: 1,
			search: getValues("search"),
		};

		api.post
			.search(search)
			.then((res) => {
				setDataPosts({ posts: res.data.posts.items, total: res.data.posts.total, count: res.data.posts.count });
				setDataUsers({ users: res.data.users.items, total: res.data.users.total, count: res.data.users.count });
				setDataCategories({
					categories: res.data.categories.items,
					total: res.data.categories.total,
					count: res.data.categories.count,
				});
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setFetched(true);
			});

		return true;
	};
	const handleChange = (e: any) => {
		setActivate((prevState: any) => ({ ...prevState, [e.target.name]: { active: !activate[e.target.name].active } }));
	};

	return (
		<Box width='100%'>
			<Title semantic={TitleVariantEnum.H1}>Recherche</Title>
			<form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
				<Flex direction={FlexDirectionEnum.Horizontal}>
					<FormControl
						label='Recherche'
						placeholder="Titre, nom d'utilisateur, catégorie ..."
						type='text'
						identifier='search'
						register={register}
						startIcon={<HiSearch />}
					></FormControl>
				</Flex>

				<Flex direction={FlexDirectionEnum.Horizontal}>
					<FormControlLabel
						control={<Checkbox checked={activate.posts.active} onChange={handleChange} name='posts' />}
						label='Rechercher les posts'
					/>
					<FormControlLabel
						control={<Checkbox checked={activate.users.active} onChange={handleChange} name='users' />}
						label='Rechercher les utilisateurs'
					/>
					<FormControlLabel
						control={<Checkbox checked={activate.categories.active} onChange={handleChange} name='categories' />}
						label='Rechercher les catégories'
					/>
				</Flex>
				{_.every(activate, { active: false }) && (
					<FormHelperText style={{ color: "var(--danger)" }}>Un filtre de recherche est requis.</FormHelperText>
				)}

				<Button label='Appliquer' type='submit' color='var(--light)' />
			</form>

			{fetched && (
				<Flex direction={FlexDirectionEnum.Vertical}>
					{activate.posts.active && <PostSearchResults dataPosts={dataPosts} />}
					{activate.users.active && <UserSearchResults dataUsers={dataUsers} />}
					{activate.categories.active && <CategorySearchResults dataCategories={dataCategories} />}
				</Flex>
			)}
		</Box>
	);
};

export default Search;
