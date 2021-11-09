import { FC } from "react";
import { Category as CategoryType } from "api/types/category";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import Title from "components/Elements/Typograhpy/Title/Title";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { HiTag } from "react-icons/hi";
import { useStyles } from "./CategoryShort.styles";

export interface CategoryProps {
	category: CategoryType;
}

const CategoryShort: FC<CategoryProps> = ({ category }) => {
	const styles = useStyles({ color: category.color });

	return (
		<Flex
			className={styles.container}
			direction={FlexDirectionEnum.Horizontal}
			align={FlexAlignEnum.Center}
			justify={FlexJustifyEnum.SpaceBetween}
		>
			<HiTag className={styles.categoryTag} color={category.color} />
			<Flex width='80%' direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
				<Flex direction={FlexDirectionEnum.Vertical}>
					<ResetLink to={"/category/" + category.name} color='var(--link-hover)'>
						<Title semantic={TitleVariantEnum.H4}>{category.name}</Title>
					</ResetLink>
					<span>{category.description}</span>
				</Flex>
			</Flex>
			<Flex direction={FlexDirectionEnum.Vertical}>
				<Title semantic={TitleVariantEnum.H5}>{category.post_count.toString()}</Title>
				<span>Posts</span>
			</Flex>
		</Flex>
	);
};

export default CategoryShort;
