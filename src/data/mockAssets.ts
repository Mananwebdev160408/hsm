import { Asset } from "@/types/asset";

export const MOCK_ASSETS: Asset[] = [
  {
    id: "asset-01",
    name: "Apple iPhone 15 Pro (128GB, Natural Titanium)",
    category: "smartphones",
    brand: "Apple",
    model: "A3102 (iPhone 15 Pro)",
    serialNumberOrImei: "358921104829104",
    purchaseDate: "2024-10-15",
    purchasePrice: 134900,
    retailer: "Apple Store BKC, Mumbai",
    warrantyProvider: "AppleCare+ Extended Protection",
    warrantyExpiryDate: "2027-10-14",
    linkedInsurancePlanId: "health-01",
    linkedInsurancePlanName: "Aarogya Kavach Diamond Plan (Linked Proof of Purchase)",
    documents: [
      {
        id: "doc-01-a",
        title: "Apple Store Tax Invoice",
        type: "invoice",
        fileName: "Apple_BKC_Tax_Invoice_INV-849102.pdf",
        fileSize: "412 KB",
        uploadDate: "2024-10-15",
        extractedData: {
          invoiceNumber: "INV-BKC-849102",
          retailer: "Apple India Pvt Ltd (BKC Store)",
          taxAmount: "₹24,282 (18% GST)",
          warrantyTermMonths: 36,
          extractedVia: "BillBazaar Smart Optical Engine (Simulated)"
        }
      },
      {
        id: "doc-01-b",
        title: "AppleCare+ Certificate of Coverage",
        type: "warranty_card",
        fileName: "AppleCare_Plus_Agreement_992102.pdf",
        fileSize: "220 KB",
        uploadDate: "2024-10-16",
        extractedData: {
          invoiceNumber: "AC-992102-IN",
          retailer: "Apple Care Services India",
          warrantyTermMonths: 36,
          extractedVia: "BillBazaar Smart Optical Engine (Simulated)"
        }
      }
    ],
    reminders: [
      {
        id: "rem-01",
        title: "Battery Health Diagnostics Review",
        dueDate: "2026-11-20",
        status: "pending",
        priority: "medium",
        category: "Maintenance"
      }
    ]
  },
  {
    id: "asset-02",
    name: "Apple MacBook Pro 14\" (M3 Pro, 18GB, 512GB)",
    category: "laptops",
    brand: "Apple",
    model: "MRX33HN/A Space Black",
    serialNumberOrImei: "C02G901QMD6R",
    purchaseDate: "2025-11-19",
    purchasePrice: 199900,
    retailer: "Imagine Tresor Retail, Bengaluru",
    warrantyProvider: "Apple 1-Year Limited Hardware Warranty",
    warrantyExpiryDate: "2026-11-18",
    documents: [
      {
        id: "doc-02-a",
        title: "Imagine Retail Original Invoice",
        type: "invoice",
        fileName: "Imagine_Invoice_MBP_Nov2025.pdf",
        fileSize: "580 KB",
        uploadDate: "2025-11-19",
        extractedData: {
          invoiceNumber: "IMG-BLR-54819",
          retailer: "Imagine Tresor Retail Indiranagar",
          taxAmount: "₹35,982 (18% GST)",
          warrantyTermMonths: 12,
          extractedVia: "BillBazaar Smart Optical Engine (Simulated)"
        }
      }
    ],
    reminders: [
      {
        id: "rem-02",
        title: "AppleCare+ Warranty Extension Window Closes",
        dueDate: "2026-11-15",
        status: "pending",
        priority: "high",
        category: "Warranty Renewal"
      }
    ]
  },
  {
    id: "asset-03",
    name: "Sony Bravia 55\" 4K HDR Google TV",
    category: "appliances",
    brand: "Sony",
    model: "KD-55X74L",
    serialNumberOrImei: "SN-9481920-IND",
    purchaseDate: "2024-11-13",
    purchasePrice: 62990,
    retailer: "Reliance Digital, Forum Mall",
    warrantyProvider: "Reliance ResQ 2-Year Extended Care",
    warrantyExpiryDate: "2026-11-12",
    documents: [
      {
        id: "doc-03-a",
        title: "Reliance Digital Cash Receipt & GST Bill",
        type: "invoice",
        fileName: "Reliance_Digital_Bravia_Bill.pdf",
        fileSize: "340 KB",
        uploadDate: "2024-11-13",
        extractedData: {
          invoiceNumber: "RD-BLR-004921",
          retailer: "Reliance Retail Ltd (Digital Div)",
          taxAmount: "₹11,338 (18% GST)",
          warrantyTermMonths: 24,
          extractedVia: "BillBazaar Smart Optical Engine (Simulated)"
        }
      }
    ],
    reminders: [
      {
        id: "rem-03",
        title: "ResQ Annual Screen Panel Inspection",
        dueDate: "2026-11-08",
        status: "pending",
        priority: "high",
        category: "Service"
      }
    ]
  },
  {
    id: "asset-04",
    name: "Ather 450X Gen 3 Electric Scooter",
    category: "vehicles",
    brand: "Ather Energy",
    model: "Ather 450X (3.7 kWh Pack)",
    serialNumberOrImei: "ME4JF12AXN8192041",
    purchaseDate: "2023-05-10",
    purchasePrice: 158500,
    retailer: "Ather Space Experience Centre, Indiranagar",
    warrantyProvider: "Ather 5-Year Battery & Drivetrain Assurance",
    warrantyExpiryDate: "2028-05-09",
    linkedInsurancePlanId: "motor-01",
    linkedInsurancePlanName: "Pragati AutoShield Comprehensive Plus",
    documents: [
      {
        id: "doc-04-a",
        title: "Vehicle Tax Invoice & Delivery Challan",
        type: "invoice",
        fileName: "Ather_Tax_Invoice_KA03NA9102.pdf",
        fileSize: "790 KB",
        uploadDate: "2023-05-10",
        extractedData: {
          invoiceNumber: "ATH-2023-DEL-9812",
          retailer: "Ather Energy Pvt Ltd",
          taxAmount: "₹7,925 (5% EV GST)",
          warrantyTermMonths: 60,
          extractedVia: "BillBazaar Smart Optical Engine (Simulated)"
        }
      },
      {
        id: "doc-04-b",
        title: "Insurance Policy Certificate (Pragati AutoShield)",
        type: "insurance_policy",
        fileName: "Pragati_Motor_Policy_Schedule_2026.pdf",
        fileSize: "610 KB",
        uploadDate: "2026-05-10",
        extractedData: {
          invoiceNumber: "POL-PMA-99214-EV",
          retailer: "Pragati Motor Assurance Co.",
          warrantyTermMonths: 12,
          extractedVia: "BillBazaar Smart Optical Engine (Simulated)"
        }
      }
    ],
    reminders: [
      {
        id: "rem-04",
        title: "Periodic 15,000 km Brake & Belt Service",
        dueDate: "2026-11-28",
        status: "pending",
        priority: "medium",
        category: "Scheduled Maintenance"
      }
    ]
  },
  {
    id: "asset-05",
    name: "Dyson V12 Detect Slim Cordless Vacuum",
    category: "appliances",
    brand: "Dyson",
    model: "V12 Detect Slim Total Clean",
    serialNumberOrImei: "DY-V12-IND-883921",
    purchaseDate: "2024-08-11",
    purchasePrice: 54900,
    retailer: "Dyson India Online Store",
    warrantyProvider: "Dyson 2-Year Manufacturer Warranty",
    warrantyExpiryDate: "2026-08-10",
    documents: [
      {
        id: "doc-05-a",
        title: "Dyson Tax Invoice & Serial Validation",
        type: "invoice",
        fileName: "Dyson_Invoice_INV-67120.pdf",
        fileSize: "295 KB",
        uploadDate: "2024-08-11",
        extractedData: {
          invoiceNumber: "DYS-IN-67120",
          retailer: "Dyson India Official",
          taxAmount: "₹9,882 (18% GST)",
          warrantyTermMonths: 24,
          extractedVia: "BillBazaar Smart Optical Engine (Simulated)"
        }
      }
    ],
    reminders: [
      {
        id: "rem-05",
        title: "HEPA Filter Replacement Cycle",
        dueDate: "2026-10-30",
        status: "pending",
        priority: "low",
        category: "Filter Cleaning"
      }
    ]
  },
  {
    id: "asset-06",
    name: "Sony WH-1000XM5 Noise-Cancelling Headphones",
    category: "gadgets",
    brand: "Sony",
    model: "WH-1000XM5 Black",
    serialNumberOrImei: "SN-XM5-6671920",
    purchaseDate: "2026-02-14",
    purchasePrice: 29990,
    retailer: "Croma Electronics, Koramangala",
    warrantyProvider: "Sony India 1-Year Standard Limited Warranty",
    warrantyExpiryDate: "2027-02-13",
    documents: [
      {
        id: "doc-06-a",
        title: "Croma Retail Tax Invoice",
        type: "invoice",
        fileName: "Croma_Invoice_XM5_Feb2026.pdf",
        fileSize: "320 KB",
        uploadDate: "2026-02-14",
        extractedData: {
          invoiceNumber: "CR-KOR-29401",
          retailer: "Infiniti Retail Ltd (Croma)",
          taxAmount: "₹5,398 (18% GST)",
          warrantyTermMonths: 12,
          extractedVia: "BillBazaar Smart Optical Engine (Simulated)"
        }
      }
    ],
    reminders: []
  }
];
