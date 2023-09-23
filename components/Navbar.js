"use client"
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useState} from "react";
import { logout } from "@/app/store";
import { useRouter } from "next/navigation";
import supabase from "../src/config/supabaseConfig"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [neelEl, setNeelEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [photo,setPhoto] = useState('');
  const [data,setData] = useState();
  const router = useRouter();

     const userName = useSelector((state) => state.user.username);
     const photo1 = useSelector((state) => state.user.profilePhoto);
     const dispatch = useDispatch();

     const channelB = supabase
     .channel('table-db-changes')
     .on(
       'postgres_changes',
       {
        event: '*',
         schema: 'public',
         table: 'Cart',
       },
       (payload) => {
          let cartData = async () => {
          let { data: Cart, error } = await supabase
                                                    .from('Cart')
                                                    .select('id')
                                                    .eq('user_email',userName);
          setData(Cart.length);
    }
    cartData();
       }
     )
     .subscribe()
   

     React.useEffect(() => {
      if (photo1) {
        setPhoto(photo1);     }
        let cartData = async () => {
              let { data: Cart, error } = await supabase
                                                        .from('Cart')
                                                        .select('id')
                                                        .eq('user_email',userName);
        setData(Cart.length);
        }
        cartData();

       
     },[photo1])

  const isMenuOpen = Boolean(anchorEl);
  const isNeelMenuOpen = Boolean(neelEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleAppMenu = (event) => {
    setNeelEl(event.currentTarget);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    router.push("/SignUp");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // Logout Functionallity.
  const handleLogOut = () => {
    dispatch(logout());
    setPhoto('');
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleNeelMenuClose = () => {
    setNeelEl(null);
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    {!photo ? (
      <>
      <MenuItem onClick={handleMenuClose}>
       Sign Up
      </MenuItem>
      <MenuItem onClick={() => {router.push("/LogIn"); setAnchorEl(null); handleMobileMenuClose();}}>Login</MenuItem>
      </>
      ) : null}
      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}><Link href="/Login">Payment Made</Link></MenuItem> */}
    </Menu>
  );

  const renderMenu2 = (
    <Menu
    neelEl={neelEl}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    id={menuId}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    open={isNeelMenuOpen}
    onClose={handleNeelMenuClose}
    sx={{ marginTop: '2.5em' }}
  >
    <MenuItem onClick={handleMenuClose}>Actors</MenuItem>
    <MenuItem onClick={handleMenuClose}>Producers</MenuItem>
    <MenuItem onClick={handleMenuClose}>Directors</MenuItem>
  </Menu>
  );


  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
         <Avatar alt="Profile" src={photo} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // Getting the cart no.
  

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "whitesmoke" }}>
      <AppBar position="static" sx={{ backgroundColor: "Blue Gray" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleAppMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link className="logoLink" href="/">
          <Typography
            variant="h6"
            noWrap
            component="div"
            
            sx={{ display: { xs: "none", sm: "block" } }}
          >
           BoxOffice
          </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link className="logoLink" href="/Cart">
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={data} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt="Profile" src={photo} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderMenu2}
    </Box>
  );
}
