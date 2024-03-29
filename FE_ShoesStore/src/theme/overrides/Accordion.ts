import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '0 !important',
          backgroundColor: 'transparent',
          '&:last-of-type': {
            borderBottom: `solid 1px ${theme.palette.divider}`,
          },
          '&.Mui-expanded': {
            margin: 0,
            '&:before': {
              opacity: 1,
            },
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: theme.spacing(0, 0, 2.5, 0),
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
          },
        },
        content: {
          alignItems: 'center',
          margin: theme.spacing(2.5, 0),
        },
      },
    },
  };
}
