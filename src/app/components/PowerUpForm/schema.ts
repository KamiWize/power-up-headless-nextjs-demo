import { object, string, date, InferType } from 'yup';

const PHONE_NUMBER_REGEX = /^([+][0-9]){0,1}[-\s./0-9]{1,20}$/;
const EMAIL_ADDRESS_REGEX =
  /^[A-Z0-9]{1}[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const EMAIL_ADDRESS_REGEX_AUX =
  /(^[A-Z0-9._%+-]{1,64})@([A-Z0-9.-]{1,63})\.[A-Z]{2,}$/i;

export const schema = object({
  event_url: string().url().required(),
  event_start: date().required(),
  event_end: date().required(),
  event_status: string().required(),
  event_overview: string().required(),
  event_agenda: string(),
  event_speakers: string(),
  email: string()
    .matches(EMAIL_ADDRESS_REGEX, 'Invalid email address.')
    .matches(EMAIL_ADDRESS_REGEX_AUX, 'Invalid email address.')
    .required(),
  phone: string()
    .matches(PHONE_NUMBER_REGEX, 'Please provide a valid phone number')
    .required(),
  contact_info: string(),
  contact_name: string().required(),
}).required();

export type PowerUpFormData = InferType<typeof schema>;
