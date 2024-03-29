from fastapi import FastAPI
from schema.services.request import (
    ULCATranslationInferenceRequest,
    ULCATtsInferenceRequest,
    ULCAAsrInferenceRequest,
    ULCAFeedbackRequest,
    ULCAFeedbackQuestionRequest,
)
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import json
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from starlette.requests import Request

# from slowapi.util import get_remote_address
def get_remote_address(request: Request) -> str:
    """
    Returns the ip address for the current request (or 127.0.0.1 if none found)
    """
    real_ip = request.headers.get('X-Forwarded-For', None) # Proxy server
    if real_ip:
        return real_ip
    real_ip = request.headers.get('cf-connecting-ip', None) # Cloudflare
    if real_ip:
        return real_ip
    
    if not request.client or not request.client.host:
        return "127.0.0.1"

    return request.client.host

BASE_DHRUVA_URL = os.environ.get("BASE_DHRUVA_URL", "http://localhost:8000")
API_KEY = os.environ.get("API_KEY", "")
limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/inference/feedback")
async def feedback(request: ULCAFeedbackRequest):
    request = request.dict()
    request["pipelineInput"]["controlConfig"] = {"dataTracking": True}
    response = requests.post(
        f"{BASE_DHRUVA_URL}/services/feedback/submit",
        data=json.dumps(request),
        headers={"x-auth-source": "API_KEY", "Authorization": API_KEY},
    )
    response.raise_for_status()
    result = json.loads(response.text)
    return result


@app.get("/languages")
async def fetch_languages(request: Request):
    
    # with open("languages.json", "r") as f:
    #     languages = json.load(f)
    # with open("languages_dict.json", "r") as f:
    #     languages_dict = json.load(f)

    return {
        # "indicTransV2": [languages,languages_dict],
        "indicConformer": ["en", "ta", "te", "kn", "ml", "hi", "gu", "mr", "or", "pa", "bn", "as", "ur", "sa"],
        "indicWhisper": ["en", "hi"],
        "indicTTS": ["en", "brx", "mni", "gu", "mr", "or", "pa", "bn", "hi", "as", "raj", "ta", "te", "kn", "ml"],
    }


@app.post("/inference/translation/v1")
@limiter.limit("6/minute")
async def translation(body: ULCATranslationInferenceRequest, request: Request):
    request = body.dict()
    request["config"]["serviceId"] = "ai4bharat/indictrans-fairseq-all-gpu--t4"
    response = requests.post(
        f"{BASE_DHRUVA_URL}/services/inference/translation?serviceId={request['config']['serviceId']}",
        data=json.dumps(request),
        headers={"x-auth-source": "API_KEY", "Authorization": API_KEY},
    )
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result


@app.post("/inference/translation/v2")
@limiter.limit("6/minute")
async def translation_v2(body: ULCATranslationInferenceRequest, request: Request):
    request = body.dict()
    request["config"]["serviceId"] = "ai4bharat/indictrans-v2-all-gpu--t4"
    response = requests.post(
        f"{BASE_DHRUVA_URL}/services/inference/translation?serviceId={request['config']['serviceId']}",
        data=json.dumps(request),
        headers={"x-auth-source": "API_KEY", "Authorization": API_KEY},
    )
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result


@app.post("/inference/tts")
@limiter.limit("6/minute")
async def tts_misc(body: ULCATtsInferenceRequest, request: Request):
    request = body.dict()
    if request["config"]["language"]["sourceLanguage"] in ["en", "brx", "mni"]:
        request["config"]["serviceId"] = "ai4bharat/indic-tts-coqui-misc-gpu--t4"
    elif request["config"]["language"]["sourceLanguage"] in ["gu", "mr", "or", "pa", "bn", "hi", "as", "raj"]:
        request["config"]["serviceId"] = "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4"
    elif request["config"]["language"]["sourceLanguage"] in ["ta", "te", "kn", "ml"]:
        request["config"]["serviceId"] = "ai4bharat/indic-tts-coqui-dravidian-gpu--t4"
    print(request)
    response = requests.post(
        f"{BASE_DHRUVA_URL}/services/inference/tts?serviceId={request['config']['serviceId']}",
        data=json.dumps(request),
        headers={"x-auth-source": "API_KEY", "Authorization": API_KEY},
    )
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result


@app.post("/inference/asr/conformer")
@limiter.limit("6/minute")
async def asr_cnf(body: ULCAAsrInferenceRequest, request: Request):
    request = body.dict()
    if request["config"]["language"]["sourceLanguage"] in ["en"]:
        request["config"]["serviceId"] = "ai4bharat/conformer-en-gpu--t4"
    elif request["config"]["language"]["sourceLanguage"] in ["hi"]:
        request["config"]["serviceId"] = "ai4bharat/conformer-hi-gpu--t4"
    elif request["config"]["language"]["sourceLanguage"] in ["gu", "mr", "or", "pa", "bn", "as", "ur", "sa"]:
        request["config"]["serviceId"] = "ai4bharat/conformer-multilingual-indo_aryan-gpu--t4"
    elif request["config"]["language"]["sourceLanguage"] in ["ta", "te", "kn", "ml"]:
        request["config"]["serviceId"] = "ai4bharat/conformer-multilingual-dravidian-gpu--t4"

    response = requests.post(
        f"{BASE_DHRUVA_URL}/services/inference/asr?serviceId={request['config']['serviceId']}",
        data=json.dumps(request),
        headers={"x-auth-source": "API_KEY", "Authorization": API_KEY},
    )
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result


@app.post("/inference/asr/whisper")
@limiter.limit("6/minute")
async def asr_en(body: ULCAAsrInferenceRequest, request: Request):
    request = body.dict()
    if request["config"]["language"]["sourceLanguage"] in ["en"]:
        request["config"]["serviceId"] = "ai4bharat/whisper-medium-en--gpu--t4"
    elif request["config"]["language"]["sourceLanguage"] in ["hi"]:
        request["config"]["serviceId"] = "ai4bharat/whisper-medium-hi--gpu--t4"

    response = requests.post(
        f"{BASE_DHRUVA_URL}/services/inference/asr?serviceId={request['config']['serviceId']}",
        data=json.dumps(request),
        headers={"x-auth-source": "API_KEY", "Authorization": API_KEY},
    )
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result


@app.post("/feedback/questions")
async def fetch_feedback_questions(request: ULCAFeedbackQuestionRequest):
    req = request.dict()

    try:
        res = requests.post(
            "https://dev-auth.ulcacontrib.org/ulca/mdms/v0/pipelineQuestions",
            json=req,
        )
    except Exception as e:
        return e
    return res.json()
