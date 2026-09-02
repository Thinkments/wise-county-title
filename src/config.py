"""Configuration module for Wise County Title project."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load local .env if present
env_path = Path(__file__).resolve().parent.parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"
EXPORTS_DIR = DATA_DIR / "exports"

# Application Settings
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
APP_NAME = os.getenv("APP_NAME", "Wise County Title Project")
PORT = int(os.getenv("PORT", "8000"))
HOST = os.getenv("HOST", "127.0.0.1")

# Wise County & Texas Defaults
DEFAULT_COUNTY = os.getenv("DEFAULT_COUNTY", "Wise")
DEFAULT_COUNTY_SEAT = os.getenv("DEFAULT_COUNTY_SEAT", "Decatur")
DEFAULT_ESCROW_FEE = float(os.getenv("DEFAULT_ESCROW_FEE", "450.00"))
DEFAULT_TAX_CERT_FEE = float(os.getenv("DEFAULT_TAX_CERT_FEE", "65.00"))
DEFAULT_E_RECORDING_FEE = float(os.getenv("DEFAULT_E_RECORDING_FEE", "10.00"))
