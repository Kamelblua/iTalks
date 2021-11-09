import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	alert: {
		position: "fixed",
		top: "35px",
		right: "25px",
		paddingRight: "50px",
		maxWidth: "45%",
		width: "25%",
	},
	alertShow: {
		animation: "fadeIn 0.4s both",
	},
	alertHidden: {
		display: "none!important",
	},
});

export { useStyles };

/**
 * 
@keyframes fadeIn {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
 */
