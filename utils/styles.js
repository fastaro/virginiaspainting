import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Source Sans Pro',
  },
  palette: {
    primary: {
      main: '#0a0a0a',
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
        font-family: 'Pixelated MS Sans Serif';
        font-style: normal;
        font-weight: normal;
        src: local('Pixelated MS Sans Serif'), local('Pixelated MS Sans Serif'), url(/fonts/converted/ms_sans_serif.woff2) format('woff2');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
      @font-face {
        font-family: 'Pixelated MS Sans Serif';
        font-style: normal;
        font-weight: bold;
        src: local('Pixelated MS Sans Serif'), local('Pixelated MS Sans Serif'), url(/fonts/converted/ms_sans_serif_bold.woff2) format('woff2');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }

            @font-face {
              font-family: 'Source Sans Pro';
              src: local('Source Sans Pro'), url('/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf') format('ttf');
              font-weight: normal;
              font-style: normal;
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
            
            @font-face {
              font-family: 'Source Sans Pro';
              src: local('Source Sans Pro Bold'), url('/fonts/Source_Sans_Pro/SourceSansPro-SemiBold.ttf') format('ttf');
              font-weight: bold;
              font-style: normal;
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }

            @font-face {
              font-family: 'Source Sans Pro';
              src: local('Source Sans Pro Italic'), url('/fonts/Source_Sans_Pro/SourceSansPro-Italic.ttf') format('ttf');
              font-weight: normal;
              font-style: italic;
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }

            @font-face {
              font-family: 'Source Sans Pro';
              src: local('Source Sans Pro Bold'), url('/fonts/Source_Sans_Pro/SourceSansPro-BoldItalic.ttf') format('ttf');
              font-weight: bold;
              font-style: italic;
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
            @font-face {
              font-family: 'Futura Italic';
              src: local('Futura Italic'),url('./fonts/tt0205m_ttf'), format("truetype");
              font-weight: normal;
              font-style: normal;
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
            
          `,
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#15181c',
          height: '60px',
        },
      },
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'white',
            position: 'relative',
          },
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

export default theme;
