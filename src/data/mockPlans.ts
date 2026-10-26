import { InsurancePlan } from "@/types/insurance";

export const MOCK_INSURANCE_PLANS: InsurancePlan[] = [
  // HEALTH INSURANCE
  {
    id: "health-01",
    provider: "Aarogya Samriddhi General",
    providerCode: "ASG",
    planName: "Aarogya Kavach Diamond Plan",
    category: "health",
    annualPremium: 14250,
    monthlyPremium: 1250,
    sumInsured: 1000000,
    sumInsuredDisplay: "₹10 Lakh",
    claimsSettlementRatio: 98.6,
    networkCount: 10400,
    networkLabel: "10,400+ Cashless Hospitals",
    rating: 4.8,
    reviewsCount: 3420,
    tags: ["Zero Copay", "No Room Rent Capping", "Instant Cashless"],
    keyBenefits: [
      "Zero room rent restrictions on Single Private AC Room",
      "Pre-hospitalisation 60 days, post-hospitalisation 180 days",
      "100% restoration of Sum Insured once every policy year",
      "Complimentary annual executive health check-up for all adults"
    ],
    roomRentLimit: "No Capping (Single Private AC Room)",
    coPayment: "0% across all network hospitals",
    prePostHospitalization: "60 Days Pre / 180 Days Post",
    waitingPeriodPreExisting: "2 Years for pre-existing ailments",
    noClaimBonus: "50% increase per claim-free year (up to 100%)",
    restorationBenefit: "100% automated restoration on full/partial exhaustion",
    inclusions: [
      "Inpatient treatment and ICU charges without limit",
      "540+ Day Care procedures covered under cashless",
      "Organ donor medical expenses up to sum insured",
      "Road ambulance cover up to ₹5,000 per hospitalization",
      "Alternative treatments (AYUSH) in recognized institutions"
    ],
    exclusions: [
      "Cosmetic, aesthetic or obesity surgeries",
      "Adventure sports injuries unless explicitly endorsed",
      "Self-inflicted injuries and unapproved alternative therapies",
      "Outpatient OPD consultations (unless opted as rider)"
    ],
    basePremium: 12076,
    gstAmount: 2174,
    hasCashlessOPD: true,
    hasMaternity: false,
    hasCriticalIllness: true
  },
  {
    id: "health-02",
    provider: "Niva Suraksha Assurance",
    providerCode: "NSA",
    planName: "Suraksha Comprehensive Shield 360",
    category: "health",
    annualPremium: 18900,
    monthlyPremium: 1650,
    sumInsured: 2500000,
    sumInsuredDisplay: "₹25 Lakh",
    claimsSettlementRatio: 99.1,
    networkCount: 11800,
    networkLabel: "11,800+ Cashless Hospitals",
    rating: 4.9,
    reviewsCount: 5120,
    tags: ["High Coverage", "Maternity Included", "Global Emergency"],
    keyBenefits: [
      "High sum insured ₹25 Lakh with limitless cumulative bonus",
      "Maternity cover up to ₹1,00,000 after 24 months waiting",
      "Global emergency cover for in-patient care worldwide",
      "Zero deductible and zero co-pay at any age"
    ],
    roomRentLimit: "Any Room Category (including Suite)",
    coPayment: "0% for all network admissions",
    prePostHospitalization: "90 Days Pre / 180 Days Post",
    waitingPeriodPreExisting: "1 Year with express rider",
    noClaimBonus: "100% bonus after 2 claim-free years",
    restorationBenefit: "Unlimited restorations for unrelated illnesses",
    inclusions: [
      "Comprehensive ICU and specialist consultation charges",
      "Advanced robotic surgery and modern cancer treatments",
      "Maternity and newborn baby care from day one",
      "Annual preventative health screenings across 45 parameters",
      "Air ambulance cover up to ₹2,50,000 per policy year"
    ],
    exclusions: [
      "Experimental or unproven clinical procedures",
      "Non-medical disposable items (gloves, PPE charges)",
      "Dental procedures unless resulting from accidental injury"
    ],
    basePremium: 16017,
    gstAmount: 2883,
    hasCashlessOPD: true,
    hasMaternity: true,
    hasCriticalIllness: true
  },
  {
    id: "health-03",
    provider: "Apex Care General",
    providerCode: "ACG",
    planName: "Apex Smart Health Essential",
    category: "health",
    annualPremium: 9800,
    monthlyPremium: 870,
    sumInsured: 500000,
    sumInsuredDisplay: "₹5 Lakh",
    claimsSettlementRatio: 96.8,
    networkCount: 7900,
    networkLabel: "7,900+ Cashless Hospitals",
    rating: 4.4,
    reviewsCount: 1890,
    tags: ["Budget Friendly", "Entry Level", "Quick Approval"],
    keyBenefits: [
      "Economical entry-level cover suitable for young professionals",
      "Fast 30-minute cashless approval at Tier-1 hospitals",
      "Covers 380+ day-care surgeries not requiring 24h stay",
      "Teleconsultations with general physicians free 24/7"
    ],
    roomRentLimit: "1% of Sum Insured per day (₹5,000/day)",
    coPayment: "10% co-pay on Tier-3 town hospitals",
    prePostHospitalization: "30 Days Pre / 60 Days Post",
    waitingPeriodPreExisting: "3 Years for specified ailments",
    noClaimBonus: "10% increase per year up to 50%",
    restorationBenefit: "50% restoration once exhausted",
    inclusions: [
      "Inpatient room and boarding expenses",
      "Surgeon, anesthetist, and nursing fees",
      "Standard emergency road ambulance expenses up to ₹2,000",
      "AYUSH hospitalisation up to ₹25,000"
    ],
    exclusions: [
      "Room rent upgrades beyond 1% of Sum Insured",
      "Pre-existing illnesses during initial 36 months",
      "Domiciliary treatment costs"
    ],
    basePremium: 8305,
    gstAmount: 1495,
    hasCashlessOPD: false,
    hasMaternity: false,
    hasCriticalIllness: false
  },

  // MOTOR INSURANCE
  {
    id: "motor-01",
    provider: "Pragati Motor Assurance",
    providerCode: "PMA",
    planName: "Pragati AutoShield Comprehensive Plus",
    category: "motor",
    annualPremium: 11450,
    monthlyPremium: 990,
    sumInsured: 850000,
    sumInsuredDisplay: "IDV ₹8.5 Lakh",
    claimsSettlementRatio: 97.9,
    networkCount: 6800,
    networkLabel: "6,800+ Cashless Garages",
    rating: 4.7,
    reviewsCount: 2840,
    tags: ["Zero Depreciation", "Engine Protect", "24x7 RSA"],
    keyBenefits: [
      "Zero depreciation cover for glass, rubber, plastic, and fiber parts",
      "Engine & gearbox protection against water ingression & hydrostatic lock",
      "24x7 Roadside Assistance with unlimited towing up to 100 km",
      "NCB Retention protector up to 2 claims in policy cycle"
    ],
    roomRentLimit: "Not Applicable",
    coPayment: "Compulsory deductible ₹1,000 as per IRDAI",
    prePostHospitalization: "Not Applicable",
    waitingPeriodPreExisting: "Immediate upon vehicle inspection or transfer",
    noClaimBonus: "Up to 50% NCB bonus transfer from previous insurer",
    restorationBenefit: "Not Applicable",
    inclusions: [
      "Own damage cover from fire, theft, flood, vandalism, and collisions",
      "Third-party liability covering bodily injury and property damage up to ₹7.5 Lakh",
      "Key replacement benefit up to ₹15,000",
      "Personal baggage loss cover up to ₹20,000 inside vehicle",
      "Consumable expenses (coolant, lubricants, nuts & bolts)"
    ],
    exclusions: [
      "Driving without a valid driving license or under intoxicants",
      "Mechanical or electrical breakdowns due to regular wear & tear",
      "Consequential loss or damages incurred outside geographical limits"
    ],
    basePremium: 9703,
    gstAmount: 1747,
    hasZeroDep: true,
    hasRoadsideAssistance: true
  },
  {
    id: "motor-02",
    provider: "Bharatiya Vahan Suraksha",
    providerCode: "BVS",
    planName: "Vahan Rakshak Bumper-to-Bumper Elite",
    category: "motor",
    annualPremium: 13900,
    monthlyPremium: 1210,
    sumInsured: 1120000,
    sumInsuredDisplay: "IDV ₹11.2 Lakh",
    claimsSettlementRatio: 98.4,
    networkCount: 8200,
    networkLabel: "8,200+ Cashless Garages",
    rating: 4.8,
    reviewsCount: 3910,
    tags: ["Return to Invoice", "Tyre Secure", "Zero Dep"],
    keyBenefits: [
      "Return to Invoice (RTI) gives 100% on-road price on total loss or theft",
      "Complete Tyre & Rim security including accidental bursts",
      "Loss of personal belongings and smart accessories cover",
      "Pickup and drop service for repair at network service centers"
    ],
    roomRentLimit: "Not Applicable",
    coPayment: "Standard compulsory ₹1,000 deductible",
    prePostHospitalization: "Not Applicable",
    waitingPeriodPreExisting: "Immediate coverage",
    noClaimBonus: "Retains 50% discount even after claim submission",
    restorationBenefit: "Not Applicable",
    inclusions: [
      "Full invoice value payout if vehicle is stolen or non-repairable",
      "Zero depreciation on all metal and composite replacement elements",
      "Full reimbursement of towing and crane assistance charges",
      "PA cover for owner-driver up to ₹15 Lakh"
    ],
    exclusions: [
      "Commercial usage of private registered vehicles",
      "Unauthorised modifications not reported to RTO and insurer"
    ],
    basePremium: 11780,
    gstAmount: 2120,
    hasZeroDep: true,
    hasRoadsideAssistance: true
  },
  {
    id: "motor-03",
    provider: "Apex Care General",
    providerCode: "ACG",
    planName: "Apex Drive Saver Comprehensive",
    category: "motor",
    annualPremium: 7800,
    monthlyPremium: 690,
    sumInsured: 600000,
    sumInsuredDisplay: "IDV ₹6 Lakh",
    claimsSettlementRatio: 95.9,
    networkCount: 4900,
    networkLabel: "4,900+ Cashless Garages",
    rating: 4.3,
    reviewsCount: 1450,
    tags: ["Affordable", "Basic Comprehensive", "Instant Policy"],
    keyBenefits: [
      "Balanced own-damage plus third party legal protection",
      "Basic towing assistance up to 40 km",
      "Quick cashless claim settlement for minor dent and scratch claims",
      "Paperless renewal in 2 minutes"
    ],
    roomRentLimit: "Not Applicable",
    coPayment: "Standard IRDAI deductible ₹1,000",
    prePostHospitalization: "Not Applicable",
    waitingPeriodPreExisting: "Immediate",
    noClaimBonus: "Standard NCB grid as per Indian tariff rules",
    restorationBenefit: "Not Applicable",
    inclusions: [
      "Accidental damage, fire, explosion, and lightning losses",
      "Third-party bodily injury and property damage cover",
      "Standard theft coverage up to declared IDV"
    ],
    exclusions: [
      "Depreciation on plastic and rubber parts (50% borne by insured)",
      "Engine hydrostatic lock unless specific rider added"
    ],
    basePremium: 6610,
    gstAmount: 1190,
    hasZeroDep: false,
    hasRoadsideAssistance: true
  },

  // LIFE INSURANCE
  {
    id: "life-01",
    provider: "Hindustan Life & Shield",
    providerCode: "HLS",
    planName: "Hindustan Sampurna Jeevan Term",
    category: "life",
    annualPremium: 12800,
    monthlyPremium: 1100,
    sumInsured: 10000000,
    sumInsuredDisplay: "₹1 Crore",
    claimsSettlementRatio: 99.3,
    networkCount: 850,
    networkLabel: "850+ Branches Across India",
    rating: 4.9,
    reviewsCount: 7800,
    tags: ["99.3% CSR", "Terminal Illness Cover", "Waiver of Premium"],
    keyBenefits: [
      "Pure term life cover with 100% death benefit payout to nominee",
      "Accelerated terminal illness payout upon diagnosis of critical conditions",
      "Waiver of future premiums in case of permanent accidental disability",
      "Option to extend cover up to 85 years of age"
    ],
    roomRentLimit: "Not Applicable",
    coPayment: "Zero",
    prePostHospitalization: "Not Applicable",
    waitingPeriodPreExisting: "30 Days initial waiting (except accidental death)",
    noClaimBonus: "Not Applicable",
    restorationBenefit: "Not Applicable",
    inclusions: [
      "Death due to natural causes, illness, and accidents worldwide",
      "Immediate 50% early payout upon certified terminal diagnosis",
      "Tax benefits under Section 80C and Section 10(10D) as per IT Act",
      "Choice of lump-sum or staggered monthly income payouts to family"
    ],
    exclusions: [
      "Suicide during the first 12 months from policy inception",
      "Participation in hazardous aviation activities as crew member"
    ],
    basePremium: 10847,
    gstAmount: 1953,
    hasCriticalIllness: true
  },
  {
    id: "life-02",
    provider: "Kalyan Shanti Life Assurance",
    providerCode: "KSL",
    planName: "Kalyan Suraksha Yuva Term",
    category: "life",
    annualPremium: 16500,
    monthlyPremium: 1420,
    sumInsured: 20000000,
    sumInsuredDisplay: "₹2 Crore",
    claimsSettlementRatio: 98.7,
    networkCount: 620,
    networkLabel: "620+ Service Hubs",
    rating: 4.7,
    reviewsCount: 4230,
    tags: ["₹2 Cr Cover", "Critical Illness Rider", "Income Benefit"],
    keyBenefits: [
      "Large sum assured ₹2 Crore designed for long-term family security",
      "36 Critical Illnesses covered with lump-sum additional payout",
      "Monthly recurring family income benefit option for 10 years",
      "Special discounts on premiums for non-smokers and female policyholders"
    ],
    roomRentLimit: "Not Applicable",
    coPayment: "Zero",
    prePostHospitalization: "Not Applicable",
    waitingPeriodPreExisting: "90 Days for critical illness rider",
    noClaimBonus: "Not Applicable",
    restorationBenefit: "Not Applicable",
    inclusions: [
      "Worldwide death benefit protection 24x7",
      "Accidental death rider providing double sum insured",
      "Comprehensive critical illness cover for cancer, heart attack, and stroke",
      "Tax exemption benefits under current Indian tax legislation"
    ],
    exclusions: [
      "Suicide within 12 months of coverage commencement",
      "Pre-existing critical illnesses not disclosed at medical underwriting"
    ],
    basePremium: 13983,
    gstAmount: 2517,
    hasCriticalIllness: true
  },

  // TRAVEL INSURANCE
  {
    id: "travel-01",
    provider: "Yatra Bharat Travel Care",
    providerCode: "YBT",
    planName: "Yatra Global Explorer Comprehensive",
    category: "travel",
    annualPremium: 2850,
    monthlyPremium: 2850,
    sumInsured: 250000,
    sumInsuredDisplay: "$250,000 (USD)",
    claimsSettlementRatio: 98.1,
    networkCount: 14000,
    networkLabel: "Global Cashless Medical Network",
    rating: 4.8,
    reviewsCount: 3100,
    tags: ["Schengen Approved", "Baggage & Trip Delay", "Zero Medical Deductible"],
    keyBenefits: [
      "Complies with all Schengen visa medical requirements ($50k / €30k+)",
      "Cashless hospitalization abroad with emergency medical evacuation",
      "Checked-in baggage delay and loss compensation up to $1,500",
      "Trip cancellation, curtailment, and missed connection coverage"
    ],
    roomRentLimit: "Usual, customary & reasonable charges in country of visit",
    coPayment: "Zero deductible for medical emergencies",
    prePostHospitalization: "30 Days post-trip follow-up in India if hospitalised abroad",
    waitingPeriodPreExisting: "Covers life-threatening emergency flares only",
    noClaimBonus: "Not Applicable",
    restorationBenefit: "Not Applicable",
    inclusions: [
      "Inpatient and outpatient medical treatment while travelling abroad",
      "Emergency medical repatriation to home country",
      "Loss of passport assistance and fee reimbursement",
      "Personal liability cover up to $100,000 against accidental third-party harm",
      "Compassionate visit expenses for a family member"
    ],
    exclusions: [
      "Travelling against physician advice or for medical tourism",
      "High-risk adventure sports without specialized rider add-on",
      "Items confiscated or detained by customs officials"
    ],
    basePremium: 2415,
    gstAmount: 435,
    hasBaggageLoss: true
  },
  {
    id: "travel-02",
    provider: "Aarogya Samriddhi General",
    providerCode: "ASG",
    planName: "Aarogya Videsh Yatra Shield",
    category: "travel",
    annualPremium: 3400,
    monthlyPremium: 3400,
    sumInsured: 500000,
    sumInsuredDisplay: "$500,000 (USD)",
    claimsSettlementRatio: 98.6,
    networkCount: 16500,
    networkLabel: "Worldwide Hospital Network",
    rating: 4.9,
    reviewsCount: 2480,
    tags: ["USA & Canada Included", "High $500k Cover", "Emergency Evac"],
    keyBenefits: [
      "Comprehensive medical cover valid across USA, Canada, and Europe",
      "Pre-existing condition emergency stabilization up to $10,000",
      "Emergency medical evacuation by air ambulance up to $100,000",
      "Full trip delay compensation after initial 4-hour delay"
    ],
    roomRentLimit: "Standard Private Room",
    coPayment: "$50 deductible per claim event",
    prePostHospitalization: "Covered during trip duration",
    waitingPeriodPreExisting: "Emergency stabilization included",
    noClaimBonus: "Not Applicable",
    restorationBenefit: "Not Applicable",
    inclusions: [
      "Dental emergency relief up to $500",
      "Total loss of checked-in baggage up to $2,000",
      "Financial emergency cash assistance in case of robbery abroad",
      "Hijack distress allowance per day"
    ],
    exclusions: [
      "Routine medical check-ups abroad",
      "Loss of currency, coins, or traveller checks left unattended"
    ],
    basePremium: 2881,
    gstAmount: 519,
    hasBaggageLoss: true
  }
];
