import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import UrlInputForm from '../components/UrlInputForm';
import ShortenedUrlList from '../components/ShortendurlList';
import { shortenUrls } from '../services/api';
import Logger from '../utils/logger';



const HomePage = () => {
  const [urlInputs, setUrlInputs] = useState([
    { longUrl: '', validity: '', customCode: '' }
  ]);
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleChange = (index, data) => {
    const updated = [...urlInputs];
    updated[index] = data;
    setUrlInputs(updated);
  };

  const handleAddRow = () => {
    if (urlInputs.length < 5) {
      setUrlInputs([...urlInputs, { longUrl: '', validity: '', customCode: '' }]);
    }
  };

  const handleRemoveRow = (index) => {
    const updated = urlInputs.filter((_, i) => i !== index);
    setUrlInputs(updated);
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
  const validInputs = urlInputs.filter(input => input.longUrl.trim() !== '');
  const errors = [];

  for (const input of validInputs) {
    try {
      new URL(input.longUrl); 
    } catch {
      errors.push(`Invalid URL: ${input.longUrl}`);
    }

    if (input.customCode && !/^[a-zA-Z0-9]+$/.test(input.customCode)) {
      errors.push(`Invalid shortcode: ${input.customCode}`);
    }
  }

  if (errors.length > 0) {
    alert(errors.join('\n'));
    return;
  }

  Logger.info('Submitting URLs', validInputs);


  try {
    const newLinks = await shortenUrls(validInputs);
    setShortenedUrls([...shortenedUrls, ...newLinks]);
    setUrlInputs([{ longUrl: '', validity: '', customCode: '' }]);
  } catch (err) {
    alert(err.message);
  }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      {urlInputs.map((input, index) => (
        <Box key={index} mb={2}>
          <UrlInputForm
            index={index}
            urlData={input}
            onChange={handleChange}
            onRemove={handleRemoveRow}
          />
        </Box>
      ))}

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleAddRow}
          disabled={urlInputs.length >= 5}
          sx={{ mr: 2 }}
        >
          Add Row
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Shorten URLs
        </Button>
      </Box>

      <ShortenedUrlList shortenedUrls={shortenedUrls} />
    </Container>
  );
};

export default HomePage;
