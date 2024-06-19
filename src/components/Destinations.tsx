import { Box } from "@mui/material"
import './Destinations.css'
import React from "react"

const destinations: string[] = ["Hyderabad", "Banglore", "Vijayawada", "Tenali", "Guntur"]

export const Destinations = (props:any) => {
    const [areas, setAreas] = React.useState<any[]>([])
    React.useEffect(() => {
        console.log("Areas",props.areas)
        setAreas(props.areas) 
        // if(props.areas.length > 0){
        //     const areas = props.areas.filter((area:any) => {
        //         const propertyIds = area.propertyIds;
        //         return propertyIds.length > 0;
        //     })
           
        // }
    }, [props.areas])

    const click = (place: string) => {
        props.onClick(place)
    }
    
    return (
        <Box
            sx={{ width: "100%" }}
        >
            <hr style={{
                marginLeft: "20px", marginBottom: '-5px',
                height: '3px', marginRight: '20px', color: "#8c684d", position:"relative", zIndex:"-120"
            }}></hr>

            <div className="scroll" style={{ display: 'flex', flexDirection: 'row', overflow: 'scroll' }}>
                {areas?.map((place:any, index:any) => (
                    <div key={index} style={{ height: "100px", width: "100%", fontSize:"14px" }}>
                    <img src='./images/Frame.svg' alt='frame' style={{ marginLeft: "20px" }}></img>
                    <div style={{ marginLeft: "34px", zIndex: 100, marginTop: '-45px', fontWeight: '500', wordWrap:'break-word', width:'80px'}} onClick={()=>click(place.name)} >{place.name}</div>
                </div>
            ))}
            </div>
        </Box>
    )
}
