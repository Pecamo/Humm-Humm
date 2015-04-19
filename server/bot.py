import praw
import time
from html.parser import HTMLParser
from pymongo import MongoClient
from youtube_search import search

db = MongoClient().bot
collection = db.memory


class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        print("Encountered a start tag:", tag)

    def handle_endtag(self, tag):
        print("Encountered an end tag :", tag)

    def handle_data(self, data):
        print("Encountered some data  :", data)

disclaimer = "\n\nI am a bot."
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
            if "http" not in comm.body and collection.find_one({"comm_id": str(submission.id) + str(comm.id)}) is None:
                line = comm.body.split("\n")[0]
                res = search(line)
                if res is not None:
                    print(res)
                    comm.reply("[" + line + "](" + res + ")+\n\nI am a video bot !")
                    collection.insert_one({"comm_id": str(submission.id) + str(comm.id)})
