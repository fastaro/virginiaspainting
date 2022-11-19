import Head from 'next/head';
import classes from './Layout.module.css';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  InputBase,
  Modal,
  Box,
} from '@mui/material';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
const theme = createTheme({
  typography: {
    fontFamily: '',
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    // secondary: {
    //   main: 'rgb(192, 192, 192)',
    //   contrastText: 'black',
    // },
  },
  // ul: {
  //   '& .MuiPaginationItem-root': {
  //     color: '#fff',
  //   },
  // },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Noto Sans';
          font-style: normal;
          font-weight: normal;
          src: local('Noto Sans'), local('Noto Sans'), url(/fonts/Noto_Sans/NotoSans-Regular.ttf) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      
      `,
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          display: 'inline',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          margin: 0,
          width: '100%',
          display: 'inline',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: '100%',
          display: 'flex',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          margin: '0 auto',
          width: '100%',
          display: 'inline',
        },
      },
    },
    // MuiButtonBase: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: 'rgb(197, 197, 197)',
    //       '&:hover': {
    //         backgroundColor: 'rgb(166, 166, 166)',
    //         cursor: 'pointer',
    //       },
    //     },
    //   },
    // },

    MuiPaginationItem: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(197, 197, 197)',
          '&$disabeled': {
            backgroundColor: 'transparent',
          },
          '&:hover': {
            backgroundColor: 'rgb(166, 166, 166)',
            cursor: 'pointer',
          },
          '&:hover icon': {
            backgroundColor: 'rgb(166, 166, 166)',
            cursor: 'pointer',
          },
        },
      },
    },
  },
});

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
import NextImage from 'next/image';
export default function Layout({ title, description, children }) {
  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Head>
        <title>Virginia&apos;s Painting</title>
        <meta name="description"></meta>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed">
          <Container maxWidth="xl">
            <Toolbar>
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  margin: 'auto',
                  display: { xs: 'block', md: 'flex' },
                }}
              >
                <div>
                  <Typography
                    variant="h1"
                    noWrap
                    sx={{
                      mr: 2,

                      fontWeight: 700,
                      letterSpacing: '.9rem',
                      color: '#27425D',
                      textDecoration: 'none',
                    }}
                  >
                    <FormatPaintIcon fontSize="60px" /> Virginia&apos;s Painting
                  </Typography>
                  <div className="caption">
                    <p>COMMERCIAL & RESIDENTIAL</p>
                  </div>

                  <div className="nav-buttons">
                    <NextLink href="/" passHref>
                      <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                          mr: 2,

                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                      >
                        Home
                      </Typography>
                    </NextLink>

                    <NextLink href="/about" passHref>
                      <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                          mr: 2,

                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                      >
                        About
                      </Typography>
                    </NextLink>

                    <NextLink href="/contact" passHref>
                      <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                          mr: 2,

                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                      >
                        Contact
                      </Typography>
                    </NextLink>
                  </div>
                </div>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <div className="view-container">
          <div className="view-container2">
            <Container maxWidth="false">
              {children}
              <footer className="footer">
                <b>Free Estimates</b>
                <p style={{ marginTop: '0px' }}>703-910-1601</p>
              </footer>
            </Container>
          </div>
        </div>{' '}
      </ThemeProvider>
    </>
  );
}
