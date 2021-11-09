import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    unfollow: {
        margin: '10px',
        borderColor: 'var(--info)',
        color: "white"
        ,
        '&:hover': {
            background: "var(--danger)",
        }
    }
});

export { useStyles };