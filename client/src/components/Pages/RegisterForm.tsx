// React
import { FC, useContext, useState } from "react";
// Api interface
import { api } from "api/api.request";
// Types
import { AxiosError } from "axios";
import { FlexDirectionEnum, FlexAlignEnum } from "components/Elements/Layout/Flex/Flex.d";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { useStyles } from "./RegisterForm.styles";
// Librairies
import { useForm } from "react-hook-form";
import { IconButton } from "@material-ui/core";
import { FaUserCircle } from "react-icons/fa";
import { HiAtSymbol, HiEye, HiEyeOff } from "react-icons/hi";
// Components
import Flex from "components/Elements/Layout/Flex/Flex";
import FormControl from "components/Elements/Form/FormControl/FormControl";
import Title from "components/Elements/Typograhpy/Title/Title";
import Button from "components/Elements/Buttons/Button/Button";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { useHistory } from "react-router-dom";
import { AlertContext, AlertContextVariantEnum } from "providers/AlertContext";

interface RegisterError {
	username?: string;
	email?: string;
	password?: string;
	password_confirmation?: string;
}

const RegisterForm: FC<{}> = () => {
	const styles = useStyles();
	const { alert, setAlert } = useContext(AlertContext);
	let history = useHistory();
	// Hook form
	const { register, handleSubmit } = useForm();
	// States
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<RegisterError>({});
	const [loading, setLoading] = useState(false);
	// Custom methods
	const onSubmit = (data: any) => {
		setLoading(true);
		api.user
			.register(data)
			.then((res) => {
				setAlert({ ...alert, message: res.data.message, variant: AlertContextVariantEnum.Info, shouldDisplay: true });
				if (res.status === 201) {
					history.push("/login");
				}
			})
			.catch((err: AxiosError) => {
				if (err.response?.data.errors) {
					setErrors(err.response?.data.errors);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const changePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	// Custom components
	const PasswordIcon: FC<{}> = () => {
		return (
			<IconButton className={styles.icon} onClick={changePasswordVisibility}>
				{showPassword ? <HiEyeOff /> : <HiEye />}
			</IconButton>
		);
	};

	return (
		<Flex direction={FlexDirectionEnum.Horizontal} height='100%'>
			<Flex className={styles.leftContainer} direction={FlexDirectionEnum.Vertical} centered>
				<Title className={styles.title} semantic={TitleVariantEnum.H3}>
					Inscription
				</Title>
				<form className={styles.form} noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
					<FormControl
						error={typeof errors.username !== "undefined"}
						label="Nom d'utilisateur"
						type='text'
						identifier='username'
						register={register}
						startIcon={<FaUserCircle />}
					></FormControl>
					<span className={styles.error}>{errors.username ? errors.username[0] : ""}</span>
					<FormControl
						error={typeof errors.email !== "undefined"}
						label='Adresse mail'
						type='text'
						identifier='email'
						register={register}
						startIcon={<HiAtSymbol />}
					></FormControl>
					<span className={styles.error}>{errors.email ? errors.email[0] : ""}</span>
					<FormControl
						error={typeof errors.password !== "undefined"}
						label='Mot de passe'
						type={showPassword ? "text" : "password"}
						identifier='password'
						register={register}
						endIcon={<PasswordIcon />}
					></FormControl>
					<span className={styles.error}>{errors.password ? errors.password[0] : ""}</span>
					<FormControl
						error={typeof errors.password_confirmation !== "undefined"}
						label='Confirmation du mot de passe'
						type={showPassword ? "text" : "password"}
						identifier='password_confirmation'
						register={register}
					></FormControl>
					<span className={styles.error}>{errors.password_confirmation ? errors.password_confirmation[0] : ""}</span>
					<Flex
						className={styles.submitContainer}
						direction={FlexDirectionEnum.Horizontal}
						align={FlexAlignEnum.Center}
					>
						<Button disabled={loading} label="S'inscrire" type='submit' />{" "}
						<ResetLink className={styles.registerLink} to='/login'>
							Déjà inscrit ?
						</ResetLink>
					</Flex>
				</form>
			</Flex>
			<Flex className={styles.rightContainer} direction={FlexDirectionEnum.Vertical} centered>
				<img width='70%' src='/assets/images/register_imagination.svg' alt='authentification' />
			</Flex>
		</Flex>
	);
};

export default RegisterForm;
