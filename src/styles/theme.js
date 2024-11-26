import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark", // Dark theme
        primary: {
            main: "#1a73e8", // Custom blue color
        },
        background: {
            default: "#121212", // Dark background
            paper: "#1e1e1e",
        },
        text: {
            primary: "#ffffff",
            secondary: "#aaa",
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h3: {
            fontWeight: "bold",
        },
        button: {
            textTransform: "none", // Prevent uppercase text in buttons
        },
    },
});

export default theme;
