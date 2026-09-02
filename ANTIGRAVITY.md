# Google Antigravity Project Anchor: Wise County Title

## 1. Project Overview
`wise-county-title` is the dedicated workspace and development environment for the **Wise County Title** project (Wise County, Texas real estate title examination, escrow services, title rate/premium calculations, property records tooling, order intake, and customer portal).

---

## 2. Repository Layout & Architecture
* **`wise-county-title.code-workspace`**: IDE workspace configuration file with integrated Python and web developer settings.
* **`ANTIGRAVITY.md`**: Project anchor document and system context.
* **`README.md`**: Project documentation, quickstart instructions, and feature guide.
* **`src/`**: Application source code:
  * `src/config.py`: Environment configuration and project settings.
  * `src/calculator.py`: Texas Title Insurance Basic Premium Rate calculation engine (TDI promulgated rates).
  * `src/models.py`: Data schemas for title orders, property records, fee estimates, and escrow files.
  * `src/main.py`: Application entry point (API & CLI services).
* **`scripts/`**: Automation scripts, Texas property record parsers, and workspace verification tools.
* **`data/`**: Data store directories:
  * `data/raw/`: Incoming property records, title search exports, and order payloads.
  * `data/processed/`: Parsed and validated title commitments, settlement statements, and fee sheets.
  * `data/exports/`: Output reports, Closing Disclosure (CD) estimates, and closing document packages.

---

## 3. Tech Stack & Environment Rules
* **Language & Runtime**: Python 3.11+ / Node.js & modern web tooling.
* **Python Interpreter**: Configured to use the shared `.venv` or local environment.
* **Windows Terminal**: Standard output configured to UTF-8 on Windows to ensure consistent CLI and logging behavior.
* **Security & Confidentiality**: Real estate closing documents and title search data must be handled securely; never commit live `.env` secrets or client PII to source control.
