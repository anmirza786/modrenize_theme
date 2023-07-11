import React from 'react';
import { Grid, Box, Card, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import SwiperSlideElement from './components/SwiperSlide';
import AuthOTPConfirmation from './auth/AuthOtpConfirmation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { OTPConfirmationSlider } from './components/data';
import { Pagination } from 'swiper/modules';

const OTPConfirmation = () => (
  <PageContainer title="OTP Confirmation" description="this is OTP Confirmation page">
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid container justifyContent="center" sx={{ height: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={9}
            sx={{
              px: 10,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box component="div">
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthOTPConfirmation
                subtext={
                  <Typography
                    variant="h2"
                    textAlign="center"
                    color="#32324D"
                    fontSize={32}
                    fontWeight={700}
                    pt={2}
                    mb={1}
                  >
                    {"It's just OTP verification"}
                  </Typography>
                }
                infotext={
                  <Typography
                    variant="subtitle2"
                    textAlign="center"
                    color="#666687"
                    fontSize={24}
                    fontWeight={400}
                    mb={1}
                  >
                    You are one step away from accessing your account.
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>
        <Grid
          item
          md={6}
          sx={{ display: { xs: 'none', md: 'block' } }}
          justifyContent="center"
          alignItems="center"
        >
          <Swiper
            pagination={true}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            modules={[Pagination]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            style={{ height: '100vh', background: '#0294D3' }}
          >
            {OTPConfirmationSlider.map((slide) => (
              <SwiperSlide key={`${slide.name}-login`}>
                <SwiperSlideElement
                  image={slide.image}
                  name={slide.name}
                  description={slide.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default OTPConfirmation;
