import os
import jwt
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import requests
from typing import Optional

class ClerkAuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.clerk_jwt_key = os.getenv("CLERK_JWT_VERIFICATION_KEY")
        self.public_paths = ["/", "/health", "/docs", "/openapi.json", "/redoc", "/favicon.ico"]

    async def dispatch(self, request: Request, call_next):
        if request.url.path in self.public_paths:
            return await call_next(request)

        if request.method == "OPTIONS":
            return await call_next(request)

        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Token de autorización requerido")

        token = auth_header.split(" ")[1]
        user_id = self._verify_clerk_token(token)
        
        if not user_id:
            raise HTTPException(status_code=401, detail="Token inválido")

        request.state.user_id = user_id
        return await call_next(request)

    def _verify_clerk_token(self, token: str) -> Optional[str]:
        try:
            if not self.clerk_jwt_key:
                return None
            
            decoded = jwt.decode(
                token,
                self.clerk_jwt_key,
                algorithms=["RS256"],
                options={"verify_signature": True}
            )
            
            return decoded.get("sub")
        except jwt.InvalidTokenError:
            return None
        except Exception:
            return None