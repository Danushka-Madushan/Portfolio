export class BaseConversion {

  /* Plain Text -> Hex */
  public static textToHex = (text: string): string => {
    const bytes = new TextEncoder().encode(text);
    return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
  };

  /* Hex -> Plain Text */
  public static hexToText = (hex: string): string => {
    if (hex.startsWith("0x")) hex = hex.slice(2);
    if (hex.length % 2 !== 0) {
      return "- inalivd hex string length -"
    }

    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }
    return new TextDecoder().decode(bytes);
  };
}
