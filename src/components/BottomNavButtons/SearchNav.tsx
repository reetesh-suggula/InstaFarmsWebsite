import { Search } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useContext } from "react";
import { BottamNav, Context } from "../reducer";

export const SearchNavBtn = () => {
    const { state } = useContext(Context);
    const { activePage } = state;
    return (
        <div>
            {activePage.activePage === BottamNav.SEARCH &&
                <Chip icon={<Search style={{ color: "#8C684D" }} />} label="Search" style={{ background: "#FBF0E9" }} />
            }
            {activePage.activePage !== BottamNav.SEARCH &&
                <Search></Search>}
        </div>
    )
}
