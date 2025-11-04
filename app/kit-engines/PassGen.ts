export interface PasswordOptions {
  length: number;                /* final total length AFTER prefix/suffix */
  useUpper: boolean;
  useLower: boolean;
  useNumbers: boolean;
  useSpecial: boolean;

  prefix: string;
  suffix: string;

  wordToContain: string;        /* must appear somewhere */
  avoidAmbiguous: boolean;      /* O/0 I/l/1 etc */
}

type PasswordStrength = "Very weak" | "Weak" | "Moderate" | "Strong" | "Very strong";

interface PasswordAnalysis {
  strength: PasswordStrength;
  length: number;
  timetocrack: string;
  entropy: number;
  charactersetsize: number;
  score: number;
}

export class PassGen {
  private static formatTimeToCrack = (seconds: number): string => {
    if (seconds < 0.001) return "Instant";
    if (seconds < 1) return `${Math.round(seconds * 1000)} ms`;
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;

    const years = seconds / 31536000;
    if (years < 1000) return `${Math.round(years)} years`;
    if (years < 1_000_000) return `${Math.round(years / 1000)} thousand years`;
    if (years < 1_000_000_000) return `${Math.round(years / 1_000_000)} million years`;
    if (years < 1_000_000_000_000) return `${Math.round(years / 1_000_000_000)} billion years`;

    return "Beyond human comprehension";
  };

  private static hasRepeatingCharacters = (password: string): boolean => {
    return /(.)\1{2,}/.test(password); // 3 or more repeated characters
  };

  private static hasSequentialCharacters = (password: string): boolean => {
    const sequences = ['abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk',
      'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst',
      'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz', '123', '234', '345',
      '456', '567', '678', '789'];

    const lowerPassword = password.toLowerCase();
    return sequences.some(seq => lowerPassword.includes(seq));
  };

  public static generatePassword = ({
    length,
    useUpper,
    useLower,
    useNumbers,
    useSpecial,
    prefix,
    suffix,
    wordToContain,
    avoidAmbiguous
  }: PasswordOptions): string => {
    // Return empty string for invalid length
    if (length < 1) return "";

    // Character sets
    const upper = avoidAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = avoidAmbiguous ? "abcdefghijkmnopqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
    const nums = avoidAmbiguous ? "23456789" : "0123456789";
    const spec = "!@#$%^&*()-_=+[]{}<>?/|~";

    // Build character pool
    let pool = "";
    if (useUpper) pool += upper;
    if (useLower) pool += lower;
    if (useNumbers) pool += nums;
    if (useSpecial) pool += spec;

    // Return empty string if no character classes selected
    if (!pool) return "";

    // Calculate core length
    const coreLength = length - prefix.length - suffix.length;

    // Return empty string if prefix/suffix are too long
    if (coreLength < 0) return "";

    // Return empty string if wordToContain is too long for the core
    if (wordToContain.length > coreLength) return "";

    // Calculate how many random characters we need
    const randomCharsNeeded = coreLength - wordToContain.length;

    // Generate random characters
    let randomChars = "";
    if (randomCharsNeeded > 0) {
      const rnd = crypto.getRandomValues(new Uint32Array(randomCharsNeeded));
      for (let i = 0; i < randomCharsNeeded; i++) {
        randomChars += pool[rnd[i] % pool.length];
      }
    }

    // Build core: insert wordToContain at random position if provided
    let core = "";
    if (wordToContain.length > 0) {
      // Use crypto for random position
      const randomValue = crypto.getRandomValues(new Uint32Array(1))[0];
      const maxPosition = randomChars.length + 1;
      const position = randomValue % maxPosition;

      core = randomChars.slice(0, position) + wordToContain + randomChars.slice(position);
    } else {
      core = randomChars;
    }

    return prefix + core + suffix;
  }

  public static analyzePasswordStrength = (password: string): PasswordAnalysis => {
    const length = password.length;

    // Determine character set size
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[^a-zA-Z0-9]/.test(password);

    let charactersetsize = 0;
    if (hasLowercase) charactersetsize += 26;
    if (hasUppercase) charactersetsize += 26;
    if (hasNumbers) charactersetsize += 10;
    if (hasSpecialChars) charactersetsize += 33; // Common special characters

    // Calculate entropy (bits)
    const entropy = length === 0 ? 0 : Math.log2(Math.pow(charactersetsize, length));

    // Calculate time to crack (assuming 1 billion guesses per second)
    const guessesPerSecond = 1_000_000_000;
    const possibleCombinations = Math.pow(charactersetsize, length);
    const secondsToCrack = possibleCombinations / (2 * guessesPerSecond); // Average case: half the combinations

    // Convert to human-readable format
    const timetocrack = this.formatTimeToCrack(secondsToCrack);

    // Determine strength based on entropy and other factors
    let strength: PasswordStrength;
    let baseScore = 0;

    if (entropy < 28) {
      strength = "Very weak";
      baseScore = 20;
    } else if (entropy < 36) {
      strength = "Weak";
      baseScore = 40;
    } else if (entropy < 60) {
      strength = "Moderate";
      baseScore = 60;
    } else if (entropy < 128) {
      strength = "Strong";
      baseScore = 80;
    } else {
      strength = "Very strong";
      baseScore = 95;
    }

    // Calculate final score with bonuses/penalties
    let score = baseScore;

    // Length bonuses
    if (length >= 12) score += 5;
    if (length >= 16) score += 5;

    // Character diversity bonuses
    let diversityCount = 0;
    if (hasLowercase) diversityCount++;
    if (hasUppercase) diversityCount++;
    if (hasNumbers) diversityCount++;
    if (hasSpecialChars) diversityCount++;

    if (diversityCount === 4) score += 10;
    else if (diversityCount === 3) score += 5;

    // Penalties
    if (length < 8) score -= 15;
    if (this.hasRepeatingCharacters(password)) score -= 10;
    if (this.hasSequentialCharacters(password)) score -= 10;

    // Clamp score between 0 and 100
    score = Math.max(0, Math.min(100, score));

    return {
      strength,
      length,
      timetocrack,
      entropy: Math.round(entropy * 100) / 100, // Round to 2 decimal places
      charactersetsize,
      score
    };
  };
}
