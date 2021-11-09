import { Box, Button, TextField, Grid, useTheme } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { api } from "api/api.request";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useStyles } from "./PostForm.styles";
import { AxiosError } from "axios";
import { useHistory } from "react-router-dom";
import { Category } from "api/types/category";
import Select from "react-select";

function getStyles(name: Category, personName: Category[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

const PostForm: FC<{}> = () => {
	const styles = useStyles();
	// Hook form

	const { register, handleSubmit } = useForm();
	const [errors, setErrors] = useState<any>({});
	const [categories, setCategories] = useState<any>([]);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
	let history = useHistory();

	const changeTable = (e: any) => {
		console.log(e);
		setSelectedCategory(e);
	};

	const onSubmit = (data: any) => {
		data.categories = [selectedCategory!.id];

		api.post
			.create(data)
			.then((res) => {
				if (res.status === 201) {
					history.push("/");
				}
			})
			.catch((err: AxiosError) => {
				if (err.response?.data.errors) {
					setErrors(err.response?.data.errors);
				}
			});
	};

	useEffect(() => {
		api.category
			.all()
			.then((res) => {
				console.log(res);
				setCategories(res.data);
				setSelectedCategory(res.data[0]);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<Box>
			<Title semantic={TitleVariantEnum.H3}>Publier un post</Title>

			<form style={{ color: "var(--bg)" }} className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							{...register("title")}
							error={typeof errors.title !== "undefined"}
							name='title'
							variant='outlined'
							required
							fullWidth
							id='title'
							label='Titre'
							autoFocus
							InputLabelProps={{
								classes: {
									root: styles.inputLabel,
								},
							}}
							InputProps={{
								classes: {
									root: styles.input,
								},
							}}
						/>
						<span className={styles.error}>{errors.title ? errors.title[0] : ""}</span>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register("text")}
							error={typeof errors.text !== "undefined"}
							variant='outlined'
							required
							fullWidth
							id='text'
							label='Contenu'
							name='text'
							multiline
							InputLabelProps={{
								classes: {
									root: styles.inputLabel,
								},
							}}
							InputProps={{
								classes: {
									root: styles.input,
								},
							}}
						/>
						<span className={styles.error}>{errors.text ? errors.text[0] : ""}</span>
					</Grid>
				</Grid>

				{categories.length > 0 && selectedCategory && (
					<Select
						isSearchable={false}
						styles={{
							container: (provided) => ({
								...provided,
								width: "150px",
								color: "var(--bg) !important",
								margin: "15px 0px",
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
								color: "var(--bg) !important",
							}),
							singleValue: (provided, state) => ({
								...provided,
								color: "var(--bg) !important",
							}),
							group: (provided, state) => ({
								...provided,
								color: "var(--bg) !important",
							}),
						}}
						value={{ value: selectedCategory, label: selectedCategory.name }}
						onChange={changeTable}
						options={categories}
					/>
				)}

				<Button type='submit' fullWidth variant='contained' color='primary' className={styles.submit}>
					Publier
				</Button>
			</form>
		</Box>
	);
};

export default PostForm;
