import { Box } from "@mui/material"
import Sidenav from "../components/dashboard/sidenav"
import Navbar from "../components/dashboard/Navbar"
import ProductList from "./Products/ProductList"

export default function Products() {
    return (
        <>
            <Navbar />
            <Box height={70} />
            <Box sx={{ display: "flex" }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <ProductList />
                </Box>
            </Box>
        </>
    )
}


