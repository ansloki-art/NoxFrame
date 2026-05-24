from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, profile, package, category, portfolio, booking

app = FastAPI(title="NoxFrame API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://nox-frame.vercel.app",
    "https://noxframe.vercel.app",
    "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(package.router)
app.include_router(category.router)
app.include_router(portfolio.router)
app.include_router(booking.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}