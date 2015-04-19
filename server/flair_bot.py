import praw
from pymongo import MongoClient

db = MongoClient().bot
collection = db.memory

tags = ["{indeed}", "{Indeed}"]
solved_flair = "[SOLVED]"

r = praw.Reddit(user_agent="humm_youtube")
r.login("humm_mod_bot", "azlog--88")
subreddit = r.get_subreddit('hummhumm')
submissions = subreddit.get_new(limit=100)

for submission in submissions:
    if submission.link_flair_text is None or submission.link_flair_text != solved_flair:
        for comment in submission.comments:
            for rep in comment.replies:
                tagged = [tag for tag in tags if tag in str(rep)]
                if len(tagged) > 0:
                    if rep.author == comment.author:
                        print("YAY")
                        submission.set_flair(solved_flair)