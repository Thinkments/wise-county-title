"""Data models and schemas for Wise County Title project."""

from datetime import datetime
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field


class TransactionType(str, Enum):
    PURCHASE = "purchase"
    REFINANCE = "refinance"
    EQUITY = "equity"
    COMMERCIAL = "commercial"
    CONSTRUCTION = "construction"


class OrderStatus(str, Enum):
    RECEIVED = "received"
    SEARCH_IN_PROGRESS = "search_in_progress"
    EXAMINATION = "examination"
    COMMITMENT_ISSUED = "commitment_issued"
    CLEARING_TITLE = "clearing_title"
    CLOSING_SCHEDULED = "closing_scheduled"
    CLOSED_AND_FUNDED = "closed_and_funded"
    RECORDED = "recorded"
    POLICY_ISSUED = "policy_issued"
    CANCELLED = "cancelled"


class PropertyInfo(BaseModel):
    street_address: str
    city: str = "Decatur"
    state: str = "TX"
    zip_code: str = "76234"
    county: str = "Wise"
    cad_property_id: Optional[str] = None
    legal_description: Optional[str] = None
    subdivision: Optional[str] = None
    lot: Optional[str] = None
    block: Optional[str] = None


class PartyInfo(BaseModel):
    full_name: str
    party_type: str = Field(..., description="buyer, seller, borrower, lender, or agent")
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class TitleFeeBreakdown(BaseModel):
    policy_amount: float
    owners_title_policy_premium: float
    loan_policy_premium: float = 0.0
    simultaneous_issue_fee: float = 0.0
    escrow_fee: float = 450.0
    tax_certificate_fee: float = 65.0
    e_recording_fee: float = 10.0
    courier_wire_fee: float = 35.0
    guaranty_assessment_fee: float = 2.0
    total_title_and_closing_fees: float


class TitleOrder(BaseModel):
    order_number: str
    transaction_type: TransactionType = TransactionType.PURCHASE
    status: OrderStatus = OrderStatus.RECEIVED
    sales_price: Optional[float] = None
    loan_amount: Optional[float] = None
    property_info: PropertyInfo
    parties: List[PartyInfo] = []
    fees: Optional[TitleFeeBreakdown] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    target_closing_date: Optional[datetime] = None
    notes: Optional[str] = None
