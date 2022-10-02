import time
import json

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
    print(type(image))

    food = analyze("image")
    headers = {'Content-Type':'application/json', 'x-app-id':'060cfd73', 'x-app-key':'e185481be83614e23e0af33a9a839f6b'}

    resp = requests.post("https://trackapi.nutritionix.com/v2/natural/nutrients", headers=headers, data=json.dumps({"query":food}))
    
    #just gotta format resp.content to make more readable
  
    data = resp.json()
    info = data["foods"][0]
    
    myDic = {}
    myDic["name"] = info["food_name"]
   
    newDic =  {"calories" : info["nf_calories"], "fat": info["nf_total_fat"], "carbs": info["nf_total_carbohydrate"], "protein": info["nf_protein"]}
    myDic["nutrients"] = newDic
    print(newDic)
    total_info.append(myDic)
    print(total_info)

   
    return jsonify(myDic)
    

def analyze(p):
    #output = model(p)
    #for now 
    output = "hamburger"
    return output   


if __name__ == "__main__":
    app.run(debug=True)