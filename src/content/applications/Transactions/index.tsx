import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'core/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'core/components/Footer';

import RecentOrders from './RecentOrders';

function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth='lg'>
        <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={3}>
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
