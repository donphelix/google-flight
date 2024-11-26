import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./styles/theme";
import FlightSearch from "./components/FlightSearch/FlightSearch";

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <FlightSearch/>
    </ThemeProvider>
);

export default App;
