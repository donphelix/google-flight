import React, {useState} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
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

    // Handle search button click
    const handleSearch = async () => {
        console.log("you clicked search button")
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
                {label: "Departure Airports", data: departureResults},
                {label: "Destination Airports", data: destinationResults},
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
            <LocationSelector
                setDeparture={setDeparture}
                setDestination={setDestination}
            />
            <DatePickers tripType={tripType}/>
            <CustomButton text={loading ? <CircularProgress size={24}/> : "Search"} onClick={handleSearch}/>

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
                        <Box key={idx} mb={3}>
                            <Typography variant="h6">{resultGroup.label}</Typography>
                            {resultGroup.data.results && resultGroup.data.results.length > 0 ? (
                                <ul>
                                    {resultGroup.data.results.map((airport) => (
                                        <li key={airport.id}>
                                            {airport.name} - {airport.iataCode} ({airport.country})
                                        </li>
                                    ))}
                                </ul>
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
