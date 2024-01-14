import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthProvider';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Paper, Typography, Box, TextField, Button, Link } from '@mui/material';
import { useSnackbar } from 'core/contexts/SnackbarProvider';
import BoxedLayout from 'core/components/BoxedLayout';

const Login = () => {
  const { t } = useTranslation();
  const { isLoggingIn, login } = useAuth();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const handleLogin = (email: string, password: string) => {
    login(email, password)
      .then(() => navigate(`/dashboards`, { replace: true }))
      .catch(() => snackbar.error(t('common.errors.unexpected.subTitle')));
  };

  const formik = useFormik({
    initialValues: {
      email: 'abc@gmail.com',
      password: 'def',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('common.validations.email')).required(t('common.validations.required')),
      password: Yup.string()
        // .min(8, t('common.validations.min', { size: 8 }))
        .required(t('common.validations.required')),
    }),
    onSubmit: (values) => handleLogin(values.email, values.password),
  });

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(./img/startup.svg)',
          backgroundRepeat: 'no-repeat',
          bgcolor: 'background.default',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <BoxedLayout>
          <Typography component='h1' variant='h5' sx={{ fontSize: '18px' }}>
            {t('auth.login.title')}
          </Typography>
          <Box component='form' marginTop={3} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label={t('auth.login.form.email.label')}
              name='email'
              autoComplete='email'
              autoFocus
              disabled={isLoggingIn}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label={t('auth.login.form.password.label')}
              type='password'
              id='password'
              autoComplete='current-password'
              disabled={isLoggingIn}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box sx={{ textAlign: 'right' }}>
              <Link component={RouterLink} to={`/forgot-password`} variant='body2'>
                {t('auth.login.forgotPasswordLink')}
              </Link>
            </Box>
            <LoadingButton type='submit' fullWidth loading={isLoggingIn} variant='contained' sx={{ mt: 3 }}>
              {t('auth.login.submit')}
            </LoadingButton>
            <Button component={RouterLink} to={`/register`} color='primary' fullWidth sx={{ mt: 2 }}>
              {t('auth.login.newAccountLink')}
            </Button>
          </Box>
        </BoxedLayout>
      </Grid>
    </Grid>
  );
};

export default Login;
