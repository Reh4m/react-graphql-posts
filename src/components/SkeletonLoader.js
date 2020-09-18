import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
  },
}));

function SkeletonLoader() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Skeleton variant="rect" height={118} />
      <Skeleton />
      <Skeleton width="60%" />
    </div>
  );
}

export default SkeletonLoader;
