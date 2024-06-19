import { Star } from "@mui/icons-material";
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Checkbox, Container, Drawer, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Paper, Radio, RadioGroup, Slider, TextField, ThemeProvider, ToggleButton, ToggleButtonGroup, Toolbar, Typography, createTheme } from "@mui/material";
import { brown } from "@mui/material/colors";
import React, { ReactElement, useEffect, useContext, useState } from "react";
import { SortyBy } from "./SortBy";
import { Actions, BottamNav, Context } from "./reducer";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import axios from "axios";
import { Properties } from "@/lib/properties";

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

type RangeSliderProps = {
    sendData: (data: { minPrice: number, maxPrice: number }) => void;
};

const RangeSlider  = ({ sendData }: RangeSliderProps): ReactElement => {

    const [range, setRange] = useState<[number, number]>([0, 100000]);

    useEffect(() => {
        sendData({minPrice: range[0], maxPrice: range[1]});
    }, [range]);

    

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setRange(newValue as [number, number]);
    };

    const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const minValue = event.target.value === '' ? 0 : Number(event.target.value);
        setRange([minValue, range[1]]);
    };

    const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maxValue = event.target.value === '' ? 0 : Number(event.target.value);
        setRange([range[0], maxValue]);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2} sx={{ width: "80%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
                <Grid item xs={12} style={{ marginBottom: "20px" }}>
                    <h5 style={{ marginBottom: "20px" }}>Price Range</h5>
                    <Slider
                        sx={{ color: "#8C684D", marginBottom: "30px", marginLeft: "5px" }}
                        value={range}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10000}
                        valueLabelFormat={(value) => value.toString()}
                    />
                </Grid>
                <div style={{ display: "flex", width: "100%" }}>
                    <Grid item xs={6}>
                        <TextField
                            label="Minimum"
                            variant="outlined"
                            type="number"
                            value={range[0]}
                            onChange={handleMinInputChange}
                            fullWidth
                        />
                    </Grid>
                    <div style={{ justifyContent: "center", color: "grey", fontSize: "25px", marginLeft: "10px", marginRight: "10px" }}> - </div>
                    <Grid item xs={6}>
                        <TextField
                            label="Maximum"
                            variant="outlined"
                            type="number"
                            value={range[1]}
                            onChange={handleMaxInputChange}
                            fullWidth
                        />
                    </Grid>
                </div>
            </Grid>
        </ThemeProvider>
    );
};

const Rating = (): ReactElement => {
    const [selectedRating, setSelectedRatingr] = useState<string | null>(null);

    const handleRatingChange = (event: React.MouseEvent<HTMLElement>, newColor: string | null) => {
        setSelectedRatingr(newColor);
    }
    return (
        <Grid container spacing={2} sx={{ width: "80%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
            <Grid item xs={12}>
                <h5 style={{ marginBottom: "20px" }}>Rating</h5>
                <ToggleButtonGroup
                    value={selectedRating}
                    exclusive
                    onChange={handleRatingChange}
                    aria-label="rating"
                    sx={{ background: 'none', display: 'flex' }}
                >
                    <ToggleButton value="3" style={{ backgroundColor: selectedRating === '3' ? '#8C684D' : '#F8F8F8', color: selectedRating === '3' ? "#fff" : '#000', border: "none", marginRight: '50px', width: '70px', borderRadius: "9px", height: "35px" }}>
                        3 <Star sx={{ color: "#F2C94C" }} ></Star>
                    </ToggleButton>
                    <ToggleButton value="3.5" style={{ backgroundColor: selectedRating === '3.5' ? '#8C684D' : '#F8F8F8', color: selectedRating === '3.5' ? "#fff" : '#000', border: "none", marginRight: '50px', width: '70px', borderRadius: "9px", height: "35px" }}>
                        3.5<Star sx={{ color: "#F2C94C" }} ></Star>
                    </ToggleButton>
                    <ToggleButton value="4" style={{ backgroundColor: selectedRating === '4' ? '#8C684D' : '#F8F8F8', color: selectedRating === '4' ? "#fff" : '#000', border: "none", marginRight: '50px', width: '70px', borderRadius: "9px", height: "35px" }}>
                        4<Star sx={{ color: "#F2C94C" }} ></Star>
                    </ToggleButton>
                    <ToggleButton value="4.5" style={{ backgroundColor: selectedRating === '4.5' ? '#8C684D' : '#F8F8F8', color: selectedRating === '4.5' ? "#fff" : '#000', border: "none", width: '70px', borderRadius: "9px", height: "35px" }}>
                        4.5<Star sx={{ color: "#F2C94C" }} ></Star>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
        </Grid>
    )
};

type CounterProps = {
  sendData: (data: { adultCount: number, childCount: number }) => void;
};

const Counter = ({ sendData }: CounterProps): ReactElement => {

    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);

    useEffect(() => {
        sendData({adultCount, childCount});
    }, [adultCount, childCount]);

    const handleIncrement = () => {
        setAdultCount(adultCount + 1);
    };

    const handleDecrement = () => {
        setAdultCount(Math.max(adultCount - 1, 0));
    };

    const handleIncrementForMattress = () => {
        setChildCount(childCount + 1);
    };

    const handleDecrementForMattress = () => {
        setChildCount(Math.max(childCount - 1, 0));
    };

    return (
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
                <h5 style={{ marginBottom: "20px" }}>Guests Count</h5>

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
                    <div style={{ fontFamily: "Plus Jakarta Sans", fontWeight: "300", fontSize: "18px" }}>No. of Adults</div>
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
                            {adultCount}
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
                    {/* <img src="/images/bed.svg" alt="bed" style={{ height: "50px" }}></img> */}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                        py: 1,
                        overflow: "auto",
                        width: "100%",
                    }}
                >
                    <div style={{ fontFamily: "Plus Jakarta Sans", fontWeight: "300", fontSize: "18px" }}>No of Children
                    </div>
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
                            onClick={handleDecrementForMattress}
                        >
                            -
                        </Button>

                        <Typography variant="h5" sx={{ color: "#8C684D", marginLeft: "10px", marginRight: "10px" }}>
                            {childCount}
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
                            onClick={handleIncrementForMattress}>
                            +
                        </Button>
                    </Box>
                    {/* <img src="/images/mattress.svg" alt="bed" style={{ height: "50px" }}></img> */}
                </Box>
            </Grid>
        </Grid>
    );
};

const Amenties = (): ReactElement => {
    const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

    const handleButtonClick = (buttonId: any) => {
        if (selectedButtons.includes(buttonId)) {
            setSelectedButtons((prevSelected) =>
                prevSelected.filter((id) => id !== buttonId)
            );
        } else {
            setSelectedButtons((prevSelected) => [...prevSelected, buttonId]);
        }
    };

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
                        background: selectedButtons.includes(buttonId) ? "#D2B6A2" : "#D9D9D9",
                        borderRadius: "7.5px",
                    }}
                    color="primary"
                    onClick={() => handleButtonClick(buttonId)}
                >
                    <img src={icons[i - 1]} alt="amenties" style={{ height: "20px", marginRight: "15px" }} />
                    {titles[i - 1]}
                </Button>
            );
        }

        return buttons;
    };


    return (
        <Grid container spacing={2} sx={{ width: "80%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
            <Grid item xs={12} sx={{ width: "100%", marginLeft: "0px" }}>
                <h5 style={{ marginBottom: "20px" }}>Amenties</h5>
                <Grid item container spacing={5} sx={{ marginLeft: "0px" }} style={{ marginBottom: "25px", marginTop: "20px" }} >
                    {renderButtonsInRow(1, 3, ["Swimming Pool", "Wifi", "TV"], ["/images/bed.svg", "/images/bed.svg", "/images/bed.svg"])}
                </Grid>
                <Grid item container spacing={5} sx={{ marginLeft: "0px" }} style={{ marginBottom: "25px" }} >
                    {renderButtonsInRow(2, 2, ["Pets Allowed", "For Large Groups"], ["/images/bed.svg", "/images/bed.svg"])}
                </Grid>
                <Grid item container spacing={5} sx={{ marginLeft: "0px" }}>
                    {renderButtonsInRow(3, 2, ["Swimming Pool", "Swimming Pool"], ["/images/bed.svg", "/images/bed.svg"])}
                </Grid>
            </Grid>

            <Container>
                <Box style={{ display: "flex", }}>
                    <Box
                        style={{
                            marginLeft: 'auto',
                            marginTop: "2px",
                        }}>
                        <Button style={{ borderRadius: "7px", border: "1px solid #5DC5CD", textTransform: "none", color: "#8C684D", height: "30px", background: "rgba(93, 197, 205, 0.10)" }}>See all</Button>
                    </Box>
                </Box>
            </Container>
        </Grid>

    )
};

const AccessibilityFeatures = (): ReactElement => {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleCheckboxChange = (index: number) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(item => item !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

    return (
        <Grid container spacing={2} sx={{ width: "80%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
            <Grid item xs={12}>
                <h5 style={{ marginBottom: "20px" }}>Accessibility Features</h5>
                <FormGroup>
                    {["Step-free guest entrance", "Guest entrance wider than 32 inches", "Accessible parking spot", "Bedroom entrance wider than 32 inches"].map((label, index) => (
                        <FormControlLabel
                            key={index}
                            sx={{
                                width: "100%",
                                height: "35px",
                                background: checkedItems.includes(index) ? "#D2B6A2" : "#EBEBEB",
                                borderRadius: "6.8px",
                                marginBottom: "8px",
                                border: checkedItems.includes(index) ? "1px solid #8C684D" : "0px"
                            }}
                            control={<Checkbox
                                sx={{
                                    color: brown[800],
                                    '&.Mui-checked': {
                                        color: brown[800],
                                    },
                                }}
                                checked={checkedItems.includes(index)}
                                onChange={() => handleCheckboxChange(index)}
                            />}
                            label={label}
                        />
                    ))}
                </FormGroup>
            </Grid>
            <Container>
                <Box style={{ display: "flex", }}>
                    <Box
                        style={{
                            marginLeft: 'auto',
                            marginTop: "2px",
                        }}>
                        <Button style={{ borderRadius: "7px", border: "1px solid #5DC5CD", textTransform: "none", color: "#8C684D", height: "30px", background: "rgba(93, 197, 205, 0.10)" }}>See all</Button>
                    </Box>
                </Box>
            </Container>
        </Grid>
    );
};


const BottomNavButtons = ({onClick}:any): ReactElement => {
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

const PricePerNight = (): ReactElement => {
    return (
        <Grid container spacing={2} sx={{ width: "80%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
            <Grid item xs={12}>
                <h5 style={{ marginBottom: "20px" }}>Price Per Night</h5>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            sx={{ fontFamily: "Plus Jakarta Sans", fontSize: "16px" }}
                            value="10000"
                            control={<Radio
                                sx={{
                                    color: brown[400],
                                    '&.Mui-checked': {
                                        color: brown[400],
                                    },
                                }}
                            />}
                            label="Under ₹10,000"
                        />
                        <FormControlLabel
                            sx={{ fontFamily: "Plus Jakarta Sans", fontSize: "16px" }}
                            value="20000"
                            control={<Radio
                                sx={{
                                    color: brown[400],
                                    '&.Mui-checked': {
                                        color: brown[400],
                                    },
                                }}
                            />}
                            label="₹10,000 - ₹20,000"
                        />
                        <FormControlLabel
                            sx={{ fontFamily: "Plus Jakarta Sans", fontSize: "16px" }}
                            value="35000"
                            control={<Radio
                                sx={{
                                    color: brown[400],
                                    '&.Mui-checked': {
                                        color: brown[400],
                                    },
                                }}
                            />}
                            label="₹20,000 - ₹35,000"
                        />
                        <FormControlLabel
                            sx={{ fontFamily: "Plus Jakarta Sans", fontSize: "16px" }}
                            value="50000"
                            control={<Radio
                                sx={{
                                    color: brown[400],
                                    '&.Mui-checked': {
                                        color: brown[400],
                                    },
                                }}
                            />}
                            label="₹35,000 - ₹50,000"
                        />
                        <FormControlLabel
                            sx={{ fontFamily: "Plus Jakarta Sans", fontSize: "16px" }}
                            value="60000"
                            control={<Radio
                                sx={{
                                    color: brown[400],
                                    '&.Mui-checked': {
                                        color: brown[400],
                                    },
                                }}
                            />}
                            label="More than ₹50,000"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
};

const FilterPage = (): ReactElement => {
    const { state, dispatch } = useContext(Context);
    const {villas }= state;
    // const [dateRange, setDateRange] = useState([null, null]);
    // const [endDate, setEndDate] = useState<Date | undefined>();
    // const [startDate, setStartDate] = useState<Date | undefined>();
    // const handleDateChange = (newDateRange: any) => {
    //     if (newDateRange[0]) {
    //         setStartDate(new Date(newDateRange[0]));
    //     }
    //     if (newDateRange[1]) {
    //         setEndDate(new Date(newDateRange[1]));
    //     }
    // };
    const [receivedData, setReceivedData] = useState<any>({});
    const receiveDataFromChild = (data:any) => {
      setReceivedData({...receivedData, ...data});
    };

    useEffect(() => {
    }, [receivedData]);

    const getPropertiesByFilters = async () => {
        try {
            const response = await new Properties().getPropertiesByFilters(receivedData);
            console.log(response);

            
                // dispatch({
                //     type: Actions.SET_FILTER_DATA,
                //     data: { startDate: "", endDate: "", Area: "Multiple Areas", GuestCount: 2 },
                //     villa: {}
                // })
                dispatch({
                    type: Actions.SHOW_HIDE_FILTER_PAGE,
                    data: false,
                    villa: {},
                    villas: response.data
                })
                dispatch({
                    type: Actions.SET_ACTIVE_PAGE,
                    data: { activePage: BottamNav.SEARCH, activeValue: 1 },
                    villa: {},
                    villas: response.data
                })
            
        } catch(error) {
            console.log('Error getting properties by filters:', error);
        }
    }


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
                                    type: Actions.SHOW_HIDE_FILTER_PAGE,
                                    data: false,
                                    villa: {},
                                    villas:villas
                                })
                            }} ></img>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "20px", textAlign: "center", marginRight: "60px", color: "#101010", fontStyle: "Plus Jakarta Sans", fontWeight: 300 }}>
                            Filters
                        </Typography>

                    </Toolbar>
                </AppBar>
               

                {/* <Container sx={{ marginTop: "10px" }}>
                    <Rating></Rating>
                </Container> */}

                {/* <Container sx={{ marginTop: "10px" }}>
                    <SortyBy></SortyBy>
                </Container> */}

                <Container sx={{ marginTop: "100px" }}>
                    <Counter sendData={receiveDataFromChild} ></Counter>
                </Container>

                {/* <Grid
                    container
                    spacing={2}
                    sx={{
                        width: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto",
                    }}
                >
                     <h5 style={{ marginBottom: "20px" }}>Select Dates</h5>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateRangePicker']}>
                            <DateRangePicker
                                localeText={{ start: 'Check-in', end: 'Check-out' }}
                                value={[dateRange[0], dateRange[1]]}
                                onChange={handleDateChange}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid> */}

                <Container sx={{ marginTop: "10px" }}>
                    <RangeSlider sendData={receiveDataFromChild}></RangeSlider>
                </Container>

                {/* <Container sx={{ marginTop: "10px" }}>
                    <Amenties></Amenties>
                </Container> */}

                {/* <Container>
                    <AccessibilityFeatures></AccessibilityFeatures>
                </Container> */}

                {/* <Container>
                    <PricePerNight></PricePerNight>
                </Container> */}

                <Container>
                    <BottomNavButtons onClick={getPropertiesByFilters} ></BottomNavButtons>
                </Container>
            </Box>
        </>
    )
};

export const FilterDrawer = (): ReactElement => {
    const { state, dispatch } = useContext(Context);
    const { showFilterPage, villas } = state;
    return (
        <Drawer
            variant="temporary"
            open={showFilterPage}
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
            <FilterPage></FilterPage>
        </Drawer>
    )
};
