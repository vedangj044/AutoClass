from youtube_transcript_api import YouTubeTranscriptApi
import json
from rake_nltk import Rake

import nltk
nltk.download("stopwords")
nltk.download("punkt")

transprint = YouTubeTranscriptApi.get_transcript("F1F2imiOJfk")
l = ""

for i in transprint:
    l += i["text"] + " "


# with open("trans.json", "w") as f:
#     f.write(l)

def get_topics(l):
    r = Rake()
    r.extract_keywords_from_text(l)

    return r.get_ranked_phrases()

print(get_topics(l))