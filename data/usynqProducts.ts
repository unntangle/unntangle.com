// uSYNQ Smart Living product list for the showcase page.
// No prices, no quantities. This is a brochure/showcase only.
// Images are served from /public/images/uSYNQ/<category folder>/<filename>.

export type UsynqCategoryId =
  | 'titan-smart-switches'
  | 'touch-switches'
  | 'retrofit-modules'
  | 'smart-door-locks';

export interface UsynqCategory {
  id: UsynqCategoryId;
  label: string;
  description: string;
}

export interface UsynqProduct {
  id: string;          // Stable slug, used for keys
  name: string;        // Clean display name (no SKU prefixes)
  sku?: string;        // Original part / model number, shown subtly
  category: UsynqCategoryId;
  image: string;       // Public path
  tags: string[];      // e.g. ['ZigBee', '4M', 'Curtain']
}

// Display order: Touch Switches first (the most common entry point for home
// buyers), then TITAN, then Smart Door Locks, then retrofit modules. Changing
// the order here re-orders the tab bar, the "All Products" feed, and the
// brand-page category showcase — they all read from this single array.
export const usynqCategories: UsynqCategory[] = [
  {
    id: 'touch-switches',
    label: 'Touch Switches',
    description:
      'The Velux and Luxeray touch panel range. Glass-finish ZigBee + WiFi switches for lights, fans, curtains and 5-pin sockets in every common configuration.',
  },
  {
    id: 'titan-smart-switches',
    label: 'TITAN Smart Switches',
    description:
      'Aluminium-grey ZigBee switch panels engineered for premium installations, from 6-switch modules to fully loaded 18-switch master controllers.',
  },
  {
    id: 'smart-door-locks',
    label: 'Smart Door Locks',
    description:
      'Biometric, RF-ID, NFC, and face-recognition locks for residential, glass, villa and aluminium doors. Bluetooth, WiFi and ZigBee editions.',
  },
  {
    id: 'retrofit-modules',
    label: 'Retrofit Modules',
    description:
      'Concealed in-wall ZigBee modules that turn any conventional switchboard smart, with heavy-duty relays and curtain controllers.',
  },
];

// Folder name on disk (must match exactly what's under /public/images/uSYNQ/)
const FOLDER: Record<UsynqCategoryId, string> = {
  'titan-smart-switches': 'TITAN Smart Switches',
  'touch-switches': 'Touch Switches',
  'retrofit-modules': 'Retrofit Modules',
  'smart-door-locks': 'Smart Door Locks',
};

const img = (cat: UsynqCategoryId, file: string) =>
  `/images/uSYNQ/${FOLDER[cat]}/${file}`;

export const usynqProducts: UsynqProduct[] = [
  // ============================================================
  // TITAN Smart Switches  (Brushed Aluminium Grey, ZigBee)
  // ============================================================
  {
    id: 'titan-sr1',
    sku: 'SR1',
    name: 'TITAN 6 Switch Panel - 2M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-2M (6S) AL] SR1. TITAN ZigBee 6 Switch (4L+2SC) _ 2M (6S) (Brushed Aluminium Grey) (1).png'),
    tags: ['ZigBee', '6 Switch', '2M'],
  },
  {
    id: 'titan-sr2',
    sku: 'SR2',
    name: 'TITAN 4 Switch + 5 Pin Socket + USB-A/C Fast Charger - 4M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-4M (4S+SK) AL] SR2. TITAN ZigBee 4 Switch + 5 Pin Socket + USB Type A & C 18W Fast charging (4L - 1L+1F) _ 4M (4S+SK)  (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '4 Switch', 'USB Charger', '4M'],
  },
  {
    id: 'titan-sr3',
    sku: 'SR3',
    name: 'TITAN 6 Switch + 5 Pin Socket + USB-A/C Fast Charger - 4M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-4M (6S+SK) AL] SR3. TITAN ZigBee 6 Switch + 5 Pin Socket + USB Type A & C 18W Fast charging (4L+2SC - 1L+1F+2SC) _ 4M (6S+SK) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '6 Switch', 'USB Charger', '4M'],
  },
  {
    id: 'titan-sr5',
    sku: 'SR5',
    name: 'TITAN 8 Switch Panel - 4M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-4M (4S+4S) AL] SR5. TITAN ZigBee 8 Switch (4L+4SC - 1L+1F+4SC) _ 4M (4S+4S) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '8 Switch', '4M'],
  },
  {
    id: 'titan-sr6',
    sku: 'SR6',
    name: 'TITAN 10 Switch Panel - 4M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-4M (4S+6S) AL] SR6. TITAN ZigBee 10 Switch (4L+6SC - 1L+1F+6SC) _ 4M (4S+6S) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '10 Switch', '4M'],
  },
  {
    id: 'titan-sr7',
    sku: 'SR7',
    name: 'TITAN 12 Switch Panel - 4M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-4M (6S+6S) AL] SR7. TITAN ZigBee 12 Switch (4L+8SC - 1L+1F+8SC) _ 4M (6S+6S) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '12 Switch', '4M'],
  },
  {
    id: 'titan-sr8',
    sku: 'SR8',
    name: 'TITAN 4-Zone Lighting Knob + 4 Switch - 4M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-4M (K+4S) AL] SR8. TITAN ZigBee Knob For 4 Zone Zigbee Lighting Brightness & Color Control + 4 Switch (4L - 1L+1F) _ 4M (K+4S) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', 'Lighting Knob', '4 Switch', '4M'],
  },
  {
    id: 'titan-sr9',
    sku: 'SR9',
    name: 'TITAN 4-Zone Lighting Knob + 6 Switch - 4M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-4M (K+6S) AL] SR9. TITAN ZigBee Knob For 4 Zone Zigbee Lighting Brightness & Color Control + 6 Switch (4L+2SC - 1L+1F+2SC) _ 4M (K+6S) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', 'Lighting Knob', '6 Switch', '4M'],
  },
  {
    id: 'titan-sr10',
    sku: 'SR10',
    name: 'TITAN 8 Switch + 5 Pin Socket - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (4S+4S+SK) AL] SR10. TITAN ZigBee 8 Switch (10L - 7L+1F) _ 6-8M (4S+4S+SK) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '8 Switch', '5 Pin Socket', '6-8M'],
  },
  {
    id: 'titan-sr11',
    sku: 'SR11',
    name: 'TITAN 10 Switch + 5 Pin Socket - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (4S+6S+SK) AL] SR11. TITAN ZigBee 10 Switch (10L - 7L+1F) _ 6-8M (4S+6S+SK) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '10 Switch', '5 Pin Socket', '6-8M'],
  },
  {
    id: 'titan-sr12',
    sku: 'SR12',
    name: 'TITAN 12 Switch + 5 Pin Socket - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (6S+6S+SK) AL] SR12. TITAN ZigBee 12 Switch (10L+2SC - 7L+1F+2SC) _ 6-8M (6S+6S+SK) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '12 Switch', '5 Pin Socket', '6-8M'],
  },
  {
    id: 'titan-sr13',
    sku: 'SR13',
    name: 'TITAN 4-Zone Lighting Knob + 4 Switch + 5 Pin Socket - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (K+4S+SK) AL] SR13. TITAN ZigBee Knob For 4 Zone Zigbee Lighting Brightness & Color Control + 4 Switch (10L - 7L+1F) _ 6-8M (K+4S+SK) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', 'Lighting Knob', '5 Pin Socket', '6-8M'],
  },
  {
    id: 'titan-sr14',
    sku: 'SR14',
    name: 'TITAN 4-Zone Lighting Knob + 6 Switch + 5 Pin Socket - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (K+6S+SK) AL] SR14. TITAN ZigBee Knob For 4 Zone Zigbee Lighting Brightness & Color Control + 6 Switch (10L - 7L+1F) _ 6-8M (K+6S+SK) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', 'Lighting Knob', '5 Pin Socket', '6-8M'],
  },
  {
    id: 'titan-sr15',
    sku: 'SR15',
    name: 'TITAN 12 Switch Panel - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (4S+4S+4S) AL] SR15. TITAN ZigBee 12 Switch (10L+2SC - 7L+1F+2SC) _ 6-8M (4S+4S+4S) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '12 Switch', '6-8M'],
  },
  {
    id: 'titan-sr16',
    sku: 'SR16',
    name: 'TITAN 14 Switch Panel - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (4S+4S+6S) AL] SR16. TITAN ZigBee 14 Switch (10L+4SC - 7L+1F+4SC) _ 6-8M (4S+4S+6S) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '14 Switch', '6-8M'],
  },
  {
    id: 'titan-sr17',
    sku: 'SR17',
    name: 'TITAN 16 Switch Panel - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (4S+6S+6S) AL] SR17. TITAN ZigBee 16 Switch (10L+6SC - 7L+1F+6SC) _ 6-8M (4S+6S+6S)  (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '16 Switch', '6-8M'],
  },
  {
    id: 'titan-sr18',
    sku: 'SR18',
    name: 'TITAN 18 Switch Master Panel - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (6S+6S+6S) AL] SR18. TITAN ZigBee 18 Switch (10L+8SC - 7L+1F+8SC) _ 6-8M (6S+6S+6S) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', '18 Switch', '6-8M'],
  },
  {
    id: 'titan-sr19',
    sku: 'SR19',
    name: 'TITAN 4-Zone Lighting Knob + 8 Switch - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (K+4S+4S) AL] SR19. TITAN ZigBee Knob For 4 Zone Zigbee Lighting Brightness & Color Control + 8 Switch (10L - 7L+1F) _ 6-8M (K+4S+4S) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', 'Lighting Knob', '8 Switch', '6-8M'],
  },
  {
    id: 'titan-sr20',
    sku: 'SR20',
    name: 'TITAN 4-Zone Lighting Knob + 10 Switch - 6-8M',
    category: 'titan-smart-switches',
    image: img('titan-smart-switches', '[PN-TN-6-8M (K+4S+6S) AL] SR20. TITAN ZigBee Knob For 4 Zone Zigbee Lighting Brightness & Color Control + 10 Switch (10L - 7L+1F) _ 6-8M (K+4S+6S) (Brushed Aluminium Grey).png'),
    tags: ['ZigBee', 'Lighting Knob', '10 Switch', '6-8M'],
  },

  // ============================================================
  // Touch Switches  (Velux & Luxeray, ZigBee + WiFi)
  // ============================================================
  {
    id: 'touch-luxeray-4s-1f-1',
    name: 'Luxeray 4 Switch + 1 Fan + 1 Curtain',
    category: 'touch-switches',
    image: img('touch-switches', 'Luxeray ZigBee  WiFi 4 Switch + 1 FAN + 1.webp'),
    tags: ['Luxeray', 'ZigBee', 'WiFi', '4 Switch', 'Fan', 'Curtain'],
  },
  {
    id: 'touch-velux-4s-2m',
    name: 'Velux 4 Switch - 2M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 4 Switch - 2M.webp'),
    tags: ['Velux', 'ZigBee', 'WiFi', '4 Switch', '2M'],
  },
  {
    id: 'touch-velux-2c-2m',
    name: 'Velux 2 Curtain - 2M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 2 Curtain - 2M.webp'),
    tags: ['Velux', 'Curtain', '2M'],
  },
  {
    id: 'touch-velux-1c-1f-2m',
    name: 'Velux 1 Curtain + 1 Fan - 2M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 1 Curtain + 1 FAN- 2M.webp'),
    tags: ['Velux', 'Curtain', 'Fan', '2M'],
  },
  {
    id: 'touch-velux-2s-1f-2m',
    name: 'Velux 2 Switch + 1 Fan - 2M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 2 Switch + 1 FAN - 2M.webp'),
    tags: ['Velux', '2 Switch', 'Fan', '2M'],
  },
  {
    id: 'touch-velux-2s-1c-2m',
    name: 'Velux 2 Switch + 1 Curtain - 2M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 2 Switch + 1 Curtain 2M (2+0+1+0U).webp'),
    tags: ['Velux', '2 Switch', 'Curtain', '2M'],
  },
  {
    id: 'touch-velux-4s-5pin',
    name: 'Velux 4 Switch + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 4 Switch + 5 Pin Socket.webp'),
    tags: ['Velux', '4 Switch', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-4s-1f-1',
    name: 'Velux 4 Switch + 1 Fan + 1 Curtain',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 4 Switch + 1 Fan + 1.webp'),
    tags: ['Velux', '4 Switch', 'Fan', 'Curtain'],
  },
  {
    id: 'touch-velux-4s-2c-5',
    name: 'Velux 4 Switch + 2 Curtain + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 4 Switch + 2 Curtain + 5.webp'),
    tags: ['Velux', '4 Switch', 'Curtain', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-4s-2f-5',
    name: 'Velux 4 Switch + 2 Fan + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 4 Switch + 2 FAN + 5.webp'),
    tags: ['Velux', '4 Switch', 'Fan', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-4s-2f-4m',
    name: 'Velux 4 Switch + 2 Fan - 4M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 4 Switch + 2 Fan - 4M.webp'),
    tags: ['Velux', '4 Switch', 'Fan', '4M'],
  },
  {
    id: 'touch-velux-4s-2c-4m',
    name: 'Velux 4 Switch + 2 Curtain - 4M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 4 Switch+2 Curtain- 4M.webp'),
    tags: ['Velux', '4 Switch', 'Curtain', '4M'],
  },
  {
    id: 'touch-velux-2s-2f-1',
    name: 'Velux 2 Switch + 2 Fan + 1 Curtain',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 2 Switch + 2 FAN + 1.webp'),
    tags: ['Velux', '2 Switch', 'Fan', 'Curtain'],
  },
  {
    id: 'touch-velux-2s-1c-5',
    name: 'Velux 2 Switch + 1 Curtain + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 2 Switch +1 Curtain + 5.webp'),
    tags: ['Velux', '2 Switch', 'Curtain', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-2s-1f-5',
    name: 'Velux 2 Switch + 1 Fan + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 2 Switch + 1 FAN + 5.webp'),
    tags: ['Velux', '2 Switch', 'Fan', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-2s-1f-2c',
    name: 'Velux 2 Switch + 1 Fan + 2 Curtain',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 2 Switch + 1 Fan + 2.webp'),
    tags: ['Velux', '2 Switch', 'Fan', 'Curtain'],
  },
  {
    id: 'touch-velux-2s-2f-1c',
    name: 'Velux 2 Switch + 2 Fan + 1 Curtain',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 2 Switch + 2 Fan +1.webp'),
    tags: ['Velux', '2 Switch', 'Fan', 'Curtain'],
  },
  {
    id: 'touch-velux-2c-5pin',
    name: 'Velux 2 Curtain + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 2 Curtain + 5 Pin.webp'),
    tags: ['Velux', 'Curtain', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-2f-2c-4m',
    name: 'Velux 2 Fan + 2 Curtain - 4M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 2 Fan +2 Curtain- 4M.webp'),
    tags: ['Velux', 'Fan', 'Curtain', '4M'],
  },
  {
    id: 'touch-velux-2f-2c-5',
    name: 'Velux 2 Fan + 2 Curtain + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 2 FAN + 2 Curtain+ 5.webp'),
    tags: ['Velux', 'Fan', 'Curtain', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-1f-1c-5',
    name: 'Velux 1 Fan + 1 Curtain + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 1 FAN +1 curtain+ 5 Pin.webp'),
    tags: ['Velux', 'Fan', 'Curtain', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-6s-1c-5',
    name: 'Velux 6 Switch + 1 Curtain + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 6 Switch + 1 Curtain + 5.webp'),
    tags: ['Velux', '6 Switch', 'Curtain', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-6s-1f-5',
    name: 'Velux 6 Switch + 1 Fan + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 6 Switch + 1 FAN + 5.webp'),
    tags: ['Velux', '6 Switch', 'Fan', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-6s-1f-4m',
    name: 'Velux 6 Switch + 1 Fan - 4M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 6 Switch + 1 Fan - 4M.webp'),
    tags: ['Velux', '6 Switch', 'Fan', '4M'],
  },
  {
    id: 'touch-velux-6s-1c-4m',
    name: 'Velux 6 Switch + 1 Curtain - 4M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 6 Switch+1 Curtain- 4M.webp'),
    tags: ['Velux', '6 Switch', 'Curtain', '4M'],
  },
  {
    id: 'touch-velux-6s-2c-3',
    name: 'Velux 6 Switch + 2 Curtain + 3 Module',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 6 Switch+ 2 curtain + 3.webp'),
    tags: ['Velux', '6 Switch', 'Curtain'],
  },
  {
    id: 'touch-velux-6s-2c',
    name: 'Velux 6 Switch + 2 Curtain',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 6 Switch+ 2 Curtain -.webp'),
    tags: ['Velux', '6 Switch', 'Curtain'],
  },
  {
    id: 'touch-velux-8s-4m',
    name: 'Velux 8 Switch - 4M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee WiFi 8 Switch - 4M.webp'),
    tags: ['Velux', '8 Switch', '4M'],
  },
  {
    id: 'touch-velux-8s-1c-3',
    name: 'Velux 8 Switch + 1 Curtain + 3 Module',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 8 Switch+ 1 curtain + 3.webp'),
    tags: ['Velux', '8 Switch', 'Curtain'],
  },
  {
    id: 'touch-velux-8s-5pin',
    name: 'Velux 8 Switch + 5 Pin Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 8 Switch + 5 Pin Socket.webp'),
    tags: ['Velux', '8 Switch', '5 Pin Socket'],
  },
  {
    id: 'touch-velux-10s-3sk',
    name: 'Velux 10 Switch + 3 Socket',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 10 Switch+ 3 Socket.webp'),
    tags: ['Velux', '10 Switch', 'Socket'],
  },
  {
    id: 'touch-velux-10s-68m',
    name: 'Velux 10 Switch - 6-8M',
    category: 'touch-switches',
    image: img('touch-switches', 'Velux ZigBee  WiFi 10 Switch- 6-8M.webp'),
    tags: ['Velux', '10 Switch', '6-8M'],
  },

  // ============================================================
  // Retrofit Modules  (ZigBee, In-Wall)
  // ============================================================
  {
    id: 'retro-sr69',
    sku: 'SR69',
    name: '1 Node Heavy Duty Retrofit Module - 5000W (40A)',
    category: 'retrofit-modules',
    image: img('retrofit-modules', '[PN-RFT-1N] SR69. ZigBee 1 Node Heavy Duty Retrofit switch module 5000W each relay (40A).webp'),
    tags: ['ZigBee', '1 Node', '40A', 'Heavy Duty'],
  },
  {
    id: 'retro-sr70',
    sku: 'SR70',
    name: '2 Node Heavy Duty Retrofit Module - 1500W (16A)',
    category: 'retrofit-modules',
    image: img('retrofit-modules', '[PN-RFT-2N] SR70. ZigBee 2 Node Heavy Duty Retrofit switch module 1500W each relay (16A).webp'),
    tags: ['ZigBee', '2 Node', '16A'],
  },
  {
    id: 'retro-sr71',
    sku: 'SR71',
    name: '3 Node Heavy Duty Retrofit Module - 800W (16A)',
    category: 'retrofit-modules',
    image: img('retrofit-modules', '[PN-RFT-3N] SR71. ZigBee 3 Node Heavy Duty Retrofit switch module 800W each relay (16A).webp'),
    tags: ['ZigBee', '3 Node', '16A'],
  },
  {
    id: 'retro-sr72',
    sku: 'SR72',
    name: '4 Node Heavy Duty Retrofit Module - 800W (16A)',
    category: 'retrofit-modules',
    image: img('retrofit-modules', '[PN-RFT-4N] SR72. ZigBee 4 Node Heavy Duty Retrofit switch module 800W each relay (16A).webp'),
    tags: ['ZigBee', '4 Node', '16A'],
  },
  {
    id: 'retro-sr73',
    sku: 'SR73',
    name: '1 Node In-Wall Curtain Module - 3A',
    category: 'retrofit-modules',
    image: img('retrofit-modules', '[PN-RFT-CRT] SR73. ZigBee Retrofit In-Wall 1 Node Curtain module 3A.webp'),
    tags: ['ZigBee', 'Curtain', '1 Node', '3A'],
  },
  {
    id: 'retro-sr74',
    sku: 'SR74',
    name: '2 Node In-Wall Curtain Module - 3A',
    category: 'retrofit-modules',
    image: img('retrofit-modules', '[PN-RFT-2CRT] SR74. ZigBee Retrofit In-Wall 2 Node Curtain module 3A.webp'),
    tags: ['ZigBee', 'Curtain', '2 Node', '3A'],
  },

  // ============================================================
  // Smart Door Locks
  // ============================================================
  {
    id: 'lock-ble-al1',
    name: 'BLE Edition AL1 - Aluminium Profile',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'BLE Edition AL1 For Aluminum profile.webp'),
    tags: ['Bluetooth', 'Aluminium', 'Biometric'],
  },
  {
    id: 'lock-ble-b1',
    name: 'BLE Edition B1 - Smart Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'BLE Edition B1 Smart Biometric Door Lock.webp'),
    tags: ['Bluetooth', 'Biometric'],
  },
  {
    id: 'lock-e1pro-basic',
    name: 'Edition 1 Pro - Basic Smart Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 1 Pro Basic Smart Biometric Door.webp'),
    tags: ['Biometric'],
  },
  {
    id: 'lock-e1pro-wifi',
    name: 'Edition 1 Pro - WiFi Smart Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 1 Pro WiFi Smart Biometric Door.webp'),
    tags: ['WiFi', 'Biometric'],
  },
  {
    id: 'lock-e1pro-zigbee',
    name: 'Edition 1 Pro - ZigBee Smart Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 1 Pro ZigBee Smart Biometric Door.webp'),
    tags: ['ZigBee', 'Biometric'],
  },
  {
    id: 'lock-e1prog-basic',
    name: 'Edition 1 Pro-G - Basic Smart Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 1 Pro-G Basic Smart Biometric Door.webp'),
    tags: ['Biometric', 'Pro-G'],
  },
  {
    id: 'lock-e1prog-wifi',
    name: 'Edition 1 Pro-G - WiFi Smart Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 1 Pro-G WiFi Smart Biometric Door.webp'),
    tags: ['WiFi', 'Biometric', 'Pro-G'],
  },
  {
    id: 'lock-e1prog-zigbee',
    name: 'Edition 1 Pro-G - ZigBee Smart Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 1 Pro-G ZigBee Smart Biometric.webp'),
    tags: ['ZigBee', 'Biometric', 'Pro-G'],
  },
  {
    id: 'lock-e1prog-rxtx',
    name: 'Edition 1 Pro-G - RX-TX Combo',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 1 Pro-G With RX-TX Combo Smart.webp'),
    tags: ['RX-TX', 'Biometric', 'Pro-G'],
  },
  {
    id: 'lock-e3-wifi',
    name: 'Edition 3 - WiFi Smart Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 3 WiFi Smart Biometric Door Lock.webp'),
    tags: ['WiFi', 'Biometric'],
  },
  {
    id: 'lock-e3-zigbee',
    name: 'Edition 3 - ZigBee Smart Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 3 ZigBee Smart Biometric Door Lock.webp'),
    tags: ['ZigBee', 'Biometric'],
  },
  {
    id: 'lock-e3-rxtx',
    name: 'Edition 3 - RX-TX Combo Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 3 Rx-Tx Combo Smart Biometric.webp'),
    tags: ['RX-TX', 'Biometric'],
  },
  {
    id: 'lock-e3pro-wifile-face',
    name: 'Edition 3 Pro - WiFi-LE Face Recognition',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 3 pro WiFi-LE Smart Face.webp'),
    tags: ['WiFi-LE', 'Face Recognition'],
  },
  {
    id: 'lock-e4-wifile-face',
    name: 'Edition 4 - WiFi-LE Face Recognition',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 4 WiFi-LE Smart Face Recognition.webp'),
    tags: ['WiFi-LE', 'Face Recognition'],
  },
  {
    id: 'lock-e6-wifile-face',
    name: 'Edition 6 - WiFi-LE Face Recognition',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 6 WiFi-LE Smart Face Recognition.webp'),
    tags: ['WiFi-LE', 'Face Recognition'],
  },
  {
    id: 'lock-e7-villa',
    name: 'Edition 7 Villa - Slim Handle WiFi-LE Face Recognition',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Edition 7 Villa 3 feet Slim handle type WiFiLE Smart Face Recognition Door Lock With.webp'),
    tags: ['WiFi-LE', 'Face Recognition', 'Villa', 'Slim'],
  },
  {
    id: 'lock-s1pro-rxtx',
    name: 'Series 1 Pro - RX-TX Combo Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Series 1 Pro With RX-TX Combo Smart.webp'),
    tags: ['RX-TX', 'Biometric'],
  },
  {
    id: 'lock-battery-dc12v',
    name: 'Smart Battery Powered + DC 12V',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'Smart Battery Powered + DC 12V.webp'),
    tags: ['Battery', 'DC 12V'],
  },
  {
    id: 'lock-wd1',
    name: 'WD1 Premium - Pull Ring Fingerprint',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'WD1 Premium Pull Ring Design Fingerprint.webp'),
    tags: ['Fingerprint', 'Premium'],
  },
  {
    id: 'lock-wd2',
    name: 'WD2 Premium - RFID & NFC Hidden',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'WD2 Premium Rf ID & NFC Enabled Hidden.webp'),
    tags: ['RFID', 'NFC', 'Premium'],
  },
  {
    id: 'lock-wifi-g1',
    name: 'WiFi Edition G1 - Glass Door Biometric',
    category: 'smart-door-locks',
    image: img('smart-door-locks', 'WiFi Edition G1 Smart Biometric Glass Door.webp'),
    tags: ['WiFi', 'Glass Door', 'Biometric'],
  },
];

export const usynqProductCount = usynqProducts.length;
