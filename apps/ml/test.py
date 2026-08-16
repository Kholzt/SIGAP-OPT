from app.src.services.opt_service import OptService
from app.config.db import SessionLocal


db = SessionLocal()

optService = OptService(db)
print(optService.get_histori_serangan() )