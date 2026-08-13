import { createTheme } from "@mui/material/styles";

export const contactFormTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0ea5e9",
      dark: "#0284c7",
      light: "#38bdf8",
    },
    secondary: {
      main: "#6366f1",
    },
    error: {
      main: "#ef4444",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    background: {
      paper: "#ffffff",
    },
    divider: "#e2e8f0",
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: "inherit",
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          transition: "box-shadow 0.2s ease, border-color 0.2s ease",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#94a3b8",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#38bdf8",
            borderWidth: "1px",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.12)",
          },
        },
        notchedOutline: {
          borderColor: "#dbe3ee",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#64748b",
          "&.Mui-focused": {
            color: "#0ea5e9",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#ef4444",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          padding: "0.85rem 1.6rem",
          minWidth: "10rem",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            background: "#0f172a",
            color: "#ffffff",
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.2)",
            "&:hover": {
              background: "#020617",
              boxShadow: "0 14px 32px rgba(15, 23, 42, 0.28)",
            },
            "&:disabled": {
              background: "#334155",
              color: "#ffffff",
            },
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});
