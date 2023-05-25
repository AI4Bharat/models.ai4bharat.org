from fastapi import FastAPI
from schema.services.request import (
    ULCATranslationInferenceRequest,
    ULCATtsInferenceRequest,
    ULCAAsrInferenceRequest,
    ULCAFeedbackRequest,
    ULCAFeedbackQuestionRequest
)
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import json
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.requests import Request


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
    response = requests.post(
        f"{BASE_DHRUVA_URL}/services/feedback/submit",
        data=json.dumps(request),
        headers={"x-auth-source": "API_KEY", "Authorization": API_KEY},
    )
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result


@app.get("/languages")
async def fetch_languages(request: Request):
    return {
        "indicTransV1": [""],
        "indicTransV2": [""],
        "indicConformer-en": ["en"],
        "indicConformer-hi": ["hi"],
        "indicConformer-indo_aryan": ["gu", "mr", "or", "pa", "bn", "as", "ur", "sa"],
        "indicConformer-dravidian": ["ta", "te", "kn", "ml"],
        "indicWhisper-en": ["en"],
        "indicWhisper-hi": ["hi"],
        "indicTTS-misc": ["en", "brx", "mni"],
        "indicTTS-indo_aryan": ["gu", "mr", "or", "pa", "bn", "hi", "as", "raj"],
        "indicTTS-dravidian": ["ta", "te", "kn", "ml"],
    }


@app.post("/inference/translation/v1")
@limiter.limit("6/minute")
async def translation(body: ULCATranslationInferenceRequest, request: Request):
    request = body.dict()
    request["config"]["serviceId"] = "ai4bharat/indictrans-fairseq-all-gpu--t4"
    print(request)
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
async def asr_en(body: ULCAAsrInferenceRequest, request: Request):
    request = body.dict()
    if request["config"]["language"] in ["en"]:
        request["config"]["serviceId"] = "ai4bharat/conformer-en-gpu--t4"
    elif request["config"]["language"] in ["hi"]:
        request["config"]["serviceId"] = "ai4bharat/conformer-hi-gpu--t4"
    elif request["config"]["language"] in ["gu", "mr", "or", "pa", "bn", "as", "ur", "sa"]:
        request["config"]["serviceId"] = "ai4bharat/conformer-multilingual-indo_aryan-gpu"
    elif request["config"]["language"] in ["ta", "te", "kn", "ml"]:
        request["config"]["serviceId"] = "ai4bharat/conformer-multilingual-dravidian-gpu"


@app.post("/inference/asr/whisper")
@limiter.limit("6/minute")
async def asr_en(body: ULCAAsrInferenceRequest, request: Request):
    request = body.dict()
    if request["config"]["language"] in ["en"]:
        request["config"]["serviceId"] = "ai4bharat/whisper-medium-en--gpu--t4"
    elif request["config"]["language"] in ["hi"]:
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