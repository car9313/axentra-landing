export type LocaleErrorCode =
  | "GEO_DETECTION_FAILED"
  | "LOCALE_NOT_SUPPORTED"
  | "LOCALE_DOWNLOAD_FAILED"
  | "LOCALE_PARSE_ERROR";

export interface LocaleError {
  code: LocaleErrorCode;
  message: string;
}