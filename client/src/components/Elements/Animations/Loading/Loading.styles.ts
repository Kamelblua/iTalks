import { makeStyles } from "@material-ui/core";
import { LoadingProps } from "./Loading";

const useStyles = makeStyles({
	dot: {
		height: (props: LoadingProps) => (props.radius ? `${props.radius}px` : "10px"),
		width: (props: LoadingProps) => (props.radius ? `${props.radius}px` : "10px"),
		borderRadius: "50%",
		marginLeft: (props: LoadingProps) => (props.radius ? `${(props.radius / 10) * 5}px` : "3px"),
		opacity: 1,
		background: (props: LoadingProps) => props.color ?? "var(--purple)",
	},
	first: {
		animation: "$blink .5s infinite alternate",
		animationDelay: "0s",
	},
	second: {
		animation: "$blink .5s infinite linear alternate",
		animationDelay: ".25s",
	},
	third: {
		animation: "$blink .5s infinite alternate",
		animationDelay: ".5s",
	},
	"@keyframes blink": {
		"0%": {
			opacity: 1,
		},
		"50%": {},
		"100%": {
			opacity: 0.2,
		},
	},
});

export { useStyles };

/*

animatedItemExiting: {
    animation: `$myEffectExit 3000ms ${theme.transitions.easing.easeInOut}`,
    opacity: 0,
    transform: "translateY(-200%)"
},
"@keyframes myEffect": {
    "0%": {
        opacity: 0,
        transform: "translateY(-200%)"
    },
    "100%": {
        opacity: 1,
        transform: "translateY(0)"
    }
},

*/
