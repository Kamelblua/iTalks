import { Box } from "@material-ui/core";
import { api } from "api/api.request";
import auth from "api/auth";
import { StatResult } from "api/types/stat";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import Stat from "components/Submodules/Stat/Stat";
import { FC, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import {
	HiAnnotation,
	HiChatAlt,
	HiColorSwatch,
	HiHashtag,
	HiLightningBolt,
	HiOutlineTag,
	HiUserCircle,
} from "react-icons/hi";

const Dashboard: FC<{}> = () => {
	const [stats, setStats] = useState<StatResult>({
		badges: -1,
		users: -1,
		categories: -1,
		comments: -1,
		posts: -1,
		resources: -1,
		roles: -1,
		sent_messages: -1,
		statuses: -1,
	});
	useEffect(() => {
		api.stat
			.all()
			.then((res) => {
				console.log(res.data);
				setStats(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<Box>
			<Title semantic={TitleVariantEnum.H3}>Bienvenue {auth.getUsername()}.</Title>

			<Flex direction={FlexDirectionEnum.Horizontal} flexWrap='wrap'>
				<Stat stat={stats?.users} label='Utilisateur(s)' icon={<HiUserCircle />} />
				<Stat stat={stats?.comments} label='Commentaire(s)' icon={<HiChatAlt />} />
				<Stat stat={stats?.posts} label='Post(s)' icon={<HiAnnotation />} />
				<Stat stat={stats?.badges} label='Badge(s)' icon={<HiColorSwatch />} />
				<Stat stat={stats?.categories} label='Catégorie(s)' icon={<HiOutlineTag />} />
				<Stat stat={stats?.resources} label='Resource(s)' icon={<FiImage />} />
				<Stat stat={stats?.statuses} label='Statut(s)' icon={<HiHashtag />} />
				<Stat stat={stats?.roles} label='Role(s)' icon={<HiLightningBolt />} />
			</Flex>
		</Box>
	);
};

export default Dashboard;
