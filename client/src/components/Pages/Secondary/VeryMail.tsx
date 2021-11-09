import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { FC, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { api } from "api/api.request";

const VerifyMail: FC<{}> = () => {
	const queryString = require("query-string");
	let history = useHistory();
	let location = useLocation();
	const parsed = queryString.parse(location.search);

	useEffect(() => {
		api.user
			.verify(parsed.token)
			.then((res) => {
				console.log(res);
				setTimeout(() => {
					history.push("/login");
				}, 2500);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<Flex direction={FlexDirectionEnum.Vertical} centered fullWidth style={{ height: "100%" }}>
			<Title semantic={TitleVariantEnum.H4}>Votre adresse mail a bien été confirmée.</Title>
		</Flex>
	);
};

export default VerifyMail;
