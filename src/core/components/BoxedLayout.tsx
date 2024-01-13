import React from 'react';
import Logo from './Logo';
import { Box, Container, GlobalStyles, useTheme } from '@mui/material';

type BoxedLayoutProps = {
  children: React.ReactNode;
};

const BoxedLayout = ({ children }: BoxedLayoutProps) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.paper } }} />
      <Container component='main' maxWidth='xs' sx={{ mt: 6 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Logo />
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default BoxedLayout;
