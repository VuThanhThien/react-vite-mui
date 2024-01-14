import { Box, Container, Link, Typography, styled } from '@mui/material';
import { VITE_APP_NAME } from 'core/config';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`,
);

function Footer() {
  return (
    <FooterWrapper className='footer-wrapper'>
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems='center'
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent='space-between'
      >
        <Box>
          <Typography variant='subtitle1'>&copy; {VITE_APP_NAME}</Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 },
          }}
          variant='subtitle1'
        >
          Crafted by{' '}
          <Link href='https://github.com/VuThanhThien' target='_blank' rel='noopener noreferrer'>
            VuThanhThien
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
