import {Box} from "@mui/material";
import {useState} from "react";
import ToggleTripType from "./ToggleTripType";
import LocationSelector from "./LocationSelector";
import DatePickers from "./DatePickers";

const FlightSearchForm = () => {
    const [tripType, setTripType] = useState("round");
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            maxWidth: "600px",
            margin: "0 auto"
        }}>
            <ToggleTripType tripType={tripType} setTripType={setTripType}/>
            <LocationSelector />
            <DatePickers tripType={tripType} />

        </Box>
    );
}

export default FlightSearchForm