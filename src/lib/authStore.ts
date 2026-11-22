import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONFIG_FILE = path.join(DATA_DIR, 'admin-config.json');

export interface AdminConfig {
  password: string;
  companyEmail: string;
  resetCode: string | null;
  resetCodeExpiresAt: number | null;
  lastResetRequestedAt: string | null;
}

const DEFAULT_CONFIG: AdminConfig = {
  password: 'admin',
  companyEmail: 'info@homecirclerealty.in',
  resetCode: null,
  resetCodeExpiresAt: null,
  lastResetRequestedAt: null,
};

function ensureConfig(): AdminConfig {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');
    return DEFAULT_CONFIG;
  }

  try {
    const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading admin config:', err);
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: AdminConfig): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving admin config:', err);
    return false;
  }
}

export function checkPassword(password: string): boolean {
  const config = ensureConfig();
  return config.password === password;
}

export function generateResetCode(): { code: string; email: string; expiresAt: number } {
  const config = ensureConfig();
  // Generate a secure 6-digit numeric verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes validity

  config.resetCode = code;
  config.resetCodeExpiresAt = expiresAt;
  config.lastResetRequestedAt = new Date().toISOString();
  saveConfig(config);

  return {
    code,
    email: config.companyEmail,
    expiresAt,
  };
}

export function verifyResetCodeAndChangePassword(code: string, newPassword: string): { success: boolean; error?: string } {
  const config = ensureConfig();

  if (!config.resetCode || !config.resetCodeExpiresAt) {
    return { success: false, error: 'No active password reset request found. Please request a new code.' };
  }

  if (Date.now() > config.resetCodeExpiresAt) {
    return { success: false, error: 'Reset verification code has expired. Please request a new one.' };
  }

  if (config.resetCode !== code.trim()) {
    return { success: false, error: 'Invalid verification code. Please check the code sent to your email.' };
  }

  if (!newPassword || newPassword.length < 3) {
    return { success: false, error: 'Password must be at least 3 characters long.' };
  }

  config.password = newPassword;
  config.resetCode = null;
  config.resetCodeExpiresAt = null;
  saveConfig(config);

  return { success: true };
}

export function getCompanyEmail(): string {
  const config = ensureConfig();
  return config.companyEmail;
}
