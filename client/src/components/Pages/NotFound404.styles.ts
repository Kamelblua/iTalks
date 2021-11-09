import { makeStyles } from "@material-ui/core";

const rand: number = Math.floor(Math.random() * (1 - 0 + 1) + 0);
const fileName: string = rand ? "404_engineer.svg" : "404_works.svg";

const useStyles = makeStyles({
	container: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundImage: "url('/assets/images/" + fileName + "')",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	},
});

export { useStyles };
