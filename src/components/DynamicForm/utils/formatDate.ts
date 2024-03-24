import { format } from "date-fns";
import { DATE_INPUT_FORMAT } from "../const";

export const formatDate = (date: Date | string | undefined) =>
    date ? format(date, DATE_INPUT_FORMAT) : "";
