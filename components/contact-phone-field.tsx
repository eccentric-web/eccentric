"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import {
  defaultPhoneCountry,
  getCountryFlag,
  phoneCountries,
  phoneCountryByValue,
} from "@/lib/phone-countries";

type ContactPhoneFieldProps = {
  label: string;
  placeholder: string;
  phoneCountry: string;
  phone: string;
  onPhoneCountryChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
};

function CountryFlagPicker({
  phoneCountry,
  onPhoneCountryChange,
}: {
  phoneCountry: string;
  onPhoneCountryChange: (value: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [search, setSearch] = useState("");
  const open = Boolean(anchorEl);
  const selectedCountry =
    phoneCountryByValue.get(phoneCountry) ?? phoneCountryByValue.get(defaultPhoneCountry)!;

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return phoneCountries;
    }

    return phoneCountries.filter((country) => country.label.toLowerCase().includes(query));
  }, [search]);

  const handleClose = () => {
    setAnchorEl(null);
    setSearch("");
  };

  return (
    <>
      <Box
        component="button"
        type="button"
        aria-label={`Country, ${selectedCountry.label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.25,
          border: 0,
          bgcolor: "transparent",
          cursor: "pointer",
          p: 0.25,
          borderRadius: 1,
          color: "text.primary",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <Box
          component="span"
          aria-hidden="true"
          sx={{ fontSize: "1.35rem", lineHeight: 1, display: "block" }}
        >
          {getCountryFlag(selectedCountry.value)}
        </Box>
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            display: "inline-flex",
            color: "#475569",
            lineHeight: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </Box>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              width: "min(24rem, calc(100vw - 2rem))",
              minHeight: "28rem",
              maxHeight: "min(32rem, 75vh)",
              mt: 0.75,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            },
          },
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          <TextField
            fullWidth
            autoFocus
            size="small"
            placeholder="Search country"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" aria-hidden="true" sx={{ lineHeight: 0, color: "text.secondary" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      </svg>
                    </Box>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box
          component="ul"
          role="listbox"
          aria-label="Countries"
          sx={{
            flex: 1,
            minHeight: "22rem",
            overflowY: "auto",
            m: 0,
            p: 1,
            listStyle: "none",
          }}
        >
          {filteredCountries.length === 0 ? (
            <Box component="li" sx={{ px: 1.5, py: 2, color: "text.secondary", fontSize: "0.95rem" }}>
              No countries found
            </Box>
          ) : (
            filteredCountries.map((country) => {
              const isSelected = country.value === selectedCountry.value;

              return (
                <Box
                  component="li"
                  key={country.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onPhoneCountryChange(country.value);
                    handleClose();
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 1.5,
                    py: 1.1,
                    borderRadius: 1,
                    cursor: "pointer",
                    bgcolor: isSelected ? "action.selected" : "transparent",
                    "&:hover": {
                      bgcolor: isSelected ? "action.selected" : "action.hover",
                    },
                  }}
                >
                  <Box component="span" aria-hidden="true" sx={{ fontSize: "1.2rem", lineHeight: 1 }}>
                    {getCountryFlag(country.value)}
                  </Box>
                  <Box component="span" sx={{ fontSize: "0.95rem" }}>
                    {country.label}
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      </Popover>
    </>
  );
}

export function ContactPhoneField({
  label,
  placeholder,
  phoneCountry,
  phone,
  onPhoneCountryChange,
  onPhoneChange,
}: ContactPhoneFieldProps) {
  const selectedCountry =
    phoneCountryByValue.get(phoneCountry) ?? phoneCountryByValue.get(defaultPhoneCountry)!;

  return (
    <TextField
      fullWidth
      required
      type="tel"
      label={label}
      name="phone"
      value={phone}
      onChange={(event) => onPhoneChange(event.target.value.replace(/\D/g, ""))}
      placeholder={placeholder}
      autoComplete="tel-national"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{
                height: "auto",
                maxHeight: "none",
                mr: 0,
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRight: "1px solid #dbe3ee",
                  pr: 1.25,
                  mr: 1.25,
                }}
              >
                <CountryFlagPicker
                  phoneCountry={phoneCountry}
                  onPhoneCountryChange={onPhoneCountryChange}
                />
              </Box>
            </InputAdornment>
          ),
        },
        htmlInput: {
          inputMode: "numeric",
          pattern: "[0-9]*",
          "aria-label": `${label}, ${selectedCountry.label}`,
        },
      }}
    />
  );
}
