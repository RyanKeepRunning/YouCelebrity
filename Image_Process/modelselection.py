import Fcnn_test as celebrity
import Fcnn_anime as anime 
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time

cred = credentials.Certificate('firebase-adminsdk.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

def find_upload_data():
    doc_pull = db.collection(u'imgs').document(u'img')
    imgdata = doc_pull.get().to_dict()
    if imgdata is not None:
        imgmodel = imgdata['model']
	print imgmodel 
        if imgmodel == "Anime":
	    print "using anime"
            anime.find_upload_data(db)
            find_upload_data()
        else:
	    print "using celebrity"
            celebrity.find_upload_data(db)
            find_upload_data()
    else:
        print("img not uploaded yet")
        time.sleep(5)
        find_upload_data()

find_upload_data()
