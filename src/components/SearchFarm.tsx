import { SearchOutlined } from "@mui/icons-material";
import { Box, Button, Typography, alpha, styled } from "@mui/material";
import { ReactElement, useContext } from "react";
import { Actions, BottamNav, Context } from "./reducer";

const StyledDiv = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const FilterImage = styled("img")(({ theme }) => ({
    marginLeft: "auto",
}));

export const SearchFarm = (): ReactElement => {
    const { state, dispatch } = useContext(Context);
    const { filterData, activePage, villas } = state;
    const { Area, startDate, endDate, GuestCount } = filterData;

    return (
        <Box style={{ marginTop: "10px" }} onClick={() => {
            dispatch({
                type: Actions.SHOW_HIDE_FILTER_PAGE,
                data: true,
                villa: {},
                villas: villas
            });
        }}>
            <Button style={{ border: "0.5px solid #878787", width: "100%", padding: "13px 14.583px 14.583px 14.583px", borderRadius: "10px" }}>
                {(Area === "" || activePage.activePage == BottamNav.HOME) && (
                    <>
                        <StyledDiv style={{ color: "#878787" }}>
                            <SearchIconWrapper>
                                <SearchOutlined></SearchOutlined>
                                <div style={{ textTransform: "none", fontSize: "17px" }}>Search Farm</div>
                            </SearchIconWrapper>
                            
                        </StyledDiv>
                    </>
                )}
                {Area !== "" && activePage.activePage === BottamNav.SEARCH && (
                    <>
                        <Typography sx={{ color: "black", mb: 0, marginLeft: "-5px", height: "45px", fontFamily: "Plus Jakarta Sans", fontWeight: 500 }} color="text.secondary">
                            {Area}
                        </Typography>
                        <Typography variant="inherit" color="text.secondary" sx={{ marginLeft: "-136px", fontSize: "14px", fontFamily: "Plus Jakarta Sans", fontWeight: 500 }} >
                            <br />
                            {GuestCount} Guests,&nbsp;
                            {startDate} - {endDate}
                        </Typography>
                    </>
                )}
                <FilterImage src="/images/filter.svg" alt=""></FilterImage>
            </Button>
        </Box>
    );
};
