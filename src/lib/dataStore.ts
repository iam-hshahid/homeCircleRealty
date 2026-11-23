import fs from 'fs';
import path from 'path';
import { Property, Inquiry } from '@/types/property';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data folder exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getProperties(): Property[] {
  ensureDataDir();
  if (!fs.existsSync(PROPERTIES_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(PROPERTIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading properties:', error);
    return [];
  }
}

export function saveProperties(properties: Property[]): boolean {
  ensureDataDir();
  try {
    fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(properties, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing properties:', error);
    return false;
  }
}

export function getPropertyById(id: string): Property | undefined {
  const properties = getProperties();
  return properties.find(p => p.id === id || p.slug === id);
}

export function addProperty(propertyData: Omit<Property, 'id' | 'createdAt'> & { id?: string }): Property {
  const properties = getProperties();
  const newId = propertyData.id || `hc-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  
  // Format slug if not provided
  const slug = propertyData.slug || propertyData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const newProperty: Property = {
    ...propertyData,
    id: newId,
    slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  properties.unshift(newProperty);
  if (!saveProperties(properties)) {
    throw new Error('Failed to save property data');
  }
  return newProperty;
}

export function updateProperty(id: string, updates: Partial<Property>): Property | null {
  const properties = getProperties();
  const index = properties.findIndex(p => p.id === id || p.slug === id);
  if (index === -1) return null;

  properties[index] = {
    ...properties[index],
    ...updates,
    id: properties[index].id, // preserve ID
    updatedAt: new Date().toISOString(),
  };

  saveProperties(properties);
  return properties[index];
}

export function deleteProperty(id: string): boolean {
  const properties = getProperties();
  const filtered = properties.filter(p => p.id !== id && p.slug !== id);
  if (filtered.length === properties.length) return false;
  saveProperties(filtered);
  return true;
}

// Inquiries / Leads
export function getInquiries(): Inquiry[] {
  ensureDataDir();
  if (!fs.existsSync(INQUIRIES_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading inquiries:', error);
    return [];
  }
}

export function saveInquiries(inquiries: Inquiry[]): boolean {
  ensureDataDir();
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing inquiries:', error);
    return false;
  }
}

export function addInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiryData,
    id: `inq-${Date.now().toString(36)}`,
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  inquiries.unshift(newInquiry);
  saveInquiries(inquiries);
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry | null {
  const inquiries = getInquiries();
  const index = inquiries.findIndex(i => i.id === id);
  if (index === -1) return null;

  inquiries[index].status = status;
  saveInquiries(inquiries);
  return inquiries[index];
}
