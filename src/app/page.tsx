import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function HomePage() {
  return (
    <Box>
      <div>
        <Alert severity="info" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>Demo</AlertTitle>
          This is a demo power up website.
        </Alert>
      </div>
    </Box>
  );
}
