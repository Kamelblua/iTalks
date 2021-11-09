import { FC, useState, useEffect, ChangeEvent, useRef, cloneElement } from "react";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./List.styles";
import { AxiosError, AxiosResponse } from "axios";
import Paginate from "components/Submodules/Paginate/Paginate";
import Loading from "components/Elements/Animations/Loading/Loading";
import { FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import Flex from "components/Elements/Layout/Flex/Flex";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";

interface PostListProps {
	fetchItems: Function;
	reload?: boolean;
	customNoItemsElement?: any;
	itemComponent: any;
	itemProp: string;
}

const List: FC<PostListProps> = ({ fetchItems, reload, customNoItemsElement, itemComponent, itemProp }) => {
	// Styles
	const styles = useStyles();
	// Refs
	const topRef = useRef<HTMLDivElement>(null);
	// States
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState<any[]>([]);
	const [total, setTotal] = useState(0);
	const [options, setOptions] = useState<{ page: number; limit: number }>({
		page: 1,
		limit: 15,
	});
	// Custom methods
	const changePage = (event: ChangeEvent<unknown>, value: number) => {
		if (topRef.current) {
			topRef.current.scrollIntoView();
		}
		setOptions({ ...options, page: value });
	};
	// Effects
	useEffect(() => {
		setLoading(true);

		fetchItems(options)
			.then((res: AxiosResponse) => {
				console.log(res);
				setItems(res.data.items);
				setTotal(res.data.total);
			})
			.catch((err: AxiosError) => console.error(err))
			.finally(() => {
				setLoading(false);
			});

		return () => {};
	}, [options, reload]);

	return (
		<Box className={styles.list}>
			<div ref={topRef} />
			<Paginate options={options} total={total} action={changePage} />
			{loading ? (
				<Flex direction={FlexDirectionEnum.Horizontal} justify={FlexJustifyEnum.Center}>
					<Loading radius={15} />
				</Flex>
			) : (
				<>
					{items.length > 0 ? (
						<>
							{items.map((i, k) => cloneElement(itemComponent, { [itemProp]: i, key: k }))}
							<Paginate options={options} total={total} action={changePage} />
						</>
					) : (
						<Flex direction={FlexDirectionEnum.Vertical} centered height='100%'>
							{customNoItemsElement ?? (
								<>
									<Title semantic={TitleVariantEnum.H6}>Aucun post récent.</Title>
									<Typography>Commencez à suivre un utilisateur ou une catégorie.</Typography>
								</>
							)}
						</Flex>
					)}
				</>
			)}
		</Box>
	);
};

export default List;
