import json
from enum import Enum


class ResType(Enum):
    JS = "js"
    HTML = "html"
    CSS = "css"
    FILE = "file"
    ERROR = "error"

def bytes_json_from_dict(data: dict):
    return bytes(json.dumps(data), encoding="utf-8")


def get_res_type(path: str) -> ResType:
    if path == "/" or path.endswith(".html"):
        res_type = ResType.HTML
    elif path.endswith(".css"):
        res_type = ResType.CSS
    elif path.endswith(".js"):
        res_type = ResType.JS
    else:
        res_type = ResType.FILE

    return res_type
