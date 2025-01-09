import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { shortenUrl } from '../api/url';

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (longUrl) {
      const getShortUrlResult = await shortenUrl(longUrl);
      setShortUrl(getShortUrlResult.data.data.shortUrl);
      console.log(getShortUrlResult);
    }
  };

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
        Shorten a Long URL
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          id="long-url"
          label="Enter Long URL"
          variant="outlined"
          fullWidth
          required
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
      {shortUrl && (
        <Typography
          variant="body1"
          sx={{ mt: 2, color: 'green', wordWrap: 'break-word' }}
        >
          Shortened URL: <a href={shortUrl}>{shortUrl}</a>
        </Typography>
      )}
    </Box>
  );
}
