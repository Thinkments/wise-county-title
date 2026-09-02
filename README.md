# 🏛️ Wise County Title Project

Welcome to the **Wise County Title Project** workspace. This repository contains the application tools, Texas Department of Insurance (TDI) title insurance rate calculators, order management workflows, and property data processing pipelines for Wise County Title.

---

## 🌟 Capabilities & Features

1. **Texas Promulgated Title Insurance Premium Calculator**:
   - Automated calculation of Owner's Title Policy (OTP) and Loan Policy (LP) premiums based on standard Texas Department of Insurance (TDI) Rate Schedules.
   - Endorsement fee estimation, simultaneous issue discounts, and recording/escrow fee breakdowns.

2. **Title Order & Escrow Management**:
   - Order intake for residential & commercial purchase, refinance, and equity transactions in Wise County (Decatur, Bridgeport, Boyd, Rhome, Alvord, Paradise, Chico, Runaway Bay, Aurora, Newark).
   - Buyer, seller, lender, and real estate agent contact and document tracking.

3. **Property Records & Legal Description Parsing**:
   - Structured parsing for Wise County Appraisal District (CAD) property data, subdivision lots/blocks, and metes-and-bounds survey references.

4. **Closing Document & Settlement Statement Estimator**:
   - Fast generation of preliminary settlement cost estimates and Closing Disclosure (CD) line items.

---

## 📁 Workspace Directory Structure

```
wise-county-title/
├── .vscode/
│   ├── launch.json                 # Debug and runner configurations
│   └── extensions.json             # Recommended workspace extensions
├── ANTIGRAVITY.md                  # Project anchor & technical context
├── README.md                       # Main documentation
├── package.json                    # Web & script configurations
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment configuration template
├── .gitignore                      # Git exclusion rules
├── data/
│   ├── raw/                        # Raw tax records, deeds, and intake forms
│   ├── processed/                  # Structured title data and validated files
│   └── exports/                    # Settlement sheets, PDF reports, and exports
├── scripts/
│   └── verify_workspace.py         # Workspace environment validation script
└── src/
    ├── __init__.py                 # Package init
    ├── config.py                   # Environment settings & constants
    ├── models.py                   # Pydantic schemas (Orders, Parties, Rates)
    ├── calculator.py               # Texas Title Insurance Rate Engine
    └── main.py                     # CLI & Webhook service entry point
```

---

## 🚀 Getting Started

### 1. Environment Configuration
Copy the template configuration file:
```bash
cp .env.example .env
```

### 2. Verify Workspace
Run the built-in validation script to verify your workspace setup:
```bash
python scripts/verify_workspace.py
```

### 3. Run Texas Title Rate Calculator
Test rate calculations using the CLI:
```bash
python src/main.py --calc --policy-amount 350000
```
