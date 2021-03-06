import React from 'react'
import { AppBar, makeStyles, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: "30px"
    },
}));

export default function Header({
    handleLogout
}) {
    const classes = useStyles();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    return (
        <div className={classes.root}>
            <AppBar
                position="static"
            >
                <Toolbar>
                    {/* <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        color="inherit" 
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        COVID-19 
                    </Typography>

                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem 
                            onClick={() => {
                                history.push('/profile');
                            }}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem
                            onClick={handleLogout}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}
