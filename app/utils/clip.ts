export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err: unknown) {
    console.warn(err)
    return false;
  }
};
