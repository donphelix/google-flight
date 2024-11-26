import {Box, TextField} from "@mui/material";

const DatePickers = ({tripType}) => {
    return (
        <Box sx={{display: "flex", gap: "1rem", width: "100%"}}>
            <TextField
                type="date"
                label="Departure"
                InputLabelProps={{shrink: true, style: {color: "#aaa"}}}
                InputProps={{
                    style: {color: "white", backgroundColor: "#1e1e1e"},
                }}
                sx={{flex: 1}}
            />
            {tripType === "round" && (
                <TextField
                    type="date"
                    label="Return"
                    InputLabelProps={{shrink: true, style: {color: "#aaa"}}}
                    InputProps={{
                        style: {color: "white", backgroundColor: "#1e1e1e"},
                    }}
                    sx={{flex: 1}}
                />
            )}

        </Box>
    );
}

export default DatePickers;