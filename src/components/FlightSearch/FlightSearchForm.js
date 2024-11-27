import React, {useState} from "react";
import {Box, Typography, CircularProgress, List, ListItem, ListItemText} from "@mui/material";
import ToggleTripType from "./ToggleTripType";
import LocationSelector from "./LocationSelector";
import DatePickers from "./DatePickers";
import CustomButton from "../Shared/CustomButton";
import {searchAirports} from "../../services/flightService";

const FlightSearchForm = () => {
    const [tripType, setTripType] = useState("round");
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!departure || !destination) {
            setError("Please provide both departure and destination locations.");
            return;
        }

        setLoading(true);
        setError("");
        setResults([]);

        try {
            const departureResults = await searchAirports(departure);
            const destinationResults = await searchAirports(destination);

            setResults([
                {label: "Departure Airports", data: departureResults.data},
                {label: "Destination Airports", data: destinationResults.data},
            ]);
        } catch (err) {
            setError("Failed to fetch airport data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
                maxWidth: "600px",
                margin: "0 auto",
            }}
        >
            {/* Existing Components */}
            <ToggleTripType tripType={tripType} setTripType={setTripType}/>
            <LocationSelector setDeparture={setDeparture} setDestination={setDestination}/>
            <DatePickers tripType={tripType}/>

            {/* Search Button */}
            <CustomButton
                text={loading ? <CircularProgress size={24}/> : "Search"}
                onClick={handleSearch}
            />

            {/* Error Message */}
            {error && (
                <Typography color="error" variant="body1" mt={2}>
                    {error}
                </Typography>
            )}

            {/* Results Section */}
            {results.length > 0 && (
                <Box mt={4} width="100%">
                    {results.map((resultGroup, idx) => (
                        <Box key={idx} mb={4}>
                            <Typography variant="h6" mb={2}>
                                {resultGroup.label}
                            </Typography>
                            {resultGroup.data.length > 0 ? (
                                <List>
                                    {resultGroup.data.map((item, index) => (
                                        <ListItem key={index} divider>
                                            <ListItemText
                                                primary={`${item.presentation.title} (${item.skyId})`}
                                                secondary={`${item.presentation.subtitle} - ${item.navigation.localizedName}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography>No results found.</Typography>
                            )}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default FlightSearchForm;
