#!/usr/bin/python


def search(terms:str) -> str:
    from apiclient.discovery import build

    DEVELOPER_KEY = "AIzaSyBVk8ehRDkKHZ9umTUdsoMZlzbZyP_nvN0"
    YOUTUBE_API_SERVICE_NAME = "youtube"
    YOUTUBE_API_VERSION = "v3"

    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)

    search_response = youtube.search().list(q=terms, part="id,snippet", maxResults=10).execute()

    youtube_watch = "https://www.youtube.com/watch?v="

    video_results = [search_result for search_result in search_response.get("items", [])
                    if search_result["id"]["kind"] == "youtube#video"]
    if len(video_results) > 0:
        return youtube_watch + video_results[0]["id"]["videoId"]
    else:
        return None