import React, {useState} from "react";
import {Box, Typography, CircularProgress, List, ListItem, ListItemText} from "@mui/material";
import ToggleTripType from "./ToggleTripType";
import LocationSelector from "./LocationSelector";
import DatePickers from "./DatePickers";
import CustomButton from "../Shared/CustomButton";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {Icon} from "leaflet";
import {searchAirports} from "../../services/flightService";

const FlightSearchForm = () => {
    const [tripType, setTripType] = useState("round");
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [mapData, setMapData] = useState([]); // For map markers
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!departure || !destination) {
            setError("Please provide both departure and destination locations.");
            return;
        }

        setLoading(true);
        setError("");
        setResults([]);
        setMapData([]);

        try {
            const departureResults = await searchAirports(departure);
            const destinationResults = await searchAirports(destination);

            setResults([
                {label: "Departure Airports", data: departureResults.data},
                {label: "Destination Airports", data: destinationResults.data},
            ]);

            // Extract map data from the API response (destination airports only for simplicity)
            const mapData = destinationResults.data.map((item) => ({
                skyId: item.skyId,
                title: item.presentation.title,
                subtitle: item.presentation.subtitle,
                coordinates: {
                    lat: parseFloat(item.navigation.relevantFlightParams.lat), // Add lat/lng params from your API
                    lng: parseFloat(item.navigation.relevantFlightParams.lng),
                },
                price: `$${Math.floor(Math.random() * 500) + 50}`, // Simulated price
            }));

            setMapData(mapData);
        } catch (err) {
            setError("Failed to fetch airport data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Leaflet custom marker icon
    const customMarkerIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Example pin icon
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

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
                                                secondary={`${item.presentation.subtitle}`}
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

            {/* Map Section */}
            {mapData.length > 0 && (
                <Box mt={4} width="100%" height="400px">
                    <Typography variant="h6" mb={2}>
                        Destination Map
                    </Typography>
                    <MapContainer
                        center={[mapData[0].coordinates.lat, mapData[0].coordinates.lng]}
                        zoom={5}
                        style={{height: "400px", width: "100%"}}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {mapData.map((location, idx) => (
                            <Marker
                                key={idx}
                                position={[location.coordinates.lat, location.coordinates.lng]}
                                icon={customMarkerIcon}
                            >
                                <Popup>
                                    <strong>{location.title}</strong>
                                    <br/>
                                    {location.subtitle}
                                    <br/>
                                    Price: {location.price}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </Box>
            )}
        </Box>
    );
};

export default FlightSearchForm;
