
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://fidip.ir/">
          توسعه اطلاعات مالی ایساتیس پویا
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  export default Copyright