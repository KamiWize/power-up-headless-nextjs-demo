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

export default function SearchEdit() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      contact_info: '',
      contact_name: '',
      email: '',
      event_agenda: '',
      event_overview: '',
      event_speakers: '',
      event_status: '',
      phone: '',
      event_url: '',
      event_start: new Date().toISOString().substring(0, 10) as any,
      event_end: new Date().toISOString().substring(0, 10) as any,
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

    //getPayload parses the data from the iFrame URL
    //giving you access to whatever you have stored in config
    const data = ComposerHandler.getPayload() as { config: PowerUpFormData };

    if (!data?.config) return;

    methods.setValue('contact_info', data?.config?.contact_info);
    methods.setValue('contact_name', data?.config?.contact_name);
    methods.setValue('email', data?.config?.email);
    methods.setValue('event_agenda', data?.config?.event_agenda);

    methods.setValue(
      'event_end',
      new Date(data?.config?.event_end ?? '')
        .toISOString()
        .substring(0, 10) as any
    );
    methods.setValue('event_overview', data?.config?.event_overview);
    methods.setValue('event_speakers', data?.config?.event_speakers);
    methods.setValue(
      'event_start',
      new Date(data?.config?.event_start ?? '')
        .toISOString()
        .substring(0, 10) as any
    );
    methods.setValue('event_status', data?.config?.event_status);
    methods.setValue('event_url', data?.config?.event_url);
    methods.setValue('phone', data?.config?.phone);
  }, [methods]);

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
