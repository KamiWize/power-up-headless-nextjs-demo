'use client';

import Box from '@mui/material/Box';
import { Controller, useFormContext } from 'react-hook-form';
import { PowerUpFormData } from './schema';
import { Stack, TextField } from '@mui/material';

export const componentId = 'power-up-form';

type Props = {
  onSubmit: (data: PowerUpFormData) => void;
};

export default function PowerUpForm({ onSubmit }: Props) {
  const methods = useFormContext<PowerUpFormData>();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <Box
      id={componentId}
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      display="block"
      noValidate
    >
      <Stack direction="column" spacing={3}>
        <Controller
          control={control}
          name="event_url"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              value={value}
              onChange={onChange}
              id={`${componentId}-event_url`}
              name={`${componentId}-event_url`}
              label="Event URL"
              error={!!errors.event_url}
              helperText={errors.event_url?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="event_status"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              value={value}
              onChange={onChange}
              id={`${componentId}-event_status`}
              name={`${componentId}-event_status`}
              label="Event status"
              error={!!errors.event_status}
              helperText={errors.event_status?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="event_start"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              type="date"
              value={value}
              onChange={onChange}
              id={`${componentId}-event_start`}
              name={`${componentId}-event_start`}
              label="Event start"
              error={!!errors.event_start}
              helperText={errors.event_start?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="event_end"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              type="date"
              value={value}
              onChange={onChange}
              id={`${componentId}-event_end`}
              name={`${componentId}-event_end`}
              label="Event end"
              error={!!errors.event_end}
              helperText={errors.event_end?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="event_overview"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              value={value}
              onChange={onChange}
              id={`${componentId}-event_overview`}
              name={`${componentId}-event_overview`}
              label="Event overview"
              error={!!errors.event_overview}
              helperText={errors.event_overview?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="event_speakers"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              value={value}
              onChange={onChange}
              id={`${componentId}-event_speakers`}
              name={`${componentId}-event_speakers`}
              label="Event speakers"
              error={!!errors.event_speakers}
              helperText={errors.event_speakers?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="event_agenda"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              value={value}
              onChange={onChange}
              id={`${componentId}-event_agenda`}
              name={`${componentId}-event_agenda`}
              label="Event agenda"
              error={!!errors.event_agenda}
              helperText={errors.event_agenda?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="contact_name"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              value={value}
              onChange={onChange}
              id={`${componentId}-contact_name`}
              name={`${componentId}-contact_name`}
              label="Contact name"
              error={!!errors.contact_name}
              helperText={errors.contact_name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              type="email"
              value={value}
              onChange={onChange}
              id={`${componentId}-email`}
              name={`${componentId}-email`}
              label="Contact email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              value={value}
              onChange={onChange}
              id={`${componentId}-phone`}
              name={`${componentId}-phone`}
              label="Contact phone"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="contact_info"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              required
              value={value}
              onChange={onChange}
              id={`${componentId}-contact_info`}
              name={`${componentId}-contact_info`}
              label="Contact info"
              error={!!errors.contact_info}
              helperText={errors.contact_info?.message}
            />
          )}
        />
      </Stack>
    </Box>
  );
}
