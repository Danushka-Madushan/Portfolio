export class B64 {

  /* UTF-8 Safe Base64 Encode (TS) */
  public static base64Encode = (text: string): string => {
    const utf8 = new TextEncoder().encode(text);
    const bin = Array.from(utf8, b => String.fromCharCode(b)).join('');
    return btoa(bin);
  }

  /* UTF-8 Safe Base64 Decode (TS) */
  public static base64Decode = (base64: string): string => {
    try {
      const bin = atob(base64);
      const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "InvalidCharacterError") {
        return "- malformed B64 input -"
      }
      return "Uncought Exception!"
    }
  }

  /* Convert standard Base64 → URL-safe Base64 */
  public static base64ToUrlSafe = (base64: string): string => {
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  /* Convert URL-safe Base64 → standard Base64 */
  public static urlSafeToBase64 = (urlSafe: string): string => {
    /* Replace URL-safe characters back */
    let base64 = urlSafe.replace(/-/g, "+").replace(/_/g, "/");
    /* Pad with '=' to make length a multiple of 4 */
    while (base64.length % 4) {
      base64 += "=";
    }
    return base64;
  }
}
