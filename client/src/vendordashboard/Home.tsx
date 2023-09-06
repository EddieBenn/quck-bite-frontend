import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import Sidenav from "../components/dashboard/sidenav"
import Navbar from "../components/dashboard/Navbar"
import AccordionDash from "../components/dashboard/Accordion"
import Grid from '@mui/material/Grid';
import "../styles/Dash.css"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AreaChart from "../charts/AreaChart";
import CountUp from 'react-countup';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getVendorRevenue } from "../slices/totalRevenueSlice";
import { getVendorOrders } from "../slices/totalOrdersSlice";
import { getVendorEarnings } from "../slices/totalEarningSlice";

export default function VendorHome() {
    const dispatch = useAppDispatch();

    const { vendorRevenue, isLoading } = useAppSelector((state) => state.vendorRevenue)
    const { vendorOrders } = useAppSelector((state) => state.vendorOrders)
    const { vendorEarning } = useAppSelector((state) => state.vendorEarning)

    console.log(isLoading)
    useEffect(() => {
        dispatch(getVendorOrders())
        dispatch(getVendorRevenue())
        dispatch(getVendorEarnings())
    }, [dispatch])


    const getOrders = vendorOrders//?.map((item) => item.orders)
    const getEarnings = vendorEarning//?.map((item) => item.earnings)
    const getRevenue = vendorRevenue//?.map((item) => item.revenue)

    return (
        <>
            <div className="bgColor">
                <Navbar />
                <Box height={70} />
                <Box sx={{ display: "flex" }}>
                    <Sidenav />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Stack spacing={2} direction="row">
                                    <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradient">
                                        <CardContent>
                                            <div className="iconstyle">
                                                <CreditCardIcon />
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffffff" }}>
                                                ₦<CountUp delay={0.2} end={getEarnings} duration={0.6} />
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                                                Total Earning
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradientlight">
                                        <CardContent>
                                            <div className="iconstyle">
                                                <LocalMallIcon />
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffffff" }}>
                                                <CountUp delay={0.2} end={getOrders} duration={0.6} />
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                                                Total Orders
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack spacing={2}>
                                    <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradient">
                                        <CardContent>
                                            <div className="iconstyle">
                                                <LocalMallIcon />
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffffff" }}>
                                                ₦<CountUp delay={0.2} end={getRevenue} duration={0.6} />
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                                                Total Revenue
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Box height={20} />
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Card sx={{ height: 60 + "vh" }}>
                                    <CardContent>
                                        <AreaChart />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{ height: 60 + "vh" }}>
                                    <CardContent>
                                        <div className="paddingall">
                                            <span className="pricetitle">Popular Products</span>
                                        </div>
                                        <AccordionDash />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </>
    )
}



