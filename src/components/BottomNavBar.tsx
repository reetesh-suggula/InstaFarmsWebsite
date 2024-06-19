import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import { HomeNavBtn } from "./BottomNavButtons/HomeNav";
import { SearchNavBtn } from "./BottomNavButtons/SearchNav";
import { BookMarkNavBtn } from "./BottomNavButtons/BookMarkNav";
import { ProfileNavBtn } from "./BottomNavButtons/ProfileNav";
import { Actions, BottamNav, Context } from "./reducer";
import { useContext } from "react";

export const BottomNavBar = () => {
    const { state, dispatch } = useContext(Context);
    const { activePage } = state;

    return (
        <Box sx={{ pb: 7 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={activePage.activeValue}
                    onChange={(event, newValue) => {
                        switch (newValue) {
                            case 0:
                                dispatch({
                                    type: Actions.SET_ACTIVE_PAGE,
                                    data: { activePage: BottamNav.HOME, activeValue: 0 },
                                    villa:{},
                                    villas:[],
                                });
                                break;
                            case 1:
                                dispatch({
                                    type: Actions.SET_ACTIVE_PAGE,
                                    data: { activePage: BottamNav.SEARCH, activeValue: 1 },
                                    villa:{},
                                    villas:[]
                                });
                                break;
                            case 2:
                                dispatch({
                                    type: Actions.SET_ACTIVE_PAGE,
                                    data: { activePage: BottamNav.BOOKMARK, activeValue: 2 },
                                    villa:{},
                                    villas:[]
                                });
                                break;
                            case 3:
                                dispatch({
                                    type: Actions.SET_ACTIVE_PAGE,
                                    data: { activePage: BottamNav.PROFILE, activeValue: 3 },
                                    villa:{},
                                    villas:[],
                                });
                                break;
                            default:
                                dispatch({
                                    type: Actions.SET_ACTIVE_PAGE,
                                    data: { activePage: BottamNav.HOME, activeValue: 0 },
                                    villa:{},
                                    villas:[]
                                });
                        }
                    }}
                >
                    <BottomNavigationAction onClick={
                        () => {
                            dispatch({
                                type: Actions.SHOW_HIDE_MENU_PAGE,
                                data: false,
                                villa:{},
                                villas:[]
                            })

                        }} icon={<HomeNavBtn></HomeNavBtn>} />
                    <BottomNavigationAction icon={<SearchNavBtn></SearchNavBtn>} />
                    <BottomNavigationAction icon={<BookMarkNavBtn></BookMarkNavBtn>} />
                    <BottomNavigationAction onClick={() => {
                        dispatch({
                            type: Actions.SHOW_HIDE_MENU_PAGE,
                            data: true,
                            villa:{},
                            villas:[]
                        })
                    }} icon={<ProfileNavBtn></ProfileNavBtn>} />
                </BottomNavigation>
            </Paper>
        </Box>
    )
};
