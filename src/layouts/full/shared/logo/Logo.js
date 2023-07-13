import { Link } from 'react-router-dom';
// import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { Box, styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '80px',
  width: '180px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      {/* <LogoDark height={70} /> */}
      <Box component="img" src="/images/logos/crm-logo.png" alt="logo" />
    </LinkStyled>
  );
};

export default Logo;
