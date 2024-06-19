import { Star } from "@mui/icons-material";
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Checkbox, Container, Drawer, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Paper, Radio, RadioGroup, Slider, TextField, ThemeProvider, ToggleButton, ToggleButtonGroup, Toolbar, Typography, createTheme } from "@mui/material";
import { brown } from "@mui/material/colors";
import React, { ReactElement, useEffect, useContext, useState } from "react";
import { Actions, BottamNav, Context } from "./reducer";
import { Properties } from "@/lib/properties";
import axios from "axios";

const backgroundImageUrl = '/images/arrow.svg';

const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        thumb: {
          width: '30px',
          height: '30px',
          borderRadius: "0px",
          border: "1px solid #8C684D",
          backgroundClip: "transparent",
          backgroundColor: "white",
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "5px",
          backgroundPositionY: "8.5px"
        },
      },
    },
  },
});


const BottomNavButtons = ({ onClick }: any): ReactElement => {
  const { dispatch } = useContext(Context);
  const value = 23;
  return (
    <Box sx={{ pb: 7 }}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
        <BottomNavigation
          showLabels
          sx={{ justifyContent: 'end' }}
        >
          {/* <BottomNavigationAction icon={<Button sx={{ textTransform: "none", color: "#5DC5CD" }}>Clear All</Button>} /> */}
          <BottomNavigationAction icon={<Button onClick={onClick} style={{ color: 'white', fontStyle: "Plus Jakarta Sans", fontWeight: "700", background: "#8C684D", textTransform: "none" }}>Show Results</Button>} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

const Locations = (props: any): ReactElement => {
  const [areas, setAreas] = useState<string[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  React.useEffect(() => {
    setAreas(props.areas);
    setFilteredLocations(props.areas);
    console.log("reetesh", props.areas)
  }, [props.areas]);
  const [searchTerm, setSearchTerm] = useState("");

  const { state, dispatch } = useContext(Context);
  const { villas } = state;


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if(searchTerm === "") {
      setFilteredLocations(areas);
    } else {
      const filtered = filteredLocations.filter((location: any) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchTerm]);

  const handleLocationClick = (location: any) => {
    console.log("location", location);
    console.log("villas", villas);
    const filteredVillas = villas.filter((villa: any) => villa.area === location.id);
    console.log("filteredVillas", filteredVillas);
    dispatch({
      type: Actions.SHOW_HIDE_LOCATIONS_DRAWER,
      data: false,
      villa: {},
      villas: filteredVillas
  })
  dispatch({
      type: Actions.SET_ACTIVE_PAGE,
      data: { activePage: BottamNav.SEARCH, activeValue: 1 },
      villa: {},
      villas: filteredVillas
  })
  }

  return (
    <div style={{width:'100%'}}>

      <TextField
        label="Search Locations"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: "100%"}}
      />
        {filteredLocations.map((location:any) => (
          <div style={{background: "#fcfcf3", height: '30px',
        }} key={location.id} onClick={()=>handleLocationClick(location)}> 
            <div style={{marginLeft:'30px', top:'5px'}}>
              {location.name}
              </div>
          </div>
        ))}
    </div>
  );
};

const FilterPage = (props: any): ReactElement => {
  const { state, dispatch, } = useContext(Context);
  const { villas } = state;

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
                  type: Actions.SHOW_HIDE_LOCATIONS_DRAWER,
                  data: false,
                  villa: {},
                  villas: villas
                })
              }} ></img>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "20px", textAlign: "center", marginRight: "60px", color: "#101010", fontStyle: "Plus Jakarta Sans", fontWeight: 300 }}>
              Locations
            </Typography>

          </Toolbar>
        </AppBar>

        <Container sx={{ marginTop: "100px" }}>
          <Locations areas={props.areas} ></Locations>
        </Container>

        {/* <Container>
          <BottomNavButtons></BottomNavButtons>
        </Container> */}
      </Box>
    </>
  )
};

export const LocationsFilterDrawer = (props: any): ReactElement => {
  const { state, dispatch } = useContext(Context);
  const { showLocationsDrawer, villas } = state;
  return (
    <Drawer
      variant="temporary"
      open={showLocationsDrawer}
      onClose={() => dispatch({
        type: Actions.SHOW_HIDE_LOCATIONS_DRAWER,
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
      <FilterPage areas={props.areas}></FilterPage>
    </Drawer>
  )
};
