import * as React from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";

export default function AlertVariants(props) {
  return (
    <Box
      sx={{
        position: "fixed", // Ensures that the alert sticks to the viewport
        bottom: 30, // Places the alert at the bottom of the viewport
        left: 30, // Aligns the alert to the left of the viewport
        height: "80px",
        display: "flex",
        width: "400px",
      }}
    >
      <Alert variant="solid">{props.text}</Alert>
    </Box>
  );
}
