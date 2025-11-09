'use server'

import { ECDSACurve, RSAKeySize, SSHKeyPair } from 'dmtools@ssh-keygen';
import { generateKeyPairSync, KeyObject } from 'node:crypto';
import sshpk from 'sshpk';

/**
 * Options for Ed25519 key generation
 */
interface Ed25519Options {
  /** Optional passphrase to encrypt the private key */
  passphrase?: string;
  /** Optional comment to add to the public key */
  comment?: string;
}

/**
 * Options for RSA key generation
 */
interface RSAOptions {
  /** RSA key size in bits (2048, 3072, or 4096) */
  bitLength: RSAKeySize;
  /** Optional passphrase to encrypt the private key */
  passphrase?: string;
  /** Optional comment to add to the public key */
  comment?: string;
}

/**
 * Options for ECDSA key generation
 */
interface ECDSAOptions {
  /** ECDSA curve name */
  curve: ECDSACurve;
  /** Optional passphrase to encrypt the private key */
  passphrase?: string;
  /** Optional comment to add to the public key */
  comment?: string;
}

/**
 * Converts a KeyObject to OpenSSH format string with optional encryption
 * 
 * @param keyObject - The crypto KeyObject to convert
 * @param isPrivate - Whether this is a private key
 * @param passphrase - Optional passphrase for encryption
 * @param comment - Optional comment to add
 * @returns SSH-formatted key string
 */
function convertToSSHFormat(
  keyObject: KeyObject,
  isPrivate: boolean,
  passphrase?: string,
  comment?: string
): string {
  if (isPrivate) {
    // Export as PEM format first
    const pemKey = keyObject.export({
      format: 'pem',
      type: 'pkcs8',
      ...(passphrase && {
        cipher: 'aes-256-cbc',
        passphrase: passphrase
      })
    }) as string;

    // Parse with sshpk and convert to OpenSSH format
    const privateKey = sshpk.parsePrivateKey(pemKey, 'pem', { passphrase });

    if (passphrase) {
      return privateKey.toString('openssh', { passphrase });
    }

    return privateKey.toString('openssh');
  } else {
    // Export public key as PEM
    const pemKey = keyObject.export({
      format: 'pem',
      type: 'spki'
    }) as string;

    // Parse with sshpk and convert to OpenSSH format
    const publicKey = sshpk.parseKey(pemKey, 'pem');

    // Set comment if provided
    if (comment) {
      publicKey.comment = comment;
    }

    return publicKey.toString('ssh');
  }
}

/**
 * Calculates SHA256 fingerprint of a public key in OpenSSH format
 * 
 * @param publicKeySSH - Public key in OpenSSH format
 * @returns SHA256 fingerprint string (e.g., "SHA256:abc123...")
 */
function calculateFingerprint(publicKeySSH: string): string {
  try {
    const key = sshpk.parseKey(publicKeySSH, 'ssh');
    const fingerprint = key.fingerprint('sha256');
    return fingerprint.toString();
  } catch (error) {
    throw new Error(`Failed to calculate fingerprint: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Generates an Ed25519 SSH key pair
 * 
 * Ed25519 is a modern, fast, and secure elliptic curve signature scheme.
 * It provides 128-bit security and is recommended for new SSH keys.
 * Ed25519 keys are always 256 bits long.
 * 
 * @param options - Configuration options for key generation
 * @returns Object containing public key, private key, and SHA256 fingerprint
 * 
 * @example
 * ```typescript
 * const keys = generateEd25519Keys({
 *   passphrase: 'my-secure-passphrase',
 *   comment: 'user@hostname'
 * });
 * console.log(keys.fingerprint);
 * ```
 */
export const generateEd25519Keys = async (options: Ed25519Options = {}): Promise<SSHKeyPair> => {
  const { passphrase, comment } = options;

  // Generate Ed25519 key pair using Node.js crypto
  // Returns KeyObject instances for proper type safety
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');

  // Convert to SSH format
  const publicKeySSH = convertToSSHFormat(publicKey, false, undefined, comment);
  const privateKeySSH = convertToSSHFormat(privateKey, true, passphrase);

  // Calculate fingerprint
  const fingerprint = calculateFingerprint(publicKeySSH);

  return {
    public_key: publicKeySSH,
    private_key: privateKeySSH,
    fingerprint
  };
}

/**
 * Generates an RSA SSH key pair
 * 
 * RSA is a widely-supported public-key algorithm. For security, use at least
 * 2048 bits, with 3072 or 4096 bits recommended for higher security requirements.
 * Larger keys provide better security but slower performance.
 * 
 * @param options - Configuration options including bit length (2048, 3072, or 4096)
 * @returns Object containing public key, private key, and SHA256 fingerprint
 * 
 * @example
 * ```typescript
 * const keys = generateRSAKeys({
 *   bitLength: 4096,
 *   passphrase: 'my-secure-passphrase',
 *   comment: 'user@hostname'
 * });
 * console.log(keys.fingerprint);
 * ```
 */
export const generateRSAKeys = async (options: RSAOptions): Promise<SSHKeyPair> => {
  try {
    const { bitLength, passphrase, comment } = options;

    // Validate bit length
    if (![2048, 3072, 4096].includes(bitLength)) {
      throw new Error('Invalid RSA bit length. Must be 2048, 3072, or 4096');
    }

    // Generate RSA key pair using Node.js crypto
    // Returns KeyObject instances for proper type safety
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: bitLength,
      publicExponent: 65537 // Standard public exponent (0x10001)
    });

    // Convert to SSH format
    const publicKeySSH = convertToSSHFormat(publicKey, false, undefined, comment);
    const privateKeySSH = convertToSSHFormat(privateKey, true, passphrase);

    // Calculate fingerprint
    const fingerprint = calculateFingerprint(publicKeySSH);

    return {
      public_key: publicKeySSH,
      private_key: privateKeySSH,
      fingerprint
    };
  } catch (error) {
    throw new Error(`Failed to generate RSA keys: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Generates an ECDSA SSH key pair
 * 
 * ECDSA (Elliptic Curve Digital Signature Algorithm) provides strong security
 * with smaller key sizes compared to RSA:
 * - nistp256 (256-bit): ~128-bit security, fast
 * - nistp384 (384-bit): ~192-bit security, balanced
 * - nistp521 (521-bit): ~256-bit security, highest security
 * 
 * @param options - Configuration options including curve selection
 * @returns Object containing public key, private key, and SHA256 fingerprint
 * 
 * @example
 * ```typescript
 * const keys = generateECDSAKeys({
 *   curve: 'nistp384',
 *   passphrase: 'my-secure-passphrase',
 *   comment: 'user@hostname'
 * });
 * console.log(keys.fingerprint);
 * ```
 */
export const generateECDSAKeys = async (options: ECDSAOptions): Promise<SSHKeyPair> => {
  try {
    const { curve, passphrase, comment } = options;

    // Map SSH curve names to Node.js curve names
    const curveMap: Record<ECDSACurve, string> = {
      'nistp256': 'prime256v1',
      'nistp384': 'secp384r1',
      'nistp521': 'secp521r1'
    };

    const namedCurve = curveMap[curve];
    if (!namedCurve) {
      throw new Error(`Invalid ECDSA curve. Must be one of: nistp256, nistp384, nistp521`);
    }

    // Generate ECDSA key pair using Node.js crypto
    // Returns KeyObject instances for proper type safety
    const { publicKey, privateKey } = generateKeyPairSync('ec', {
      namedCurve
    });

    // Convert to SSH format
    const publicKeySSH = convertToSSHFormat(publicKey, false, undefined, comment);
    const privateKeySSH = convertToSSHFormat(privateKey, true, passphrase);

    // Calculate fingerprint
    const fingerprint = calculateFingerprint(publicKeySSH);

    return {
      public_key: publicKeySSH,
      private_key: privateKeySSH,
      fingerprint
    };
  } catch (error) {
    throw new Error(`Failed to generate ECDSA keys: ${error instanceof Error ? error.message : String(error)}`);
  }
}
