import { FC } from "react";
import { Box } from "@material-ui/core";
import { Category as CategoryType } from "api/types/category";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { HiOutlineTag } from "react-icons/hi";
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import Flex from "components/Elements/Layout/Flex/Flex";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { useStyles } from "./CategorySearchResults.styles";
import { HiTag } from "react-icons/hi";
import IconWithText from "components/Elements/IconWithText/IconWithText";

interface CategorySearchResultsProps {
	dataCategories: {
		categories: CategoryType[];
		total: number;
		count: number;
	};
}

const CategorySearchResults: FC<CategorySearchResultsProps> = ({ dataCategories }) => {
	const styles = useStyles();

	return (
		<Box className={styles.container}>
			<IconWithText
				size='35px'
				start
				icon={<HiOutlineTag fontSize={50} />}
				label={dataCategories.categories.length > 0 ? "Catégories - Meilleurs résultats" : "Aucun résultat"}
			/>

			{dataCategories.total > 0 &&
				dataCategories.categories.map((c, k) => (
					<ResetLink key={k} to={"/category/" + c.name}>
						<Flex
							className={styles.categoryContainer}
							key={k}
							direction={FlexDirectionEnum.Horizontal}
							align={FlexAlignEnum.Center}
						>
							<Title semantic={TitleVariantEnum.H6} className={styles.name}>
								<IconWithText
									start
									className={styles.name}
									icon={<HiTag fontSize='18px' color={c.color} />}
									label={c.name}
								/>
							</Title>
						</Flex>
					</ResetLink>
				))}
			{/* <Paginate /> */}
		</Box>
	);
};

export default CategorySearchResults;
