import time
import json
from imgur_python import Imgur
import os
from PIL import Image
import numpy as np
import cv2

import requests
from flask import Flask, request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

total_info = []

@app.route('/api/', methods=['GET'])
def get_all_info():
     return jsonify(total_info)

#this method is get for now just to test, later should change to post
@app.route('/api', methods=['POST'])
def submit_image():
    image = request.files["photo"]
    path = os.path.join('/Users/yannbonzom/Desktop/Programming/MAIS Hacks 2022/nutri_tracker/server/images', image.filename + ".jpg")
    image.save(path)

    # food = analyze(path)
    food = "burger"

    headers = {'Content-Type':'application/json', 'x-app-id':'060cfd73', 'x-app-key':'e185481be83614e23e0af33a9a839f6b'}
    resp = requests.post("https://trackapi.nutritionix.com/v2/natural/nutrients", headers=headers, data=json.dumps({"query":food}))
    
    data = resp.json()
    info = data["foods"][0]
    
    myDic = {}
    myDic["name"] = info["food_name"]
   
    newDic =  {"calories" : round(info["nf_calories"]/2000,2), "fat": round(info["nf_total_fat"]/67,2), "carbs": round(info["nf_total_carbohydrate"]/275,2), "protein": round(info["nf_protein"]/120,2)}
    myDic["nutrients"] = newDic
    print(newDic)
    total_info.append(myDic)
    print(total_info)

   
    return jsonify(myDic)

def analyze(path):
    # # Post image at path to the https://file.io/ API
    # # and return the response
    # with open('/Users/yannbonzom/Desktop/Programming/MAIS Hacks 2022/nutri_tracker/server/images/photo.jpg', 'rb') as f:
    #     response = requests.post('https://file.io', files={'file': f})
    #     print(response.json())
    #     link = response.json()['link']
    #     # print(link)

    # # Read Image 
    # img = Image.open(path)  
    # # Convert Image to Numpy as array 
    # img = np.array(img)  
    # # Put threshold to make it binary
    # binarr = np.where(img>128, 255, 0)
    # # Covert numpy array back to image 
    # binimg = Image.fromarray(binarr)

    img = cv2.imread(path, 2)
    ret, bw_img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
    bw = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)

    headers = {'Content-Type': 'application/json'}

    res = request.post(url="https://api.spoonacular.com/food/images/classify?apiKey=f6ec9909d7a141468b5313a72e728165", data=bw, headers=headers)
    print(res.json())
    # url = r"https://api.spoonacular.com/food/images/classify?apiKey=f6ec9909d7a141468b5313a72e728165&imageUrl={}".format(link)
    # response = requests.get(url,headers=headers)

    

# def analyze(p):
#     #output = model(p)
#     #for now 
#     output = "hamburger"
#     return output   



if __name__ == "__main__":
    app.run(debug=True)
    # analyze(r'/Users/yannbonzom/Desktop/Programming/MAIS Hacks 2022/nutri_tracker/server/images/photo.jpg')