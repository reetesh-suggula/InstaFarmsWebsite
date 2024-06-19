import { Box, Button, Container } from "@mui/material";
import { useEffect } from "react";

export interface heading {
    title: string,
    hideButton?: boolean,
    onclick?: (place:string) => void;
}

export const Headings = (props: heading) => {
    useEffect(() => {
        console.log(props)
    }, [])

    const click = (place: string) => {
        if (props.onclick) {
            props.onclick(place);
        }
    }
    
    return (
        <Container>
            <Box style={{ marginTop: "20px", display: "flex", }}>
                <div style={{ textTransform: "none", fontWeight: "bolder", fontSize: "20px" }}>{props.title}</div>
                <Box
                    style={{
                        marginLeft: 'auto',
                        marginTop: "2px",
                    }}>
                    { !props.hideButton && 
                        <Button  style={{ borderRadius: "7px", border: "1px solid #5DC5CD", textTransform: "none", color: "#8C684D", height: "30px", background: "rgba(93, 197, 205, 0.10)" }} onClick={()=> click('places')}>See all</Button>}
                </Box>
            </Box>
        </Container>
    )

}
