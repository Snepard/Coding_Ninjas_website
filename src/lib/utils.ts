export const cn = (...inputs: Array<string | false | null | undefined>) =>
  inputs.filter(Boolean).join(" ");

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN").format(value);
