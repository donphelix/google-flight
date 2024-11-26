import React from "react";
import {Box, Typography} from "@mui/material";
import FlightSearchForm from "./FlightSearchForm";

const FlightSearch = () => {
    return (
        <Box sx={{backgroundColor: "#121212", color: "white", minHeight: "100hv", padding: "2rem"}}>
            <Box sx={{textAlign: "center", marginBottom: "2rem"}}>
                <Typography variant="h2" sx={{fontWeight: "bold"}}>
                    Flights
                </Typography>
            </Box>
            <FlightSearchForm />
        </Box>
    );
}

export default FlightSearch;