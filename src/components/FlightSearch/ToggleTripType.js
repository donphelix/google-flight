import React from "react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

const ToggleTripType = ({tripType, setTripType}) => {

    const handleTripTypeChange = (event, newTripType) => {
        if (newTripType) {
            setTripType(newTripType);
        }
    }

    return (
        <ToggleButtonGroup value={tripType} exclusive onChange={handleTripTypeChange}
                           sx={{backgroundColor: "#1e1e1e", borderRadius: "8px"}}>

            <ToggleButton value="round" sx={{color: "white"}}>Round trip</ToggleButton>
            <ToggleButton value="oneway" sx={{color: "white"}}>One way</ToggleButton>

        </ToggleButtonGroup>
    );
};


export default ToggleTripType;