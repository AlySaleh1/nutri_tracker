import time
import json
from imgur_python import Imgur

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
    print("submitted!")
    image = request.files["photo"]

    #food = analyze(image)
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

    Client_ID = 'ad290fa7f09b110'
    Client_secret = '374eb11f807c2992c62e20435e04331613620fa5'


    imgur_client = Imgur({'client_id': Client_ID, 'access_token' : None})

    image = imgur_client.image_upload(path,'Untitled', 'food')
    #print(image['response']['data']['link'])

    headers = {'Content-Type': 'application/json'}

    url = "https://api.spoonacular.com/food/images/classify?apiKey=f6ec9909d7a141468b5313a72e728165&imageUrl=%7B%7D%22.format(image[%27response%27][%27data%27][%27link%27])"
    response = requests.get(url,headers=headers)

    return response.json()['category']
    

# def analyze(p):
#     #output = model(p)
#     #for now 
#     output = "hamburger"
#     return output   



if __name__ == "__main__":
    app.run(debug=True)