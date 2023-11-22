'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Container from '@mui/material/Container';
import { Box, Button, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { PowerUpFormData, schema } from '@/app/components/PowerUpForm/schema';
import PowerUpForm, {
  componentId,
} from '@/app/components/PowerUpForm/PowerUpForm';
import * as ComposerHandler from '@/app/utils';

export default function SearchView() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      event_start: new Date(),
      event_end: new Date(),
    },
  });

  const onSubmit = (data: PowerUpFormData) => {
    //getStarterPowerUpANS creates an object with the necessary ANS keys
    const ansStarter = ComposerHandler.getStarterPowerUpANS();
    const ansCustomEmbed = {
      ...ansStarter,
      //Your data is stored in the config object
      config: {
        ...data,
      },
    };
    //Save the data by sending the ANS object with a "data" message
    ComposerHandler.sendMessage('data', ansCustomEmbed);
  };

  const cancel = () => {
    //Cancel the iFrame by sending a "cancel" message
    ComposerHandler.sendMessage('cancel');
  };

  useEffect(() => {
    //Composer always requires a "ready" message
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  return (
    <Container
      sx={{
        '&.MuiContainer-root': {
          maxWidth: 448,
        },
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <FormProvider {...methods}>
          <PowerUpForm onSubmit={onSubmit} />
        </FormProvider>
      </Box>
      <Stack flexDirection="row" justifyContent="flex-end" alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginRight: '1rem' }}
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" form={componentId}>
          Save
        </Button>
      </Stack>
    </Container>
  );
}
