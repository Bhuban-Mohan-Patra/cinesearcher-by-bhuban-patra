import dayjs from "dayjs";
import * as yup from "yup";

export const DEFAULT_PAGE_SIZE = 8;
export const DEFAULT_PAGE_NUMBER = 1;

export const yearSchema = yup
  .number()
  .min(1900, "Year must be at least 1888")
  .max(
    dayjs().year() + 5,
    `Year must be less than or equal to ${dayjs().year() + 5}`
  )
  .nullable()
  .transform(value => (isNaN(value) ? null : value));
