"""Main entry point for Wise County Title Project."""

import argparse
import json
import sys
from .config import (
    APP_NAME,
    ENVIRONMENT,
    PORT,
    HOST,
    DEFAULT_COUNTY,
    DEFAULT_COUNTY_SEAT,
    DEFAULT_ESCROW_FEE,
    DEFAULT_TAX_CERT_FEE,
    DEFAULT_E_RECORDING_FEE,
)
from .calculator import calculate_settlement_fees, calculate_texas_title_premium
from .models import TitleOrder, PropertyInfo, PartyInfo, TransactionType, OrderStatus


def print_title_quote(price: float, loan: float = 0.0):
    print("=" * 65)
    print(f"  {APP_NAME.upper()} - SETTLEMENT & TITLE FEE ESTIMATE")
    print(f"  Location: {DEFAULT_COUNTY} County, TX ({DEFAULT_COUNTY_SEAT})")
    print("=" * 65)
    print(f"  Purchase Price / Policy Amount : ${price:,.2f}")
    if loan > 0:
        print(f"  Loan Amount                     : ${loan:,.2f}")
    print("-" * 65)

    breakdown = calculate_settlement_fees(
        purchase_price=price,
        loan_amount=loan,
        escrow_fee=DEFAULT_ESCROW_FEE,
        tax_cert_fee=DEFAULT_TAX_CERT_FEE,
        e_recording_fee=DEFAULT_E_RECORDING_FEE
    )

    print(f"  Owner's Title Policy (OTP)      : ${breakdown.owners_title_policy_premium:>10,.2f}")
    if breakdown.loan_policy_premium > 0:
        print(f"  Loan Policy Premium (Excess)    : ${breakdown.loan_policy_premium:>10,.2f}")
    if breakdown.simultaneous_issue_fee > 0:
        print(f"  Simultaneous Issue Fee (R-5)    : ${breakdown.simultaneous_issue_fee:>10,.2f}")
    print(f"  Escrow / Closing Settlement Fee : ${breakdown.escrow_fee:>10,.2f}")
    print(f"  Tax Certificate Fee             : ${breakdown.tax_certificate_fee:>10,.2f}")
    print(f"  E-Recording / Filing Fee        : ${breakdown.e_recording_fee:>10,.2f}")
    print(f"  Courier & Secure Wire Fee       : ${breakdown.courier_wire_fee:>10,.2f}")
    print(f"  Guaranty Assessment Fee (TTIGA) : ${breakdown.guaranty_assessment_fee:>10,.2f}")
    print("-" * 65)
    print(f"  TOTAL ESTIMATED TITLE & CLOSING : ${breakdown.total_title_and_closing_fees:>10,.2f}")
    print("=" * 65 + "\n")


def create_sample_order() -> TitleOrder:
    prop = PropertyInfo(
        street_address="101 S Trinity St",
        city="Decatur",
        state="TX",
        zip_code="76234",
        county="Wise",
        cad_property_id="R000012345",
        legal_description="LOT 4, BLOCK 2, ORIGINAL TOWN OF DECATUR, WISE COUNTY, TEXAS",
        subdivision="Original Town Decatur",
        lot="4",
        block="2"
    )
    buyer = PartyInfo(
        full_name="John & Jane Doe",
        party_type="buyer",
        email="john.doe@example.com",
        phone="940-555-0199"
    )
    seller = PartyInfo(
        full_name="Wise County Holdings LLC",
        party_type="seller",
        email="info@wiseholdings.example.com",
        phone="940-555-0188"
    )
    fees = calculate_settlement_fees(purchase_price=375000.0, loan_amount=300000.0)

    order = TitleOrder(
        order_number="WCT-2026-0089",
        transaction_type=TransactionType.PURCHASE,
        status=OrderStatus.RECEIVED,
        sales_price=375000.0,
        loan_amount=300000.0,
        property_info=prop,
        parties=[buyer, seller],
        fees=fees,
        notes="Wise County Title purchase file with simultaneous lender policy."
    )
    return order


def main():
    parser = argparse.ArgumentParser(description="Wise County Title Project CLI")
    parser.add_argument("--calc", action="store_true", help="Calculate title rate")
    parser.add_argument("--policy-amount", type=float, default=350000.0, help="Policy amount for calculation")
    parser.add_argument("--loan-amount", type=float, default=0.0, help="Loan amount for calculation")
    parser.add_argument("--sample-order", action="store_true", help="Generate and display a sample title order")
    args = parser.parse_args()

    if args.sample_order:
        order = create_sample_order()
        print("Generated Sample Order:")
        print(order.model_dump_json(indent=2))
        return

    if args.calc:
        print_title_quote(price=args.policy_amount, loan=args.loan_amount)
        return

    # Default output
    print(f"Initialized {APP_NAME} in [{ENVIRONMENT}] mode.")
    print_title_quote(price=350000.0, loan=280000.0)


if __name__ == "__main__":
    main()
