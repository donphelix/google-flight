import React from "react";
import {Button} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const CustomButton = ({text}) => {
    return (
        <Button
            variant="contained"
            startIcon={<SearchIcon/>}
            sx={{
                backgroundColor: "#1a73e8",
                color: "white",
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
            }}
        >
            {text}
        </Button>
    );
};

export default CustomButton;
