import React from "react";
import {Grid, TextField} from "@mui/material";

const LocationSelector = ({setDeparture, setDestination}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Where From?"
                    variant="outlined"
                    onChange={(e) => setDeparture(e.target.value)}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Where To?"
                    variant="outlined"
                    onChange={(e) => setDestination(e.target.value)}
                    required
                />
            </Grid>
        </Grid>
    );
};

export default LocationSelector;
