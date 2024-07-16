import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function Media(props) {
  const { loading = false } = props;

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        title={
          <Skeleton
            animation="wave"
            height={20}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width={"40%"} />}
      />

      <Skeleton
        sx={{ height: 620, width: 500 }}
        animation="wave"
        variant="rectangular"
      />

      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Facebook() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Media loading />
    </Box>
  );
}
