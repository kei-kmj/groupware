import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type IconPanelProps = {
  icon: React.ReactNode;
  label: string;
  link: string;
}

export const IconPanel: React.FC<IconPanelProps> = ({ icon, label, link }) => {
  return (<Grid item xs={0}>
    <Paper elevation={3} style={{ height: "200px", width: "200px" }}>
      <Link to={link}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          {icon}
          <Typography variant="subtitle1">{label}</Typography>
        </Box>
      </Link>
    </Paper>
  </Grid>);
}