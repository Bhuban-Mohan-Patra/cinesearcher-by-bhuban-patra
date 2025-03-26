import dayjs from "dayjs";
import { t } from "i18next";
import * as yup from "yup";

export const DEFAULT_PAGE_SIZE = 8;
export const DEFAULT_PAGE_NUMBER = 1;

export const yearSchema = yup
  .number()
  .min(1900, t("validation.year.min"))
  .max(
    dayjs().year() + 5,
    t("validation.year.max", { year: dayjs().year() + 5 })
  )
  .nullable()
  .transform(value => (isNaN(value) ? null : value));
