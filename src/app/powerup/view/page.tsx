'use client';

import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { PowerUpFormData } from '@/app/components/PowerUpForm/schema';
import * as ComposerHandler from '@/app/utils';

type PowerUpInformation =
  | PowerUpFormData & { event_start: string; event_end: string };

export default function ViewView() {
  const [config, setConfig] = useState<PowerUpInformation | undefined>();

  useEffect(() => {
    //Composer always requires a "ready" message
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    //getPayload parses the data from the iFrame URL
    //giving you access to whatever you have stored in config
    const data = ComposerHandler.getPayload() as {
      config: PowerUpInformation;
    };

    setConfig(data.config);
  }, []);

  return (
    <Container>
      <Box>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight="bold">
            Event information
          </Typography>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Event URL:</Typography>
              <Typography>{config?.event_url}</Typography>
            </Grid>
          </Grid>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Event start:</Typography>
              <Typography>{config?.event_start}</Typography>
            </Grid>
          </Grid>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Event end:</Typography>
              <Typography>{config?.event_end}</Typography>
            </Grid>
          </Grid>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Event status:</Typography>
              <Typography>{config?.event_status}</Typography>
            </Grid>
          </Grid>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Event overview:</Typography>
              <Typography>{config?.event_overview}</Typography>
            </Grid>
          </Grid>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Event agenda:</Typography>
              <Typography>{config?.event_agenda}</Typography>
            </Grid>
          </Grid>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Event speakers:</Typography>
              <Typography>{config?.event_speakers}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h5" fontWeight="bold">
            Contact information
          </Typography>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Email</Typography>
              <Typography>{config?.email}</Typography>
            </Grid>
          </Grid>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Information</Typography>
              <Typography>{config?.contact_info}</Typography>
            </Grid>
          </Grid>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Phone</Typography>
              <Typography>{config?.phone}</Typography>
            </Grid>
          </Grid>
          <Grid container mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Full name</Typography>
              <Typography>{config?.contact_name}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
}
