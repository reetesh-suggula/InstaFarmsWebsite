"use client"
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import Image from 'next/image';
import { useContext } from "react";
import { Actions, Context } from "../../../components/reducer";
import { MenuPage } from "../../../components/pages/Menu";


export const Navbar = () => {
  const { state, dispatch } = useContext(Context);
  const { showMenuPage, villas } = state;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: "white", borderRadius: "10px" }}>

        <Toolbar>
          <Image width={71} height={40} src="/images/instafarmlogo.svg" alt="" />
          {/* <IconButton
            size="large"
            edge="start"
            color="default"
            aria-label="menu"
            onClick={() => dispatch({
              type: Actions.SHOW_HIDE_MENU_PAGE,
              data: true,
              villa:{}
            })}
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ zIndex: 2000 }}></MenuIcon>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black", fontSize: "16px", textAlign:'center' }}>
            <span><LocationOn style={{ color: "#8C684D" }}></LocationOn>  Location </span>
          </Typography>
          <Image width={71} height={40} src="/images/instafarmlogo.svg" alt=""/> */}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={showMenuPage}
          onClose={() => dispatch({
            type: Actions.SHOW_HIDE_MENU_PAGE,
            data: false,
            villa: {},
            villas: villas
          })}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "100%" },
          }}
        >
          <MenuPage></MenuPage>
        </Drawer>
      </nav>
    </Box>
  );
}