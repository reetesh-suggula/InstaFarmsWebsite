import { Button, Card, CardHeader, Stack } from "@mui/material"
import { useContext } from "react";
import { Actions, Context } from "./reducer";

export const LoggedIn = () => {
    const {state, dispatch} = useContext(Context);
    const {villas} = state;
    return (
        <>
            <Card sx={{ width: "80%", textAlign: "center", border: "none", boxShadow: "none" }}>
                <CardHeader
                    avatar={<img style={{ borderRadius: "50%", height: "70px" }} src="/images/avatar.svg" alt=""></img>}
                    title="Jaswanth"
                    subheader="jaswanth@gmail.com" />
            </Card>
            <Stack spacing={3} sx={{ background: "#8C684D1A", width: "80%", borderRadius: "20px", mx: 'auto' }}>
                <div className="menu-items" style={{ marginTop: "10px" }}>
                    <div className="menu-icon"><img src="/images/account.svg" alt="location" style={{ width: "30px" }}></img></div>
                    <div className="menu-btn">My Account</div>
                </div>
                <hr style={{ background: "#0000001A", marginTop: "5px", marginLeft: "40px", width: "85%", marginBottom: "0px" }}></hr>
                <div className="menu-items">
                    <div className="menu-icon"><img src="/images/info.svg" alt="villa" style={{ width: "30px" }}></img></div>
                    <div className="menu-btn">About Us</div>
                </div>
                <hr style={{ background: "#0000001A", marginTop: "5px", marginLeft: "40px", width: "85%" }}></hr>
                <div className="menu-items">
                    <img src='/images/events.svg' alt="" style={{ width: "90%" }}></img>
                </div>
                <div className="menu-items">
                    <div className="menu-icon"><img src="/images/villa2.svg" alt="house" style={{ width: "30px" }}></img></div>
                    <div className="menu-btn">List your villa</div>
                </div>
                <hr style={{ background: "#0000001A", marginTop: "5px", marginLeft: "40px", width: "85%" }}></hr>
                <div className="menu-items" style={{ marginBottom: "5px" }}>
                    <div className="menu-icon"><img src="/images/help.svg" alt="support" style={{ width: "30px" }}></img></div>
                    <div className="menu-btn">Help</div>
                </div>
            </Stack>
            <Button onClick={()=>{
                dispatch({
                    type:Actions.SET_IS_LOGGGED_IN,
                    data:false,
                    villa:{},
                    villas:villas
                })
            }}sx={{ color: 'white', fontStyle: "Plus Jakarta Sans", fontWeight: "700", background: "#8C684D", width: "40%", border: "none", marginTop: "50px", marginBottom: "30px" }}>Log out</Button>
        </>
    )
};
