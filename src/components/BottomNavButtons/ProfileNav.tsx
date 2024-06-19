import { PersonOutlineOutlined } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useContext } from "react";
import { BottamNav, Context } from "../reducer";

export const ProfileNavBtn = ()=>{
    const { state } = useContext(Context);
    const { activePage } = state;
    return (
        <div>
            {activePage.activePage === BottamNav.PROFILE &&
                <Chip icon={<PersonOutlineOutlined style={{ color: "#8C684D" }} />} label="Profile" style={{ background: "#FBF0E9" }} />
            }
            {activePage.activePage !== BottamNav.PROFILE &&
            <PersonOutlineOutlined></PersonOutlineOutlined>}
        </div>
    )
}
