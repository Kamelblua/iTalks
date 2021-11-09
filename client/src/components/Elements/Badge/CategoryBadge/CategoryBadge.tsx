import { Box } from "@material-ui/core";
import { CategoryShort } from "api/types/category";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { FC } from "react";
import { useStyles } from "./CategoryBadge.styles";

interface CategoryBadgeProps {
	category: CategoryShort;
}

const CategoryBadge: FC<CategoryBadgeProps> = ({ category }) => {
	const styles = useStyles({ color: category.color, text_color: category.text_color });

	return (
		<ResetLink to={"/category/" + category.name}>
			<Box className={styles.container}>{category.name}</Box>
		</ResetLink>
	);
};

export default CategoryBadge;
