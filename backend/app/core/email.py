import httpx
from app.core.config import settings

def send_booking_confirmation(
    client_email: str,
    client_name: str,
    event_date: str,
    event_location: str,
    dp_amount: int = None,
    full_amount: int = None,
    dp_link: str = None,
    full_link: str = None,
):
    if not client_email or not settings.RESEND_API_KEY:
        return

    def fmt_rp(amount):
        return f"Rp {amount:,.0f}".replace(",", ".")

    dp_section = ""
    if dp_link:
        dp_section = f"""
        <tr>
          <td style="padding: 8px 0; color: #aaa; font-size: 14px;">Bayar DP</td>
          <td style="padding: 8px 0; color: #fff; font-size: 14px; text-align: right;">
            {fmt_rp(dp_amount) if dp_amount else ""}
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding-bottom: 16px;">
            <a href="{dp_link}" style="display:inline-block; padding: 10px 24px; background: #C9A84C; color: #000; text-decoration: none; font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
              Bayar DP Sekarang
            </a>
          </td>
        </tr>
        """

    full_section = ""
    if full_link:
        full_section = f"""
        <tr>
          <td style="padding: 8px 0; color: #aaa; font-size: 14px;">Bayar Penuh</td>
          <td style="padding: 8px 0; color: #fff; font-size: 14px; text-align: right;">
            {fmt_rp(full_amount) if full_amount else ""}
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding-bottom: 16px;">
            <a href="{full_link}" style="display:inline-block; padding: 10px 24px; border: 1px solid #C9A84C; color: #C9A84C; text-decoration: none; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">
              Bayar Penuh Sekarang
            </a>
          </td>
        </tr>
        """

    html = f"""
    <html>
    <body style="background:#0a0a0a; color:#fff; font-family: Arial, sans-serif; margin:0; padding:0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; margin:40px auto; background:#1a1a1a; border:1px solid #2a2a2a;">
        <tr>
          <td style="padding: 32px; border-bottom: 1px solid #C9A84C;">
            <p style="color:#C9A84C; letter-spacing:4px; text-transform:uppercase; font-size:12px; margin:0 0 8px 0;">NoxFrame</p>
            <h1 style="color:#fff; font-size:22px; margin:0;">Booking Dikonfirmasi</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px;">
            <p style="color:#aaa; font-size:14px; margin:0 0 24px 0;">
              Halo <strong style="color:#fff;">{client_name}</strong>,<br>
              Booking Anda telah kami konfirmasi. Silakan lakukan pembayaran untuk mengunci jadwal Anda.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #2a2a2a; margin-bottom:24px;">
              <tr>
                <td style="padding: 16px 0 8px 0; color:#aaa; font-size:12px; letter-spacing:2px; text-transform:uppercase;">Detail Booking</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color:#aaa; font-size:14px;">Tanggal</td>
                <td style="padding: 4px 0; color:#fff; font-size:14px; text-align:right;">{event_date}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0 16px 0; color:#aaa; font-size:14px;">Lokasi</td>
                <td style="padding: 4px 0 16px 0; color:#fff; font-size:14px; text-align:right;">{event_location}</td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #2a2a2a; margin-bottom:24px;">
              <tr>
                <td style="padding: 16px 0 8px 0; color:#aaa; font-size:12px; letter-spacing:2px; text-transform:uppercase;">Pembayaran</td>
              </tr>
              {dp_section}
              {full_section}
            </table>
            <p style="color:#555; font-size:12px; margin:0;">
              Pertanyaan? Hubungi kami via WhatsApp.<br>
              Jadwal akan dikunci setelah DP diterima.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 32px; border-top:1px solid #2a2a2a;">
            <p style="color:#333; font-size:11px; margin:0;">© NoxFrame Photography</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    """

    try:
        httpx.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": "NoxFrame <onboarding@resend.dev>",
                "to": [client_email],
                "subject": "Booking Anda Dikonfirmasi — NoxFrame",
                "html": html,
            },
        )
    except Exception as e:
        print(f"Email error: {e}")