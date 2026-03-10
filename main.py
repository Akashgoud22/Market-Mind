from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

from services.campaign import generate_campaign
from services.pitch import generate_pitch
from services.lead import lead_score
from services.market import market_analysis


app = FastAPI(title="Market Mind AI")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Market Mind AI Running"}


@app.post("/campaign")
def campaign(
    product: str = Form(...),
    audience: str = Form(...),
    platform: str = Form(...),
    tone: str = Form(...),
    campaign_type: str = Form(...),
    competitive: bool = Form(False)
):

    try:

        print("Campaign Request Received:")
        print(product, audience, platform, tone, campaign_type, competitive)

        result = generate_campaign(product, audience, platform, tone, campaign_type, competitive)

        return {"result": result}

    except Exception as e:

        print("CAMPAIGN ERROR:", str(e))

        return {"result": f"Backend error: {str(e)}"}


@app.post("/pitch")
def pitch(product: str = Form(...), customer: str = Form(...)):

    try:

        result = generate_pitch(product, customer)

        return {"result": result}

    except Exception as e:

        print("PITCH ERROR:", str(e))

        return {"result": f"Backend error: {str(e)}"}


@app.post("/lead")
def lead(
    name: str = Form(...),
    budget: str = Form(...),
    need: str = Form(...),
    urgency: str = Form(...)
):

    try:

        result = lead_score(name, budget, need, urgency)

        return {"result": result}

    except Exception as e:

        print("LEAD ERROR:", str(e))

        return {"result": f"Backend error: {str(e)}"}


@app.post("/market")
def market(product: str = Form(...), competitors: str = Form(...)):

    try:

        result = market_analysis(product, competitors)

        return {"result": result}

    except Exception as e:

        print("MARKET ERROR:", str(e))

        return {"result": f"Backend error: {str(e)}"}