import json
from enum import Enum


class ResType(Enum):
    JS = "js"
    HTML = "html"
    CSS = "css"
    FILE = "file"
    ERROR = "error"
    SOUND = "sound"
    PLAYER = "player"


def bytes_json_from_dict(data: dict):
    return bytes(json.dumps(data), encoding="utf-8")


def get_res_type(path: str) -> ResType:
    if path == "/" or path.endswith(".html"):
        res_type = ResType.HTML
    elif path.endswith(".css"):
        res_type = ResType.CSS
    elif path.endswith(".js"):
        res_type = ResType.JS
    elif path.split("/")[1] == "sounds":
        res_type = ResType.SOUND
    elif path.split("/")[1] == "player":
        res_type = ResType.PLAYER
    else:
        res_type = ResType.FILE

    return res_type


def get_player_for_sound(ref: str) -> str:
        with open("sound_player.tpl", "r") as player:
            whole = player.read()
            splits = whole.split("$$")
            splits[1] = ref
        return "".join(splits)