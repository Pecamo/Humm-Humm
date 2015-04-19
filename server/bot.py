import praw
import time
from html.parser import HTMLParser
import requests
from youtube_search import search

class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        print("Encountered a start tag:", tag)

    def handle_endtag(self, tag):
        print("Encountered an end tag :", tag)

    def handle_data(self, data):
        print("Encountered some data  :", data)

disclaimer = "\n\nI am a bot."
tag = "[Answer]"
yt_search = "https://www.youtube.com/results?search_query="

r = praw.Reddit(user_agent="humm_youtube")
r.login("humm_youtube", "humm_youtube")
subreddit = r.get_subreddit('hummhumm')
submissions = subreddit.get_new(limit=100)
current_time = time.time()
for submission in submissions:
    sub_age = (current_time - submission.created_utc) / 60 / 60 / 24
    if sub_age < 1 and submission.comments != []:
        for comm in submission.comments:
            if tag in comm.body and "http" not in comm.body:
                for line in comm.body.split("\n"):
                    if tag in line:
                        line = line.replace(tag, '')
                        res = search(line)
                        print(res)
                        comm.reply(res)
