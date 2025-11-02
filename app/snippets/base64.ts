export const JS_CODE_SNIPPET_WEB = `/* UTF-8 Safe Base64 Encode */
const base64Encode = (text) => {
  const utf8 = new TextEncoder().encode(text);
  const bin = Array.from(utf8, b => String.fromCharCode(b)).join('');
  return btoa(bin);
}

/* UTF-8 Safe Base64 Decode */
const base64Decode = (base64) => {
  const bin = atob(base64);
  const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}`;

export const TS_CODE_SNIPPET_WEB = `/* UTF-8 Safe Base64 Encode (TS) */
const base64Encode = (text: string): string => {
  const utf8 = new TextEncoder().encode(text);
  const bin = Array.from(utf8, b => String.fromCharCode(b)).join('');
  return btoa(bin);
}

/* UTF-8 Safe Base64 Decode (TS) */
const base64Decode = (base64: string): string => {
  const bin = atob(base64);
  const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}`

export const JS_CODE_SNIPPET_SERVER = `/* UTF-8 Safe Base64 Encode */
const base64Encode = (text) => {
  return Buffer.from(text, 'utf8').toString('base64');
}

/* UTF-8 Safe Base64 Decode */
const base64Decode = (base64) => {
  return Buffer.from(base64, 'base64').toString('utf8');
}`

export const TS_CODE_SNIPPET_SERVER = `/* UTF-8 Safe Base64 Encode (TS) */
const base64Encode = (text: string): string => {
  return Buffer.from(text, 'utf8').toString('base64');
}

/* UTF-8 Safe Base64 Decode (TS) */
const base64Decode = (base64: string): string => {
  return Buffer.from(base64, 'base64').toString('utf8');
}`

export const CSHARP_CODE_SNIPPET = `using System;
using System.Text;

public static class Base64Helper
{
    // UTF-8 Safe Base64 Encode
    public static string Base64Encode(string plainText)
    {
        byte[] bytes = Encoding.UTF8.GetBytes(plainText);
        return Convert.ToBase64String(bytes);
    }

    // UTF-8 Safe Base64 Decode
    public static string Base64Decode(string base64Encoded)
    {
        byte[] bytes = Convert.FromBase64String(base64Encoded);
        return Encoding.UTF8.GetString(bytes);
    }
}`

export const JAVA_CODE_SNIPPET = `import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class Base64Helper {

    // UTF-8 Safe Base64 Encode
    public static String base64Encode(String text) {
        return Base64.getEncoder().encodeToString(
          text.getBytes(StandardCharsets.UTF_8)
        );
    }

    // UTF-8 Safe Base64 Decode
    public static String base64Decode(String base64) {
        byte[] bytes = Base64.getDecoder().decode(base64);
        return new String(bytes, StandardCharsets.UTF_8);
    }
}`

export const PYTHON_CODE_SNIPPET = `import base64

def base64_encode(text: str) -> str:
    # UTF-8 safe Base64 encode
    return base64.b64encode(text.encode('utf-8')).decode('utf-8')

def base64_decode(base64_text: str) -> str:
    # UTF-8 safe Base64 decode
    return base64.b64decode(base64_text.encode('utf-8')).decode('utf-8')`

export const GO_CODE_SNIPPET = `package main

import (
	"encoding/base64"
	"fmt"
)

// UTF-8 Safe Base64 Encode
func Base64Encode(text string) string {
	return base64.StdEncoding.EncodeToString([]byte(text))
}

// UTF-8 Safe Base64 Decode
func Base64Decode(encoded string) (string, error) {
	bytes, err := base64.StdEncoding.DecodeString(encoded)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}`
