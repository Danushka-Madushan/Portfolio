import sshpk from 'sshpk';
import { KeyFileData, PrivateKeyFormat, SSHKeyPair } from 'dmtools@ssh-keygen';

/**
 * * Options for preparing key files for download
 * */
export interface PrepareKeyFilesOptions {
  /** Format for the private key (default: 'openssh') */
  format: PrivateKeyFormat;
  /** Optional passphrase to encrypt the private key if not openssh */
  passphrase?: string;
}

/**
 * Prepares SSH key pair file data for web download with format conversion support
 * 
 * This function prepares the private and public keys as downloadable content.
 * It supports multiple private key formats:
 * - openssh: Modern OpenSSH format (default, recommended)
 * - pkcs8: PKCS#8 format (widely compatible)
 * - pkcs1: PKCS#1 format (legacy, for older tools)
 * 
 * Returns an object containing the file names and contents ready to be
 * downloaded in a web browser using the File API or Blob.
 * 
 * @param keyPair - The SSH key pair object to prepare
 * @param options - Configuration options for filename and format
 * @returns Object containing file data ready for download
 * 
 * @example
 * ```typescript
 * const keys = generateEd25519Keys({ comment: 'user@hostname' });
 * 
 * // Prepare in default OpenSSH format
 * const fileData = prepareKeyFilesForDownload(keys, {
 *   filename: 'id_ed25519'
 * });
 * 
 * // Prepare in PKCS#8 format for compatibility
 * const fileDataPKCS8 = prepareKeyFilesForDownload(keys, {
 *   filename: 'id_ed25519_pkcs8',
 *   format: 'pkcs8'
 * });
 * ```
 */
export function prepareKeyFilesForDownload(
  keyPair: SSHKeyPair,
  options: PrepareKeyFilesOptions
): KeyFileData {
  try {
    const {
      format = 'openssh',
      passphrase
    } = options;

    let privateKeyContent = keyPair.private_key;

    // Convert private key format if needed
    if (format !== 'openssh') {
      try {
        const privateKey = sshpk.parsePrivateKey(keyPair.private_key, 'openssh', { passphrase });

        switch (format) {
          case 'pkcs8':
            privateKeyContent = privateKey.toString('pkcs8');
            break;
          case 'pkcs1':
            privateKeyContent = privateKey.toString('pkcs1');
            break;
          default:
            throw new Error(`Unsupported format: ${format}`);
        }
      } catch (error) {
        throw new Error(`Failed to convert private key to ${format} format: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return {
      privateKeyFilename: `id_${format}`,
      privateKeyContent: privateKeyContent,
      publicKeyFilename: `id_${format}.pub`,
      publicKeyContent: keyPair.public_key,
      fingerprint: keyPair.fingerprint,
    };
  } catch (error) {
    throw new Error(`Failed to prepare key pair files: ${error instanceof Error ? error.message : String(error)}`);
  }
}
