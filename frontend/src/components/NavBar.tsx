import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left'  }}>
            Shorten URL
          </Typography>
          <Button color="inherit">Sign In</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
