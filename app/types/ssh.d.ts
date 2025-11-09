declare module 'dmtools@ssh-keygen' {
  /**
   * Private key format options
   */
  export type PrivateKeyFormat = 'openssh' | 'pkcs8' | 'pkcs1';

  /**
   * Result object containing file data ready for download
   */
  export interface KeyFileData {
    /** Private key filename */
    privateKeyFilename: string;
    /** Private key content */
    privateKeyContent: string;
    /** Public key filename */
    publicKeyFilename: string;
    /** Public key content */
    publicKeyContent: string;
    /** SHA256 fingerprint */
    fingerprint: string;
  }

  /**
   * Supported ECDSA curves with their bit sizes
  */
  export type ECDSACurve = 'nistp256' | 'nistp384' | 'nistp521';

  /**
   * * Supported RSA key bit lengths
  */
  type RSAKeySize = 2048 | 3072 | 4096;

  /**
   * Result object containing generated SSH key pair
   */
  export interface SSHKeyPair {
    public_key: string;
    private_key: string;
    fingerprint: string;
  }
}
