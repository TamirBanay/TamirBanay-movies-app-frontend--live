import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { _moviesList, _currentPage, _isDark } from "../services/atom";
import { useRecoilState } from "recoil";

export default function DotsMobileStepper() {
  const [currentPage, setCurrentPage] = useRecoilState(_currentPage);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [themeDark, setTheme] = useRecoilState(_isDark);
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentPage((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentPage((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="text"
      steps={6}
      position="static"
      activeStep={activeStep}
      sx={{
        maxWidth: 1000,
        flexGrow: 1,
        m: "auto",
        backgroundColor: themeDark == "dark" ? "#212121" : "", // Setting the background color of MobileStepper to red
        ".MuiMobileStepper-dot": {
          backgroundColor: themeDark == "dark" ? "grey" : "", // Inactive dots color
        },
        color: themeDark == "dark" ? "white" : "",
      }}
      nextButton={
        <Button
          size="large"
          onClick={handleNext}
          disabled={activeStep === 5}
          sx={{
            color: themeDark == "dark" ? "white" : "",
          }}
        >
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button
          size="large"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{
            color: themeDark == "dark" ? "white" : "",
          }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
