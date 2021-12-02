from math import log10
from konlpy.tag import Okt
# =======================================
# -- TF-IDF function
# =======================================
def f(t, d):
    # d is document == tokens
    return d.count(t)

def tf(t, d):
    # d is document == tokens
    return 0.5 + 0.5*f(t,d)/max([f(w,d) for w in d])

def idf(t, D):
    # D is documents == document list
    numerator = len(D)
    denominator = 1 + len([ True for d in D if t in d])
    return log10(numerator/denominator)

def tfidf(t, d, D):
    return tf(t,d)*idf(t, D)


not_token = ['오늘', '도대체', '왜', '다시', '가기', '가면', '이번']


def tokenizer(d):
    twit = Okt()
    def keyword_extractor(text):
        tokens = twit.phrases(text)
        #print('original_token' ,tokens)
        #tokens = [i for i in tokens if i in not_token]

        for t in tokens[:]: # 복사본을 루프에 넣고 돌리는 방식
            for a in not_token:
                if a in t:
                    #print('있는거 : ', t)
                    #print('a : ', a )
                    if t in tokens:
                        tokens.remove(t)


        #print('new_token', tokens)
        tokens = [token for token in tokens if len(token) > 1]  # 한 글자인 단어는 제외
        count_dict = [(token, text.count(token)) for token in tokens]
        #print('cd : ',count_dict)
        ranked_words = sorted(count_dict, key=lambda x: x[1], reverse=True)[:20]
        # 중복 제거 : 더 우선순위인 걸로 합쳐지게
       # print('ranked_words : ', ranked_words)
        return [keyword for keyword, freq in ranked_words]
        #print('keyword : ',keyword)
    return keyword_extractor(d)

def tfidfScorer(D):
    tokenized_D = [tokenizer(d) for d in D]
    result = []
    for d in tokenized_D:
        result.append([(t, tfidf(t, d, tokenized_D)) for t in d])
    return result
