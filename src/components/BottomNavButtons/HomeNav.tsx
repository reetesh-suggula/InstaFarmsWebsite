import { Home } from "@mui/icons-material"
import { Chip } from "@mui/material"
import { useContext } from "react"
import { BottamNav, Context } from "../reducer"

export const HomeNavBtn = () => {
    const { state } = useContext(Context);
    const { activePage } = state;
    return (
        <div>
            {activePage.activePage === BottamNav.HOME &&
                <Chip icon={<Home style={{ color: "#8C684D" }} />} label="Home" style={{ background: "#FBF0E9" }} />
            }
            {activePage.activePage !== BottamNav.HOME &&
                <Home></Home>}
        </div>
    )
}
