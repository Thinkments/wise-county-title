"""Texas Title Insurance Rate Calculator Engine (TDI Promulgated Rates).

Implements the official Texas Department of Insurance (TDI) basic premium rate calculation
formula as defined in the Texas Basic Manual of Rules, Rates and Forms for the
Writing of Title Insurance in the State of Texas (Rate Rule R-1).
"""

import math
from typing import Dict, Any
from .models import TitleFeeBreakdown


def calculate_texas_title_premium(policy_amount: float) -> float:
    """Calculate the Texas promulgated basic title insurance premium (Rule R-1).
    
    Args:
        policy_amount: The face amount of the policy in USD.
        
    Returns:
        float: Promulgated title insurance premium rounded to nearest dollar.
    """
    if policy_amount <= 0:
        return 0.0
    
    # Policies under $10,000 have a base minimum rate of $328
    if policy_amount <= 10000:
        return 328.0

    # Policy amounts are rounded up to the next $1,000 bracket
    bracket_amount = math.ceil(policy_amount / 1000.0) * 1000.0

    if bracket_amount <= 100000:
        # $10,001 to $100,000: $328 + $5.27 per $1,000 over $10,000
        over_10k = (bracket_amount - 10000) / 1000.0
        premium = 328.0 + (over_10k * 5.27)
    elif bracket_amount <= 1000000:
        # $100,001 to $1,000,000: $802 + $4.33 per $1,000 over $100,000
        over_100k = (bracket_amount - 100000) / 1000.0
        premium = 802.0 + (over_100k * 4.33)
    elif bracket_amount <= 5000000:
        # $1,000,001 to $5,000,000: $4,699 + $3.57 per $1,000 over $1,000,000
        over_1m = (bracket_amount - 1000000) / 1000.0
        premium = 4699.0 + (over_1m * 3.57)
    elif bracket_amount <= 15000000:
        # $5,000,001 to $15,000,000: $18,979 + $2.99 per $1,000 over $5,000,000
        over_5m = (bracket_amount - 5000000) / 1000.0
        premium = 18979.0 + (over_5m * 2.99)
    elif bracket_amount <= 25000000:
        # $15,000,001 to $25,000,000: $48,879 + $2.52 per $1,000 over $15,000,000
        over_15m = (bracket_amount - 15000000) / 1000.0
        premium = 48879.0 + (over_15m * 2.52)
    elif bracket_amount <= 50000000:
        # $25,000,001 to $50,000,000: $74,079 + $2.14 per $1,000 over $25,000,000
        over_25m = (bracket_amount - 25000000) / 1000.0
        premium = 74079.0 + (over_25m * 2.14)
    else:
        # Over $50,000,000: $127,579 + $1.80 per $1,000 over $50,000,000
        over_50m = (bracket_amount - 50000000) / 1000.0
        premium = 127579.0 + (over_50m * 1.80)

    return round(premium, 2)


def calculate_settlement_fees(
    purchase_price: float,
    loan_amount: float = 0.0,
    escrow_fee: float = 450.0,
    tax_cert_fee: float = 65.0,
    e_recording_fee: float = 10.0,
    courier_wire_fee: float = 35.0,
    guaranty_fee: float = 2.0
) -> TitleFeeBreakdown:
    """Calculate full title insurance and settlement estimate for a transaction.
    
    Includes Owner's Title Policy (OTP), simultaneous issue Loan Policy (LP) (Rule R-5),
    and standard Wise County escrow and recording fees.
    """
    otp_premium = calculate_texas_title_premium(purchase_price)
    
    simultaneous_issue_fee = 0.0
    loan_policy_premium = 0.0

    if loan_amount > 0:
        if loan_amount <= purchase_price:
            # Rule R-5: Simultaneous issue of Loan Policy with Owner Policy is $100
            simultaneous_issue_fee = 100.0
            loan_policy_premium = 0.0
        else:
            # If Loan amount exceeds OTP, basic rate on excess plus $100
            excess_amount = loan_amount - purchase_price
            excess_premium = calculate_texas_title_premium(excess_amount)
            loan_policy_premium = excess_premium
            simultaneous_issue_fee = 100.0

    total_fees = (
        otp_premium
        + loan_policy_premium
        + simultaneous_issue_fee
        + escrow_fee
        + tax_cert_fee
        + e_recording_fee
        + courier_wire_fee
        + guaranty_fee
    )

    return TitleFeeBreakdown(
        policy_amount=purchase_price,
        owners_title_policy_premium=otp_premium,
        loan_policy_premium=loan_policy_premium,
        simultaneous_issue_fee=simultaneous_issue_fee,
        escrow_fee=escrow_fee,
        tax_certificate_fee=tax_cert_fee,
        e_recording_fee=e_recording_fee,
        courier_wire_fee=courier_wire_fee,
        guaranty_assessment_fee=guaranty_fee,
        total_title_and_closing_fees=round(total_fees, 2)
    )
