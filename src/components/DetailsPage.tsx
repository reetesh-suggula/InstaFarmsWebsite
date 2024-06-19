import { AddBox, FavoriteBorderOutlined, FavoriteRounded, LocationOnRounded, ShareOutlined, Star } from "@mui/icons-material";
import { Card as JoyCard, Typography as JoyTypography } from '@mui/joy';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Container, Drawer, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import React, { ReactElement, useContext, useState } from "react";
import { Actions, Context } from "./reducer";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import axios from "axios";
import moment from "moment";


const data =
{
  src: '/images/villa2.webp',
  title: 'The Villa Theme Farm1',
  description: 'Hyderabad, Telnagana, India',
  price: "₹3,599 /night",
  liked: true,
}

const BottomNavButtons = (): ReactElement => {
  const { state, dispatch } = useContext(Context);
  let { villa } = state;
  const [bedscount, setBedsCount] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startDate, setStartDate] = useState<Date | undefined>();
  // const [detailedVilla, setDetailedVilla] = useState<any>();
  const fetchDetailedData = async () => {
    try {
      const url = `${process.env.API_URL}/hotelsinfo/hoteldetailadvanced?hotelId=${villa.hotelId}&checkIn=${moment(startDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss')}&checkOut=${moment(endDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss')}&discount=0`;
      console.log('URL:', url);
      const response = await axios.get(url);
      return response.data;
      // setDetailedVilla(response.data);
      // console.log('Properties:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateChange = (newDateRange: any) => {
    if (newDateRange[0]) {
      setStartDate(new Date(newDateRange[0]));
    }
    if (newDateRange[1]) {
      setEndDate(new Date(newDateRange[1]));
    }
  };

  const handleIncrement = () => {
    setBedsCount(bedscount + 1);
  };

  const handleDecrement = () => {
    setBedsCount(Math.max(bedscount - 1, 0));
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
        <Grid
          container
          spacing={2}
          sx={{
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Grid item xs={12}>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between", // Aligns items at the start and end of the container
                alignItems: "center",
                gap: 1,
                py: 1,
                overflow: "auto",
                width: "100%",
              }}
            >
              <div style={{ fontFamily: "Plus Jakarta Sans", fontWeight: "300", fontSize: "18px" }}>No. of Persons</div>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  style={{
                    color: "#8C684D",
                    border: "1px solid #8C684D",
                    minWidth: "20px",
                    minHeight: "20px",
                    height: "35px",
                    width: "35px"
                  }}
                  onClick={handleDecrement}>
                  -
                </Button>
                <Typography variant="h5" sx={{ color: "#8C684D", marginLeft: "10px", marginRight: "10px" }}>
                  {bedscount}
                </Typography>
                <Button
                  variant="outlined"
                  style={{
                    color: "#8C684D",
                    border: "1px solid #8C684D",
                    minWidth: "20px",
                    minHeight: "20px",
                    height: "35px",
                    width: "35px"
                  }}
                  onClick={handleIncrement}>
                  +
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between", // Aligns items at the start and end of the container
                alignItems: "center",
                gap: 1,
                py: 1,
                overflow: "auto",
                width: "100%",
              }}
            >
              <div style={{ fontFamily: "Plus Jakarta Sans", fontWeight: "300", fontSize: "18px" }}>Pick Dates</div>
              <div style={{ width: '300px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateRangePicker']}>
                    <DateRangePicker
                      localeText={{ start: 'Check-in', end: 'Check-out' }}
                      value={[dateRange[0], dateRange[1]]}
                      onChange={handleDateChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </Box>
          </Grid>
        </Grid>

        <BottomNavigation
          showLabels
          sx={{ justifyContent: 'end' }}
        >

          <BottomNavigationAction icon={<Button onClick={async () => {
            // const data = await fetchDetailedData();
            // console.log('Data:', data);
            // if (startDate && endDate && bedscount > 0) {
            //     await fetchDetailedData().then((data) => {
            //         const detailedData = {...data, hotelId:villa.hotelId}
            //         console.log('Detailed Villa:', data);
            //         dispatch({
            //             type: Actions.SHOW_HIDE_BOOKINGS_PAGE,
            //             data: { startDate: startDate, endDate: endDate, GuestCount: bedscount, Area: "" },
            //             villa: detailedData
            //         })
            //     })
            // }
          }}
            style={{ color: 'white', fontStyle: "Plus Jakarta Sans", fontWeight: "700", background: "#8C684D", textTransform: "none" }}><a href="https://wa.me/917337290693?text=I'm%20interested%20in%20your%20car%20for%20sale" style={{textDecoration:'none', color:'inherit'}}>Enquire</a></Button>} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

const Description = (): ReactElement => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const { state, dispatch } = useContext(Context);
  const { villa } = state;

  const renderButtonsInRow = (rowNumber: number, buttonCount: number, titles: string[], icons: string[]) => {
    const buttons = [];

    for (let i = 1; i <= buttonCount; i++) {
      const buttonId: string = `row${rowNumber}-button${i}`;
      buttons.push(
        <Button
          key={buttonId}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
            marginRight: "15px",
            color: "black",
            border: "0px",
            background: "#F5F5FFB2",
            borderRadius: "7.5px",
          }}
          color="primary"
        >
          <img src={icons[i - 1]} alt="amenties" style={{ height: "20px", marginRight: "15px" }} />
          {titles[i - 1]}
        </Button>
      );
    }

    return buttons;
  };


  return (
    <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
      <Grid item xs={12} sx={{ width: "100%", marginLeft: "0px" }}>
        <h5 style={{ marginBottom: "20px" }}>Description</h5>
        <p style={{ color: "#878787", fontSize: "15px" }}>The Villa Theme Farm house, Hyderabad, Telangana, India is a modern farm house. elegant 5 star hotel looking with the swimming pool<Button style={{ textTransform: "none", color: "#8C684D", fontWeight: "bold" }}>Read More...</Button></p>
        <Grid item container spacing={5} sx={{ marginLeft: "0px" }} style={{ marginBottom: "25px", marginTop: "20px" }} >
          {renderButtonsInRow(1, 3, ["Free Wifi", "Free Breakfast", "TV"], ["/images/wifi.svg", "/images/coffee.svg", "/images/wifi.svg"])}
        </Grid>
        <Grid item container spacing={5} sx={{ marginLeft: "0px" }} style={{ marginBottom: "25px" }} >
          {renderButtonsInRow(1, 3, ["Free Wifi", "Free Breakfast", "TV"], ["/images/wifi.svg", "/images/coffee.svg", "/images/wifi.svg"])}
        </Grid>
      </Grid>
    </Grid>

  )
};

const About = (): ReactElement => {
  const { state, dispatch } = useContext(Context);
  const { villa } = state;
  return (
    <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
      <Grid item xs={12} sx={{ width: "100%", marginLeft: "0px" }}>
        <h5 style={{ marginBottom: "20px" }}>About location’s neighborhood</h5>
        <p style={{ color: "#878787", fontSize: "14px" }}>This cabin comes with Smart Home System and beautiful viking style. You can see sunrise in the morning with City View from full Glass Window.
          <br />
          This unit is surrounded by business district of West Surabaya that offers you the city life as well as wide range of culinary.
          <br />
          This apartment equipped with Washing Machine, Electric Stove, Microwave, Refrigerator, Cutlery.</p>
      </Grid>
    </Grid>
  )
};

const FarmFacilitiees = (): ReactElement => {
  const { state, dispatch } = useContext(Context);
  const { villa } = state;
  const amenities = [
    { src: "/images/ac.svg", alt: "ac", text: "Air Conditioner" },
    { src: "/images/kitchen.svg", alt: "kitchen", text: "Kitchen" },
    { src: "/images/parking.svg", alt: "parking", text: "Free Parking" },
    { src: "/images/wifi.svg", alt: "wifi", text: "Free Wifi" },
  ];

  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  };
  const center = {
    lat: 7.2905715,
    lng: 80.6337262,
  };

  const AmenityItem = (props: { src: string, alt: string, text: string }) => (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      <img src={props.src} alt={props.alt} style={{ marginRight: "8px" }} />
      <div>{props.text}</div>
    </div>
  );

  return (
    <>
      <Container>
        <Box style={{ marginTop: "20px", display: "flex", }}>
          <h5 style={{ marginBottom: "20px" }}>Farm facilities</h5>
          <Box
            style={{
              marginLeft: 'auto',
              marginTop: "2px",
            }}>
            <Button style={{ textTransform: "none", color: "#8C684D", height: "30px" }}>See all facilities</Button>
          </Box>
        </Box>
        {amenities.map((amenity, index) => (
          <AmenityItem key={index} {...amenity} />
        ))}
      </Container>

    </>
  )
};

const DetailsCards = () => {
  const { state, dispatch } = useContext(Context);
  const { villa } = state;
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        width: "100%",
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >

      <JoyCard size="sm" key={data.title} variant='plain' sx={{ marginTop: "50px", width: "100%", background: "none", position: "relative" }}>
        <img
          srcSet={`${villa?.hotelImages?.length > 0 ? villa.hotelImages[0] : data.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
          src={`${villa?.hotelImages?.length > 0 ? villa.hotelImages[0] : data.src}?h=120&fit=crop&auto=format`}
          alt={data.title}
          style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", height: "250px" }}
        />
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 80,
            zIndex: 2,
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "5px",
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          }}
        >
          <ShareOutlined></ShareOutlined>
        </div>
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 30,
            zIndex: 2,
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "5px",
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          }}
        >
          {data.liked && (<FavoriteRounded style={{ color: "red" }} />)}
          {!data.liked && (<FavoriteBorderOutlined />)}
        </div>

        <Box sx={{ whiteSpace: 'nowrap', mx: 1, marginTop: 'auto' }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <JoyTypography level="title-md" sx={{ fontSize: "15px" }}>{data.title}</JoyTypography>
            <div style={{ marginLeft: "200px", background: "#EBEBEC", padding: "8px", borderRadius: "4px", display: "flex", alignItems: "center" }}>
              <Star style={{ color: "#ffd33b", marginRight: "4px" }}></Star>
              <div>5.0</div>
            </div>
          </div>
          <JoyTypography level="body-sm" style={{ marginRight: "200px" }}> <LocationOnRounded style={{ color: "#8C684D" }}></LocationOnRounded>{data.description}</JoyTypography>
        </Box>

      </JoyCard>

    </Box>
  );
};

const AccordionExpandIcon = () => {
  const { state, dispatch } = useContext(Context);
  const { villa } = state;
  const accordionData = [
    { question: "Is there swimming pool access?", answer: "Yes" },
    { question: "How does food taste here?", answer: "Good" },
    { question: "How does food taste here?", answer: "Good" },
    { question: "How does food taste here?", answer: "Good" },
    { question: "How does food taste here?", answer: "Good" },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
        <Grid item xs={12} sx={{ width: "100%", marginLeft: "0px" }}>
          <h5 style={{ marginBottom: "20px" }}>FAQs</h5>
        </Grid>
      </Grid>
      <div style={{ borderRadius: "10px", background: "#F7F7FB", height: "300px", overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {accordionData.map((item, index) => (
          <Accordion key={index} sx={{ width: "95%", marginBottom: "5px" }}>
            <AccordionSummary
              expandIcon={<AddBox sx={{ color: "#BFBFBF" }}></AddBox>}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

const Details = (): ReactElement => {
  const { state, dispatch } = useContext(Context);
  const { villa, villas } = state;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ background: "white", boxShadow: "none" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="default"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src="/images/close.svg" alt="close" onClick={() => {
                dispatch({
                  type: Actions.SHOW_HIDE_DETAILS_PAGE,
                  data: false,
                  villa: {},
                  villas: villas
                })
              }} ></img>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "20px", textAlign: "center", marginRight: "60px", color: "#101010", fontStyle: "Plus Jakarta Sans", fontWeight: 300 }}>
              Details
            </Typography>
          </Toolbar>
        </AppBar>

        <Container>
          <DetailsCards></DetailsCards>
        </Container>

        <Container>
          <Description></Description>
        </Container>

        <Container>
          <FarmFacilitiees></FarmFacilitiees>
        </Container>

        <Container>
          <About></About>
        </Container>

        <Container>
          <AccordionExpandIcon></AccordionExpandIcon>
        </Container>

        <Container>
          <BottomNavButtons></BottomNavButtons>
        </Container>

      </Box>
    </>
  )
};

export const DetailsPage = (props: any): ReactElement => {
  const { state, dispatch } = useContext(Context);
  const { showDetailsPage, villa, villas } = state;
  return (
    <Drawer
      variant="temporary"
      open={showDetailsPage}
      onClose={() => dispatch({
        type: Actions.SHOW_HIDE_FILTER_PAGE,
        data: false,
        villa: {},
        villas: villas
      })}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "100%" },
      }}
    >
      <Details></Details>
    </Drawer>
  )
};


