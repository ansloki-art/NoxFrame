"""add payment fields to bookings

Revision ID: a1b2c3d4e5f6
Revises: b8b0e16dbc85
Create Date: 2026-05-25

"""
from alembic import op
import sqlalchemy as sa

revision = 'a1b2c3d4e5f6'
down_revision = '1dd93d740cea'
branch_labels = None
depends_on = None

def upgrade():
    # Add new enum values to bookingstatus
    op.execute("ALTER TYPE bookingstatus ADD VALUE IF NOT EXISTS 'dp_paid'")
    op.execute("ALTER TYPE bookingstatus ADD VALUE IF NOT EXISTS 'fully_paid'")

    # Add payment columns
    op.add_column('bookings', sa.Column('dp_amount', sa.Integer(), nullable=True))
    op.add_column('bookings', sa.Column('full_amount', sa.Integer(), nullable=True))
    op.add_column('bookings', sa.Column('dp_link', sa.String(), nullable=True))
    op.add_column('bookings', sa.Column('full_link', sa.String(), nullable=True))

def downgrade():
    op.drop_column('bookings', 'full_link')
    op.drop_column('bookings', 'dp_link')
    op.drop_column('bookings', 'full_amount')
    op.drop_column('bookings', 'dp_amount')