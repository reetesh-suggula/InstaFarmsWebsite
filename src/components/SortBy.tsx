
import { Box, Card, Typography } from "@mui/joy";
import { Grid } from "@mui/material";

const data = [
    {
        src: "/images/popular.svg",
        title: "Popular",
        description: "Most Loved",
    },
    {
        src: "/images/popular.svg",
        title: "Newly",
        description: "Launched",
    },
    {
        src: "/images/ratings.svg",
        title: "Rating",
        description: "High To Low",
    },
    {
        src: "/images/high.svg",
        title: "Price",
        description: "Low To High",
    },
    {
        src: "/images/high.svg",
        title: "Price",
        description: "High To Low",
    },
];

export const SortyBy = () => {
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
                <h5 style={{ marginBottom: "20px" }}>Sort By</h5>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        py: 1,
                        overflow: "auto",
                        width: "100%",
                        scrollSnapType: "x mandatory",
                        "& > *": {
                            scrollSnapAlign: "center",
                        },
                        "::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {data.map((item) => (
                        <Card
                            orientation="vertical"
                            size="sm"
                            key={`${item.title}${Math.random}`}
                            variant="outlined"
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100px",
                                    width: "90px"
                                }}
                            >
                                <Typography level="title-md">
                                    <img src={item.src} alt={item.title} />
                                </Typography>
                                <Typography level="title-md">{item.title}</Typography>
                                <Typography level="body-sm">{item.description}</Typography>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Grid>
        </Grid>
    )
};
