interface ValidationResult<T> {
  errors: T;
  validationErrors: { [key: string]: string };
}

export const updateUrlWithErrors = <T extends { [key: string]: string }>(
  pageUrl: string,
  validationResult: ValidationResult<T>,
  onChangeUrl: (newUrl: string) => void
) => {
  const url = new URL(pageUrl);
  const urlParams = new URLSearchParams(url.search);

  Object.keys(validationResult.validationErrors).forEach((key) => {
    urlParams.set(key, validationResult.validationErrors[key]);
  });

  url.search = urlParams.toString();
  onChangeUrl(url.toString());
};
