import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/dist/shared/lib/router/router";
import "../styles/globals.css";
import theme from "../src/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
