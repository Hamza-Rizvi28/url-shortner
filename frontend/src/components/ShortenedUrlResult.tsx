import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CopyToClipboardComponent from './CopyToClipboard';

interface ShortenerUrlResultProps {
    longUrl: string | undefined;
    shortUrl: string | undefined;
}

const ShortenerUrlResult: React.FC<ShortenerUrlResultProps> = ({ longUrl, shortUrl }) => {

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 500,
                margin: '0 auto',
                mt: 5,
                p: 3,
                border: '1px solid #0000',
                bgcolor: '#FFFFFF',
                borderRadius: 3,
                boxShadow: 3,
                textAlign: 'center',
            }}
        >
            <Typography variant="h6" align='left' color='string' gutterBottom>
                Your Long URL
            </Typography>

            <TextField
                id="long-url"
                variant="outlined"
                fullWidth
                required
                value={longUrl}
            />
            <Typography variant="h6" align='left' color='string' paddingTop={3}>
                Shortened URL
            </Typography>

            <TextField
                id="short-url"
                variant="outlined"
                fullWidth
                required
                value={shortUrl}
            />
            <CopyToClipboardComponent copiedText={shortUrl}/>
        </Box>

    );
}

export default ShortenerUrlResult;