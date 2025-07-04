import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import {  Box, Container, createTheme, CssBaseline, ThemeProvider,  } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  //const darkMode = true;
  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: (paletteType === 'light' ) ? 'eaeaea' : '#121212'
      }
    }
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // const addProduct = () => {
  //   setProducts([
  //     ...products,
  //     {
  //       id: products.length + 1,
  //       name: "product " + (products.length + 1),
  //       price: products.length + 1 + 100,
  //       description: "Descr",
  //       brand: "B",
  //       type: "d",
  //       pictureUrl: "d",
  //       quantityInStock: 1,
  //     },
  //   ]);
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode 
            ? 'radial-gradient(circle, #1e3aBa, #111B27)'
            : 'radial-gradient(circle, #baecf9, #f0f9ff)',
          py: 6
        }}
      >
        <Container maxWidth="xl" sx={{mt: 8}}>
        <Catalog products={products} />
      </Container>
      </Box>
      
    </ThemeProvider>
  );
}

export default App;
