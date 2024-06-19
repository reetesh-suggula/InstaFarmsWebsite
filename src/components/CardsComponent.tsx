import { FavoriteBorderOutlined, FavoriteRounded, Star } from '@mui/icons-material';
import { AspectRatio, Typography } from '@mui/joy';
import Card from '@mui/joy/Card';
import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Actions, Context } from './reducer';

const data = [
  {
    src: '/images/villa2.webp',
    title: 'The Villa Theme Farm1',
    description: 'Hyderabad, Telnagana, India',
    price: "₹3,599 /night",
    liked: false,
  },
  {
    src: '/images/villa1.webp',
    title: 'The Villa Theme Farm2',
    description: '4.74M views',
    price: "₹3,599 /night",
    liked: true,
  },
  {
    src: '/images/villa2.webp',
    title: 'The Villa Theme Farm3',
    description: '3.98M views',
    price: "₹3,599 /night",
    liked: true,
  },
];

export const CardsComponent = () => {
  const [dataApi, setData] = useState({});
  const [properties, setProperties] = useState<any>([]);
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    // Fetch data from API
    getProperties().then((data) => {
      const properties = data.map((item: any) => ({
        src: item.displayImage,
        title: item.originalName,
        description: item.description,
        // price: item.price,
        liked: false,
      }));
      console.log(properties);
      setProperties(properties);
      dispatch({
        type: Actions.SET_VILLAS,
        villa: {},
        villas: data
      });
    });
  }, []);

  const handleLike = (index: number) => {
    const updatedData = [...properties];
    updatedData[index].liked = !updatedData[index].liked;
    setData(updatedData);
  };

  const getProperties = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/properties`);
      return response.data;
    } catch (error) {
      console.error('Error getting properties:', error);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        width: "100%",
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {properties.map((item: any, index: number) => (
        <Card size="sm" key={index} variant='plain' sx={{ minWidth: 260, background: "none", position: "relative", boxShadow: 'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px' }}>
          <AspectRatio ratio="1" sx={{ minHeight: 160, position: "relative" }}>
            <img
              srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?h=120&fit=crop&auto=format`}
              alt={item.title}
              style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
            />
          </AspectRatio>
          <Box sx={{ whiteSpace: 'nowrap', mx: 1, marginTop: 'auto' }}>
            <div style={{ display: "flex", left: 0 }}>
              <Typography level="title-md" sx={{ fontSize: "15px" }}>{item.title}</Typography>
              {/* <Star style={{ color: "#ffd33b", marginLeft: "5px" }}></Star>
                            <div>5.0<div></div></div> */}
            </div>
            {/* <Typography level="body-sm" style={{ marginRight: "200px" }}>{item.description}</Typography> */}
            <Typography level="body-sm" style={{ marginRight: "220px", fontWeight: "bold", color: "#8C684D" }}>{item.basePrice}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
};
