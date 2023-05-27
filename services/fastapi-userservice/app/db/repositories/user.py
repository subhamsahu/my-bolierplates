import json

from app.models.user import User
from app.schema.user_schema import UserSchema, UserOut, AdminUserOut
from app.schema.response_schema import ResponseSchema


class UserRepository:

    def __init__(self):
        self._user_collection = User

    def get_all_users(self) -> ResponseSchema:
        user_data = self._user_collection.objects()
        user_data = [AdminUserOut.__pydantic_model__.parse_raw(user_item.to_json()) for user_item in user_data]
        return ResponseSchema(user_data)

    def add_user(self, new_user: UserSchema) -> ResponseSchema:
        new_user.save()
        return ResponseSchema(f"User Created Successfully")

    def get_by_email(self, user_email: str) -> ResponseSchema:
        user_data = self._user_collection.objects.get(email=user_email)
        user_out = UserOut.__pydantic_model__.parse_raw(user_data.to_json())
        return ResponseSchema(user_out)

    def delete_user(self, user_email: str) -> ResponseSchema:
        user_data = self._user_collection.objects.get(email=user_email)
        user_data.delete()
        return ResponseSchema("User deleted successfully.")
