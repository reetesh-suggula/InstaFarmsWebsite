import { CommonData } from '@/lib/commondata';
import { KeyboardArrowDownOutlined, LocationOnRounded, Notifications } from '@mui/icons-material';
import { Badge, Box } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import axios from 'axios';
import * as React from 'react';

export const ChooseLocation = (props:any) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [placeName, setPlaceName] = React.useState('');


    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1, marginTop: "70px" }}>
            <div style={{ marginLeft: "7px", color: "grey", position: "absolute", zIndex: "3" }}>Locations</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
                    <div style={{ display: "inline", marginTop: "20px" }}>
                        <LocationOnRounded style={{ color: "#8C684D" }}></LocationOnRounded>
                        <Button style={{ border: "none", color: "black", textTransform: "none" }} onClick={props.onClick(props.states[selectedIndex])}>{props.states[selectedIndex]}</Button>
                    </div>
                    <Button
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        style={{ border: "none", color: "#8C684D", marginTop: "20px" }}
                        onClick={handleToggle}
                    >
                        <KeyboardArrowDownOutlined />
                    </Button>
                </ButtonGroup>
                <Popper
                    sx={{
                        zIndex: 1000,
                    }}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {props?.states.map((option:any, index:any) => (
                                            <MenuItem
                                                key={option}
                                                //disabled={index === 2}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                <Box
                    style={{
                        marginLeft: 'auto',
                        marginTop: "5px",
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                        borderRadius: "10px"
                    }}
                >
                    <Badge
                        color="error"
                        variant="dot"
                        invisible={false}
                    >
                        <Notifications />
                    </Badge>
                </Box>
            </div>
        </Box>
    );
}
