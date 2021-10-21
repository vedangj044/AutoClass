from youtube_transcript_api import YouTubeTranscriptApi
import json
from rake_nltk import Rake
from textblob import TextBlob
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from PyDictionary import PyDictionary

transprint = YouTubeTranscriptApi.get_transcript("F1F2imiOJfk")
l = ""

for i in transprint:
    l += i["text"] + " "

l = l.replace("\n", " ")

# with open("trans.json", "w") as f:
#     f.write(l)

def get_topics(l):
    r = Rake()
    r.extract_keywords_from_text(l)

    return r.get_ranked_phrases()

# print(get_topics(l))

text = l
sentences = text.split(".")

noun = []
proper = []
blob = TextBlob(text)

for i in blob.tags:
    if i[1] == 'NNP':
        proper.append(i[0])

for i in blob.tags:
    if i[1] == 'NN':
        noun.append(i[0])

# print(set(noun))
print(set(proper))

for i in set(proper):
    print(i, text.count(i))

kl = set()

final = []

for i in set(proper):
    for j in sentences:
        if i in j:
            if j not in kl:
                final.append(j.replace(i, "_____"))
                kl.add(j)

print(random.choice(final))

dictionary = PyDictionary()
# print(blob.tags)
gh = set()

seg = []
# for i in blob.tags:
#     if i[1] == 'JJ':
#         if i not in gh:
#             gh.add(i[0])
#             ss = dictionary.antonym(i[0])
#             if ss is not None:
#                 seg.append((i[0], ss[0]))

# sek = set()
# tr = []
# for i in sentences:
#     for j in seg:
#         if j[0] in i:
#             if i not in sek:
#                 sek.add(i)
#                 tr.append(i.replace(j[0], j[1]))

# print(tr)