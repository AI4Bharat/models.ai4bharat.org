from fastapi import FastAPI
from schema.services.request import ULCATranslationInferenceRequest,ULCATtsInferenceRequest,ULCAAsrInferenceRequest,ULCAFeedbackRequest
from schema.services.response import ULCATranslationInferenceResponse
import requests
import os
import json



BASE_DHRUVA_URL = os.environ.get("BASE_DHRUVA_URL","http://localhost:8080")
API_KEY = os.environ.get("API_KEY","")

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post('/inference/feedback')
async def feedback(request: ULCAFeedbackRequest):
    request = request.dict()
    response = requests.post(f"{BASE_DHRUVA_URL}/services/feedback/submit",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result


@app.post("/inference/translation/v1")
async def translation(request: ULCATranslationInferenceRequest):
    request = request.dict()
    request['config']['serviceId'] = "ai4bharat/indictrans-fairseq-all-gpu--t4"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/translation?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result

@app.post("/inference/translation/v2")
async def translation_v2(request: ULCATranslationInferenceRequest):
    request = request.dict()
    request['config']['serviceId'] = "ai4bharat/indictrans-v2-all-gpu--t4"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/translation?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result

@app.post("/inference/tts/misc")
async def tts_misc(request: ULCATtsInferenceRequest):
    request = request.dict()
    request['config']['serviceId'] = "ai4bharat/indic-tts-coqui-misc-gpu--t4"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/tts?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result

@app.post("/inference/tts/dravidian")
async def tts_misc(request: ULCATtsInferenceRequest):
    request = request.dict()
    request['config']['serviceId'] = "ai4bharat/indic-tts-coqui-dravidian-gpu--t4"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/tts?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result

@app.post("/inference/tts/indoaryan")
async def tts_misc(request: ULCATtsInferenceRequest):
    request = ULCATtsInferenceRequest(**request)
    request['config']['serviceId'] = "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/tts?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result

@app.post("/inference/asr/conformer/en")
async def asr_en(request: ULCAAsrInferenceRequest):
    request = ULCAAsrInferenceRequest(**request)
    request['config']['serviceId'] = "ai4bharat/conformer-en-gpu--t4"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/asr?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result

@app.post("/inference/asr/conformer/hi")
async def asr_hi(request: ULCAAsrInferenceRequest):
    request = request.dict()
    request['config']['serviceId'] = "ai4bharat/conformer-hi-gpu--t4"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/asr?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result

@app.post("/inference/asr/conformer/indoaryan")
async def asr_indoaryan(request: ULCAAsrInferenceRequest):
    request = request.dict()
    request['config']['serviceId'] = "ai4bharat/conformer-multilingual-indo_aryan-gpu"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/asr?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result

@app.post("/inference/asr/conformer/dravidian")
async def asr_dravidian(request: ULCAAsrInferenceRequest):
    request = request.dict()
    request['config']['serviceId'] = "ai4bharat/conformer-multilingual-dravidian-gpu"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/asr?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result

@app.post("/inference/asr/whisper/en")
async def asr_en(request: ULCAAsrInferenceRequest):
    request = request.dict()
    request['config']['serviceId'] = "ai4bharat/whisper-medium-en--gpu--t4"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/asr?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result

@app.post("/inference/asr/whisper/hi")
async def asr_hi(request: ULCAAsrInferenceRequest):
    request = request.dict()
    request['config']['serviceId'] = "ai4bharat/whisper-medium-hi--gpu--t4"
    response = requests.post(f"{BASE_DHRUVA_URL}/services/inference/asr?serviceId={request['config']['serviceId']}",data=json.dumps(request),headers={"x-auth-source":"API_KEY","Authorization":API_KEY})
    try:
        result = json.loads(response.text)
    except:
        result = response.text
    return result