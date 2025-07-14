import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const ShortenedUrlList = ({ shortenedUrls }) => {
  if (shortenedUrls.length === 0) return null;

  return (
    <div>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Shortened URLs
      </Typography>
      <List>
        {shortenedUrls.map((item, idx) => (
          <ListItem key={idx} divider>
            <ListItemText
              primary={`Short: http://localhost:3000/${item.shortcode}`}
              secondary={`Original: ${item.longUrl} | Validity: ${item.validity || 30} mins`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ShortenedUrlList;
