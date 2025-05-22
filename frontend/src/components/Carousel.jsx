import React from "react";
import { Box, MobileStepper, IconButton } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const images = [
  "https://www.jdandj.com/uploads/8/0/0/8/80083458/published/what-makes-a-great-book-cover-design.jpg?1670512054",
  "https://www.nessgraphica.com/wp-content/uploads/2024/02/book-cover-design-trends.jpg",
  "https://npr.brightspotcdn.com/dims4/default/89d9dc3/2147483647/strip/true/crop/2840x1781+0+0/resize/1760x1104!/format/webp/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fb0%2Fef%2F826da59c4f8d84cc5fdf55217d7d%2Fkaxe-books.jpg",
];

export default function SimpleCarousel() {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);
  };

  return (
    <Box sx={{ maxWidth: 800, flexGrow: 1, mx: "auto", mt: 2 }}>
      <Box
        component="img"
        sx={{
          height: 400,
          display: "block",
          maxWidth: 800,
          overflow: "hidden",
          width: "100%",
          borderRadius: 2,
          boxShadow: 3,
        }}
        src={images[activeStep]}
        alt={`slide-${activeStep + 1}`}
      />
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ backgroundColor: "transparent" }}
        nextButton={
          <IconButton
            size="small"
            onClick={handleNext}
            sx={{
              border: "none",
              background: "transparent",
              padding: 0,
              minWidth: 0,
              color: "inherit",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <KeyboardArrowRight />
          </IconButton>
        }
        backButton={
          <IconButton
            size="small"
            onClick={handleBack}
            sx={{
              border: "none",
              background: "transparent",
              padding: 0,
              minWidth: 0,
              color: "inherit",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>
        }
      />
    </Box>
  );
}
