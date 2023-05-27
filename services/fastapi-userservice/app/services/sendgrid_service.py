import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.core.settings import SITE_URL, SITE_NAME
from app.core.settings import SENDGRID_API_KEY,SENDER_MAIL,PRODUCTION


class Sendgrid:
    def __init__(self) -> None:
        self.api_key = SENDGRID_API_KEY
        self.from_email = SENDER_MAIL
        self.subject = ""
        self.html_content = ""

    def send_user_verification_mail(self, to_email, access_token):
        try:
            token = access_token
            template = f"""
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <div style = "display:flex; align-items: center; flex-direction: column" >
                        <h3>Account Verification</H3>

                        <br>

                        <p>
                            Thanx for choosing us, please click on the button below
                            to verify your account
                        </p>
                        
                        <a style = "display:marign-top: 1rem ; padding: 1rem; border-redius: 0.5rem;
                        font-size:1rem; text-decoration: no; background: #0275d8; color:white"
                        href="{SITE_URL}/api/v1/auth/verify/email/?token={token}">
                            Verify your email
                        </a>
                    </div>
                </body>
                </html>
            """
            if not PRODUCTION:
                print(template)
                return True, "Email Sent Successfully"
            self.subject = "Account Verification Mail"
            message = Mail(
                from_email=self.from_email,
                to_emails=to_email,
                subject=f"{self.subject}",
                html_content=template
                )
            sg = SendGridAPIClient(self.api_key)
            response = sg.send(message)
            if str(response.status_code) == "202":
                return True, "Email Sent Successfully"
            else:
                return False, "Email not sent"
        except Exception as e:
            return False, str(e)

    def send_otp_verification_sms(self,phone,otp):
        try:
            template = f'''
                Dear User, OTP to your Account is {otp}.
                OTP will expire in 10 minutes.
                On Expiry Please Regenerate OTP.  
            '''
            # Expiration of OTP needs to be implement 
            if not PRODUCTION:
                print(template)
                return True, "OTP Sent Successfully"
            # Actual OTP Send Code will go here
        except Exception as e:
            return False, str(e)