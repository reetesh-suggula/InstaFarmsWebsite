import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Button, ButtonGroup, Stack, styled } from "@mui/material";
import './FooterMobile.css';

const ArrowIcon = styled(KeyboardArrowDownOutlined)({
    marginLeft: 'auto',
    fontSize: "28px"
});

export const FooterMobile = () => {
    return (
        <>
            <Stack spacing={4} sx={{ marginBottom: "20px", width: "100%", mx: "auto" }}>
                <div className="mmfooter"><img src="/images/location.svg" alt="location" style={{ width: "30px" }}></img> <div className="mfooter"><div className="footer">Top Location</div><ArrowIcon /></div></div>
                <div className="mmfooter"><img src="/images/villa.svg" alt="villa" style={{ width: "30px" }}></img> <div className="mfooter"><div className="footer">Top Collections</div><ArrowIcon /></div></div>
                <div className="mmfooter"><img src="/images/about.svg" alt="about" style={{ width: "30px" }}></img> <div className="mfooter"><div className="footer">About InstaFarm</div><ArrowIcon /></div></div>
                <div className="mmfooter"><img src="/images/house.svg" alt="house" style={{ width: "30px" }}></img> <div className="mfooter"><div className="footer">Farm Houses</div><ArrowIcon /></div></div>
                <div className="mmfooter"><img src="/images/support.svg" alt="support" style={{ width: "30px" }}></img> <div className="mfooter"><div className="footer">Support</div><ArrowIcon /></div></div>
                <div className="mmfooter"><img src="/images/luxury-hotel.svg" alt="luxury" style={{ width: "30px" }}></img> <div className="mfooter"><div className="footer">Luxury Villas</div><ArrowIcon /></div></div>
                <div className="mmfooter"><img src="/images/checklist.svg" alt="checklist" style={{ width: "30px" }}></img> <div className="mfooter"><div className="footer">List your Villa</div><ArrowIcon /></div></div>
            </Stack>
            <ButtonGroup variant="text" aria-label="outlined button group" style={{ width: "100%", justifyContent: "center" }}>
                <Button style={{ color: "black", borderColor: "black", textTransform: "none", marginRight: "5px", marginLeft: "5px" }}>Privacy</Button>
                <Button style={{ color: "black", borderColor: "black", textTransform: "none", marginRight: "5px", marginLeft: "5px" }}>Terms & Conditions</Button>
                <Button style={{ color: "black", borderColor: "black", textTransform: "none", marginRight: "5px", marginLeft: "5px" }}>Sitemap</Button>
            </ButtonGroup>

            <div className="social-media">
                <img src="/images/youtube.svg" alt=""></img>
                <img src="/images/linkedin.svg" alt=""></img>
                <img src="/images/insta.svg" alt=""></img>
                <img src="/images/fb.svg" alt=""></img>
                <img src="/images/twiter.svg" alt=""></img>
            </div>
        </>
    )
}
