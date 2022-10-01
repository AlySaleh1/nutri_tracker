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

    foods = analyze("image")
    headers = {'Content-Type':'application/json', 'x-app-id':'060cfd73', 'x-app-key':'e185481be83614e23e0af33a9a839f6b'}

    resp = requests.post("https://trackapi.nutritionix.com/v2/natural/nutrients", headers=headers, data=json.dumps({"query":"burger"}))
    
    #just gotta format resp.content to make more readable
    return (resp.content)
    

def analyze(p):
    #output = model(p)
    #for now 
    output = "hamburger"
    return output   


if __name__ == "__main__":
    app.run(debug=True)