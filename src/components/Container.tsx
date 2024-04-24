'use client'
import { Box, useTheme } from '@mui/material';
import React from 'react'

const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: {
          sm: '90%', 
          md: '80%', 
        },
        mx: 'auto', // Center horizontally
      }}
    >
      {children}
    </Box>
  );
};

export default Container
