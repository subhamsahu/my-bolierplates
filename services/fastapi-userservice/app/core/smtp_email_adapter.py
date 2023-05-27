from typing import List
from app.models.user import User
from pydantic import EmailStr
from app.core.constants import SITE_URL, SITE_NAME
from app.core.settings import PRODUCTION
from app.core import settings
from app.utils import oauth2

from fastapi_mail import FastMail, MessageSchema,ConnectionConfig



conf = ConnectionConfig(
    MAIL_USERNAME = settings.EMAIL_HOST_USER,
    MAIL_PASSWORD = settings.EMAIL_HOST_PASSWORD,
    MAIL_FROM = settings.EMAIL_HOST_USER,
    MAIL_PORT = settings.EMAIL_PORT,
    MAIL_SERVER = settings.EMAIL_HOST,
    MAIL_FROM_NAME="Shipbharat",
    MAIL_TLS = True,
    MAIL_SSL = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)


def send_mail(email: List[EmailStr], instance: User):
    """send Account Verification mail"""


    token = oauth2.create_access_token(
                    data={'email': instance.email})

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
        return
        
    message = MessageSchema(
        subject=SITE_NAME + " account verification",
        recipients=email,  # List of recipients,
        body=template,
        subtype="html"
    )
    fm = FastMail(conf)
    fm.send_message(message)
