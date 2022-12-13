from pydantic import BaseModel
from pydantic.dataclasses import dataclass


class AppSchema(BaseModel):
    pass


@dataclass
class AppSchemaOut(BaseModel):
    pass
