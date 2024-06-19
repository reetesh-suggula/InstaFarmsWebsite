/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box } from "@mui/material";
import { ReactElement } from "react";
import Carousel from "react-material-ui-carousel";

interface Picture {
    image: string;
}
export interface carouseImgProps {
    display: Display
}
export enum Display {
    BODY = 'body',
    FOOTER = 'footer'
}
const CustomCarouselItem = ({ item, index, display }: { item: Picture, index: number, display: Display }) => (
    <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
        {display === Display.BODY ? (
            <><img
                src={item.image}
                alt={`Image ${index + 1}`}
                style={{ width: '90%', height: '220px', borderRadius: '15px', filter: 'blur(0.7px)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
                    <div style={{ color: "white", fontSize: "20px" }}>View our Newly Listed</div>
                    <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>FARM HOUSES</div>
                </div></>
        ) : (<img
            src={item.image}
            alt={`Image ${index + 1}`}
            style={{ width: '100%', height: '220px', borderRadius: '15px' }}
        />)}
    </div>
);

export const CarouselImg = (props: carouseImgProps): ReactElement => {
    const AllPictures = [[{ image: './images/nature.jpg' },
    { image: './images/nature.jpg' }], [{ image: './images/offerbanner.svg' }, { image: './images/offerbanner.svg' }]]

    const pictures: Picture[] = props.display === Display.BODY ? AllPictures[0] : AllPictures[1];

    return (
        <Box style={{
            marginTop: "15px",
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Carousel
                animation="slide"
                indicatorContainerProps={{ style: { position: 'absolute', bottom: '10px', zIndex: 60 } }}
            >
                {pictures.map((image, i) => (
                    <CustomCarouselItem key={i} item={image} index={i} display={props.display} />
                ))}
            </Carousel>
        </Box>
    );
};
