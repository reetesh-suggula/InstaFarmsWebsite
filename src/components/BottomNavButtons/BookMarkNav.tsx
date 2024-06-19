
import { BookmarkOutlined } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useContext } from "react";
import { BottamNav, Context } from "../reducer";

export const BookMarkNavBtn = () => {
    const { state } = useContext(Context);
    const { activePage } = state;
    return (
        <div>
            {activePage.activePage === BottamNav.BOOKMARK &&
                <Chip icon={<BookmarkOutlined style={{ color: "#8C684D" }} />} label="Book Mark" style={{ background: "#FBF0E9" }} />
            }
            {activePage.activePage !== BottamNav.BOOKMARK &&
                <BookmarkOutlined></BookmarkOutlined>}
        </div>
    )
};
