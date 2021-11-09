// React
import { memo, useState } from "react";

// Providers
import { HelmetProvider } from "react-helmet-async";
import { ThemeContext } from "providers/ThemeContext";
import ThemeProvider from "providers/ThemeProvider";

import { BrowserRouter as Router } from "react-router-dom";

import Routes from "routes/Main.routes";
import { Box } from "@material-ui/core";
import moment from "moment";
import "moment/locale/fr";
import { AlertContext, AlertContextVariantEnum } from "providers/AlertContext";
import Alert from "components/Modules/Alert/Alert";

moment.locale("fr");

const App = memo(() => {
	const [theme, setTheme] = useState(ThemeProvider.getClientTheme());

	const [alert, setAlert] = useState({
		message: "Succes!",
		variant: AlertContextVariantEnum.Info,
		shouldDisplay: false,
	});

	return (
		<HelmetProvider>
			<ThemeContext.Provider value={{ theme, setTheme }}>
				<AlertContext.Provider value={{ alert, setAlert }}>
					<Box className={`${theme}`} height='100vh' minHeight='500px' overflow='auto'>
						<Router>
							<Routes />
						</Router>
					</Box>
					<Alert />
				</AlertContext.Provider>
			</ThemeContext.Provider>
		</HelmetProvider>
	);
});

export default App;
