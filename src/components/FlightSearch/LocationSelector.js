import React from "react";
import {Autocomplete, Box, TextField} from "@mui/material";

const locations = ["Nairobi", "Kisumu", "Nanyuki", "Mombasa", "Eldoret"];

const LocationSelector = () => {
    return (
        <Box sx={{width: "100%"}}>
            <Autocomplete
                options={locations}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Where from?"
                        variant="outlined"
                        InputLabelProps={{style: {color: "#aaa"}}}
                        InputProps={{
                            ...params.InputProps,
                            style: {color: "white", backgroundColor: "#1e1e1e"},
                        }}
                    />
                )}
                sx={{marginBottom: "1rem"}}
            />
            <Autocomplete
                options={locations}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Where to?"
                        variant="outlined"
                        InputLabelProps={{style: {color: "#aaa"}}}
                        InputProps={{
                            ...params.InputProps,
                            style: {color: "white", backgroundColor: "#1e1e1e"},
                        }}
                    />
                )}
            />
        </Box>
    );
};

export default LocationSelector;
