import React from 'react';
import { TextField, Grid, IconButton } from '@mui/material';


const UrlInputForm = ({ index, urlData, onChange, onRemove }) => {
  const handleChange = (e) => {
    onChange(index, { ...urlData, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <TextField
          fullWidth
          required
          name="longUrl"
          label="Long URL"
          value={urlData.longUrl}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          name="validity"
          label="Validity (mins)"
          type="number"
          value={urlData.validity}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          name="customCode"
          label="Custom Shortcode"
          value={urlData.customCode}
          onChange={handleChange}
        />
      </Grid>
      
    </Grid>
  );
};

export default UrlInputForm;
