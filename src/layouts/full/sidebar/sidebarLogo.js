import { Link } from 'react-router-dom';
import { Box, styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  //   overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <Box component="img" src="/images/logos/logo2.svg" alt="logo" height={80} width={130} />
    </LinkStyled>
  );
};

export default Logo;
