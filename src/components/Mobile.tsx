import { LocationOn } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { ReactElement, useContext } from "react";
import { BottomNavBar } from "./BottomNavBar";
import { CardsComponent } from "./CardsComponent";
import { CarouselImg, Display } from "./Carousel";
import { ChooseLocation } from "./ChooseLocation";
import { Destinations } from "./Destinations";
import { DetailsPage } from "./DetailsPage";
import { FilterDrawer } from "./FilterDrawer";
import { Headings } from "./Headings";
import { FooterMobile } from "./MobileFooter";
import { SearchFarm } from "./SearchFarm";
import { SearchVillas } from "./SearchVillas";
import { MenuPage } from "./pages/Menu";
import { Actions, BottamNav, Context } from "./reducer";
import { BookingsPage } from "./BookingsPage";

export const MobileApp = (): ReactElement => {
    const { state, dispatch } = useContext(Context);
    const { showMenuPage, activePage, villas } = state;

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                
                <AppBar position="fixed" style={{ background: "white", borderRadius: "10px" }}>
                    <img src="/images/instafarmlogo.svg" alt=""></img>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="default"
                            aria-label="menu"
                            onClick={() => dispatch({
                                type: Actions.SHOW_HIDE_MENU_PAGE,
                                data: true,
                                villa:{},
                                villas:villas
                            })}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon sx={{ zIndex: 2000 }}></MenuIcon>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black", fontSize: "16px" }}>
                            <LocationOn style={{ color: "#8C684D" }}></LocationOn>
                            Location
                        </Typography>
                        <img src="/images/instafarmlogo.svg" alt=""></img>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        variant="temporary"
                        open={showMenuPage}
                        onClose={() => dispatch({
                            type: Actions.SHOW_HIDE_MENU_PAGE,
                            data: false,
                            villa:{},
                            villas:villas
                        })}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "100%" },
                        }}
                    >
                        <MenuPage></MenuPage>
                    </Drawer>
                </nav>
            </Box>

            {activePage.activePage === BottamNav.HOME &&
                <><Container>
                    <ChooseLocation />
                </Container><Container>
                        <CarouselImg display={Display.BODY}></CarouselImg>
                    </Container><Container>
                        <SearchFarm></SearchFarm>
                    </Container><Headings
                        title="Pick Your Destination"
                    ></Headings><Container>
                        <Destinations></Destinations>
                    </Container><Headings
                        title="Nearby your location"
                    ></Headings><Container>
                        <CardsComponent></CardsComponent>
                    </Container><Headings
                        title="Nearby your location"
                    ></Headings><Container>
                        <CardsComponent></CardsComponent>
                    </Container><Headings
                        title="Nearby your location"
                    ></Headings><Container>
                        <CardsComponent></CardsComponent>
                    </Container></>
            }

            {activePage.activePage === BottamNav.SEARCH &&
                <>
                    <SearchVillas></SearchVillas>
                </>
            }

            <Headings
                title="Looking for Events"
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
                    <p style={{ color: "#fff", width: "90%", marginLeft: "20px", marginTop: "5px", fontStyle: "Plus Jakarta Sans", fontWeight: "700", textAlign: "left", left: 20, fontSize:"15px"}}>Join our network of happy owners and turn your farm into a high-revenue holiday destination!</p>
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
        </div>
    );
};
