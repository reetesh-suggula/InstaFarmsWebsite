import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Card, CardContent, CardMedia, Container, Divider, Drawer, Grid, IconButton, Paper, Rating, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, useTheme } from "@mui/material";
import React, { ReactElement, useContext } from "react";
import { Actions, BottamNav, Context } from "./reducer";
import { LogIn } from "./Login";
import moment from "moment";
import axios from "axios";

const BottomNavButtons = (): ReactElement => {
    const { state, dispatch } = useContext(Context);
    const { showBookingsPage, userLoggedIn, villa, showMenuPage } = state;

    const paymentHandler = async () => {
        const orderDetails = await axios.post(`${process.env.API_URL}/payment/orders?amount=${villa.rate}`);
        console.log(orderDetails);
        var options = {
            "key": "rzp_test_4E89JRRxUmZ6DH", // Enter the Key ID generated from the Dashboard
            "amount": villa.rate * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "InstaFarms", //your business name
            "description": "Test Transaction",
            "image": "/images/logo.png",
            "order_id": orderDetails.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "yeswanth", //your customer's name
                "email": "yeswanth@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "handler": async function (response: any) {
                const body = { ...response };
                const validateorder = await axios.post(`${process.env.API_URL}/payment/order/validate`, body);
                const stayflexiBookingDetails = {
                    "checkin": villa.checkIn,
                    "checkout": villa.checkOut,
                    "hotelId": villa.hotelId,
                    "bookingStatus": "CONFIRMED",
                    "bookingSource": "STAYFLEXI_OD",
                    "roomStays": [
                        {
                            "numAdults": showBookingsPage.GuestCount,
                            "numChildren": 0,
                            "numChildren1": 0,
                            "roomTypeId": villa.roomTypeId,
                            "ratePlanId": villa.ratePlanId
                        }
                    ],
                    "ctaId": "",
                    "customerDetails": {
                        "firstName": "Stayflexi",
                        "lastName": "Test",
                        "emailId": "test.stayflexi@gmail.com",
                        "phoneNumber": "+919999999999",
                        "country": "",
                        "city": "",
                        "zipcode": "",
                        "address": "",
                        "state": ""
                    },
                    "paymentDetails": {
                        "sellRate": villa.rate,
                        "roomRate": villa.rate,
                        "payAtHotel": true
                    },
                    "promoInfo": {},
                    "specialRequests": "",
                    "requestToBook": false,
                    "isAddOnPresent": true,
                    "posOrderList": [],
                    "isInsured": true,
                    "refundableBookingFee": 0,
                    "appliedPromocode": "",
                    "promoAmount": 0,
                    "bookingFees": 0,
                    "isEnquiry": false
                };
                console.log(stayflexiBookingDetails);
                const finalBooking = await axios.post(`${process.env.API_URL}/hotelsInfo/perform-booking`, stayflexiBookingDetails);

                console.log(finalBooking.data);
                dispatch({
                    type: Actions.SET_ACTIVE_PAGE,
                    data: { activePage: BottamNav.HOME, activeValue: 0 },
                    villa:{},
                    villas: []
                });
                dispatch({
                    type: Actions.SHOW_HIDE_FILTER_PAGE,
                    data: false,
                    villa: {},
                    villas: []
                });
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response: any) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    };
    return (
        <Box sx={{ pb: 7 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div style={{ marginLeft: "25px", marginTop: "10px", textTransform: "none" }}>Pre-Book your meals</div>
                    <Switch sx={{ marginRight: "12px", marginTop: "10px" }} /></div>
                <BottomNavigation
                    showLabels
                >
                    <BottomNavigationAction icon={<Button id='rzp-button1' onClick={paymentHandler} style={{ color: 'white', fontStyle: "Plus Jakarta Sans", fontWeight: "700", background: "#8C684D", textTransform: "none", width: "320%" }}>Book now</Button>} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export const BookingsPage = (props: any) => {
    const { state, dispatch } = useContext(Context);
    const { showBookingsPage, userLoggedIn, villa, activePage  } = state;

    React.useEffect(() => {
        console.log("Bookings Page", villa)
        console.log("Bookings Page", showBookingsPage)
    }, [villa, showBookingsPage]);
    return (
        <Drawer
            variant="temporary"
            open={showBookingsPage.GuestCount > 0 && activePage.activePage !== BottamNav.HOME }
            onClose={() => dispatch({
                type: Actions.SHOW_HIDE_BOOKINGS_PAGE,
                data: false,
                villa: {},
                villas: []
            })}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "100%" },
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" style={{ background: "white", boxShadow: "none" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="default"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                dispatch({
                                    type: Actions.SHOW_HIDE_BOOKINGS_PAGE,
                                    data: false,
                                    villa: {},
                                    villas: []
                                })
                            }}
                        >
                            <img src="/images/back.svg" ></img>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Card sx={{ display: 'flex', marginTop: "100px", height: "150px", boxShadow: "none" }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 131, height: 130, marginLeft: "10px", borderRadius: "15px" }}
                            image="/images/villa2.webp"
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <div style={{ display: "flex" }}>
                                    <Typography component="div" variant="h5">
                                        ABC Farm
                                    </Typography>
                                    <div style={{ fontSize: "15px", textTransform: "none", color: "#8C684D", fontWeight: "bold", marginLeft: "80px" }}>₹3,599 /night</div>
                                </div>
                                <Typography sx={{ marginTop: "10px" }} variant="subtitle1" color="text.secondary" component="div">
                                    Hyderabad, India
                                </Typography>
                                <div style={{ display: "flex", marginTop: "10px" }}>
                                    <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
                                    <div style={{ fontSize: "13px", marginTop: "3px", marginLeft: "5px", fontWeight: "bold" }}>5.0 (243)</div></div>
                            </CardContent>
                        </Box>
                    </Card>
                </Container>

                <Divider sx={{ borderBottom: "5px solid #EBEBEB", width: "90%", margin: "auto" }}></Divider>

                <Container>
                    <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
                        <Grid item xs={12} sx={{ width: "100%", marginLeft: "0px" }}>
                            <h5 style={{ marginBottom: "20px" }}>Your Trip</h5>
                            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                <div style={{ fontSize: "16px", fontWeight: "bold" }}>Dates</div>
                                <div style={{ fontWeight: "bold", marginRight: "50px", textDecoration: 'underline', color: "#8C684D" }}>Edit</div>
                            </div>
                            <p style={{ fontSize: "14px", color: "grey" }}>{moment(showBookingsPage.startDate).format('D')}- {moment(showBookingsPage.endDate).format('D MMM')}</p>

                            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                <div style={{ fontSize: "16px", fontWeight: "bold" }}>Guests</div>
                                <div style={{ fontWeight: "bold", marginRight: "50px", textDecoration: 'underline', color: "#8C684D" }}>Edit</div>
                            </div>
                            <p style={{ fontSize: "14px", color: "grey" }}>{showBookingsPage.GuestCount} guests</p>
                        </Grid>
                    </Grid>
                </Container>

                <Divider sx={{ borderBottom: "5px solid #EBEBEB", width: "90%", margin: "auto" }}></Divider>

                <Container>
                    <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
                        <Grid item xs={12} sx={{ width: "100%", marginLeft: "0px" }}>
                            <h5 style={{ marginBottom: "20px" }}>Price Details</h5>
                            <TableContainer component={Paper} sx={{ borderBottom: "0px", boxShadow: "none" }}>
                                <Table aria-label="spanning table">
                                    <TableRow>
                                        <TableCell sx={{ padding: "0px", borderBottom: "0px", borderTop: "none", boxShadow: "none" }}>Total</TableCell>
                                        <TableCell align="right" sx={{ borderBottom: "0px", borderTop: "none", boxShadow: "none" }}>{villa.rate}</TableCell>
                                    </TableRow>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    {/* <TableRow>
                                        <TableCell sx={{ padding: "0px", borderBottom: "none", borderTop: "none", boxShadow: "none" }}>Meals</TableCell>
                                        <TableCell align="right" sx={{ borderBottom: "none", borderTop: "none", boxShadow: "none" }}>₹10,529.42</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ padding: "0px", borderBottom: "none", borderTop: "none", boxShadow: "none" }}>Discounts</TableCell>
                                        <TableCell align="right" sx={{ borderBottom: "none", borderTop: "none", boxShadow: "none" }}>-₹3,529.42</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell sx={{ padding: "0px" }}>Taxes</TableCell>
                                        <TableCell align="right">₹3,000</TableCell>
                                    </TableRow> */}
                                    {/* <TableRow sx={{ borderBottom: "none", borderTop: "none", boxShadow: "none" }}>
                                        <TableCell sx={{ padding: "0px", borderBottom: "none", borderTop: "none", boxShadow: "none", fontWeight: "bold" }}>Total (INR)</TableCell>
                                        <TableCell align="right" sx={{ borderBottom: "none", borderTop: "none", boxShadow: "none", fontWeight: "bold" }}>
                                            ₹34,529.42
                                            <div style={{ textDecoration: "underline", color: "#8C684D" }}>More Info</div>
                                        </TableCell>
                                    </TableRow> */}

                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Container>

                <Divider sx={{ borderBottom: "5px solid #EBEBEB", width: "90%", margin: "auto" }}></Divider>
                {/* <Container sx={{ marginBottom: "120px" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                        {!userLoggedIn && <LogIn isBookingPage={true}></LogIn>}
                    </Box>
                </Container> */}
            </Box>
            <Container>
                <BottomNavButtons></BottomNavButtons>
            </Container>
        </Drawer>
    )
};
