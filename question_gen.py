from youtube_transcript_api import YouTubeTranscriptApi
import json

transprint = YouTubeTranscriptApi.get_transcript("F1F2imiOJfk")
l = ""

for i in transprint:
    l += i["text"] + " "


with open("trans.json", "w") as f:
    f.write(l)
