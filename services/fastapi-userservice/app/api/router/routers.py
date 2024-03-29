from fastapi import APIRouter

from app.api.admin import router as admin_router
from app.api.auth import router as auth_router

router = APIRouter()

router.include_router(auth_router)
router.include_router(admin_router)