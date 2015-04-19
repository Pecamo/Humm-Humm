#!/usr/bin/python

from apiclient.discovery import build


DEVELOPER_KEY = "AIzaSyBVk8ehRDkKHZ9umTUdsoMZlzbZyP_nvN0"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)

search_response = youtube.search().list(q="darude sandstorm", part="id,snippet", maxResults=10).execute()


for search_result in search_response.get("items", []):
    if search_result["id"]["kind"] == "youtube#video":
        print(search_result)