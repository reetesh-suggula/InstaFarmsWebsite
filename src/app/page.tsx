
"use client"
// import Image from 'next/image'
import { useContext } from 'react';
import styles from './page.module.css'
// import { Login } from './login'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'
// import {app, auth} from './firebase/firebase';
// import { useRouter } from 'next/navigation';
// import { useEffect, useReducer } from 'react'
// import { Navbar } from '@/app/components/pages/NavBar/navbar';
// import { ComponentReducer, Context, InitialComponentState } from '@/components/reducer';
import Script from 'next/script';
import { Actions, BottamNav, Context } from '@/components/reducer';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { ChooseLocation } from '@/components/ChooseLocation';
import { CarouselImg, Display } from '@/components/Carousel';
import { SearchFarm } from '@/components/SearchFarm';
import { Headings } from '@/components/Headings';
import { Destinations } from '@/components/Destinations';
import { CardsComponent } from '@/components/CardsComponent';
import { SearchVillas } from '@/components/SearchVillas';
import { FooterMobile } from '@/components/MobileFooter';
import { BottomNavBar } from '@/components/BottomNavBar';
import { FilterDrawer } from '@/components/FilterDrawer';
import { DetailsPage } from '@/components/DetailsPage';
import { BookingsPage } from '@/components/BookingsPage';
import React from 'react';
import { CommonData } from '@/lib/commondata';
import axios from 'axios';
import UserDetails from '@/components/UserDetails';
import { LocationsFilterDrawer } from '@/components/LocationsDrawer';


export default function Home() {
  const { state, dispatch } = useContext(Context);
  const { villas } = state;
  const { showMenuPage, activePage } = state;
  const [states, setStates] = React.useState<string[]>([]);
  const [stateAreas, setStateAreas] = React.useState<any[]>([]);
  const commonData = new CommonData();
  const [location, setLocation] = React.useState({ latitude: 0.0, longitude: 0.0 });
  const [placeName, setPlaceName] = React.useState('');
  const [selectedState, setSelectedState] = React.useState('');
  const [locationvillas, setVillas] = React.useState();



  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  // React.useEffect(() => {
  //   if (location) {
  //     getPlaceName(location.latitude, location.longitude);
  //   }
  // }, [location]);

  const getPlaceName = async (latitude: any, longitude: any) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&key=AIzaSyDnPSTq9O6N5AZpPIKDZsRtPINDr1bowzg`);
      const data = await response.json();
      const formattedAddress = data.results[0]?.address_components[0]?.long_name;
      console.log(formattedAddress);
      setPlaceName(formattedAddress);
    } catch (error) {
      console.log('Error getting place name:', error);
    }
  };

  const getLocationText = () => {
    if (placeName) {
      return placeName;
    } else {
      return 'Fetching location...';
    }
  };

  React.useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/locations/areas`);
        setStateAreas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleClick = (id: any) => {
    console.info(`You clicked ${id}`);
    console.log(stateAreas?.[id]);
    setSelectedState(id);
    // props.emitEvent(selectedIndex);
  };

  const selectedArea = async (area: any) => {
    console.log(`You clicked ${area}`);
    const url = `${process.env.API_URL}/hotelsinfo/grouphotelsbylocation?location=${area}, ${selectedState}`;
    console.log('URL:', url);
    const properties = await axios.get(url);
    console.log('Properties:', properties.data);
    dispatch({
      type: Actions.SET_ACTIVE_PAGE,
      data: { activePage: BottamNav.SEARCH, activeValue: 1 },
      villa: {},
      villas: properties.data
    });
    setVillas(properties.data);
  };


  const seeLocations = () => {
    dispatch({
      type: Actions.SHOW_HIDE_LOCATIONS_DRAWER,
      data: true,
      villa: {},
      villas: []
    });
  }

  const seeVillas = () => {
    dispatch({
      type: Actions.SET_ACTIVE_PAGE,
      data: { activePage: BottamNav.SEARCH, activeValue: 1 },
      villa: {},
      villas: villas
    })
  }

  return (
    <main className={styles.main}>
      {/* <Script type="text/javascript" src="https://otpless.com/auth.js" data-cid="80Q4TB1U4ILZ77B7LCVIJGGR11GVU6NY" async />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/> */}
      {/* <Login/> */}
      {/* <Navbar/> */}
      {activePage.activePage === BottamNav.HOME &&
        <><Container>
          {/* <ChooseLocation states={states} onClick={handleClick} /> */}
          <br></br>
          <br></br>
          <br></br>
        </Container><Container>
            <CarouselImg display={Display.BODY}></CarouselImg>
          </Container><Container>
            <SearchFarm></SearchFarm>
          </Container><Headings
            title="Pick Your Destination"
            onclick={seeLocations}
          ></Headings><Container>
            <Destinations areas={stateAreas} onClick={selectedArea}></Destinations>
          </Container><Headings
            title="Top Rated Farms"
            onclick={seeVillas}
          ></Headings><Container>
            <CardsComponent></CardsComponent>
          </Container>
          {/* <Headings
            title="Nearby your location"
          ></Headings>
          <Container>
            <CardsComponent></CardsComponent>
          </Container><Headings
            title="Nearby your location"
          ></Headings><Container>
            <CardsComponent></CardsComponent>
          </Container> */}
        </>
      }

      {activePage.activePage === BottamNav.SEARCH &&
        <>
          <SearchVillas villas={villas} ></SearchVillas>
        </>
      }

      <Headings
        title="Looking for Events"
        hideButton={true}
      ></Headings>

      <Container>
        <CarouselImg display={Display.FOOTER}></CarouselImg>
      </Container>

      <Container>
        <Box style={{ marginTop: "20px" }}>
          <div style={{ textTransform: "none", fontWeight: "bolder", fontSize: "20px", marginBottom: "10px" }}>List Your Villa Farm with Us</div>
        </Box>
      </Container>


      <div style={{ display: "flex" }}>
        <div style={{ background: "#5DC5CD", width: "60%", height: "150px", borderTopRightRadius: "50px", borderBottomRightRadius: "50px" }}>
          <p style={{ color: "#fff", width: "90%", marginLeft: "20px", marginTop: "5px", fontStyle: "Plus Jakarta Sans", fontWeight: "700", textAlign: "left", left: 20, fontSize: "15px" }}>Join our network of happy owners and turn your farm into a high-revenue holiday destination!</p>
          <Button style={{ color: 'white', fontStyle: "Plus Jakarta Sans", fontWeight: "700", background: "#8C684D", width: "40%" }}>List Now</Button>
        </div>
        <img src="/images/listgif.gif" alt="gif" style={{ width: "50%", height: "150px" }} ></img>
      </div>

      <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
        <img src="/images/footer.png" alt="footer" style={{ width: "100%", height: "700px" }}></img>
        <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '80%' }}>
          <FooterMobile></FooterMobile>
        </div>
      </div>

      <Container>
        <BottomNavBar></BottomNavBar>
      </Container>

      <FilterDrawer></FilterDrawer>
      <DetailsPage></DetailsPage>
      <BookingsPage></BookingsPage>
      <UserDetails></UserDetails>
      <LocationsFilterDrawer areas={stateAreas}></LocationsFilterDrawer>
    </main>
  )
}

