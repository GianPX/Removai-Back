from flask import Flask, request, jsonify, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# GET endpoint to say hello
@app.route('/greet', methods=['GET'])
def get_data():
    return 'message'

# POST endpoint to remove background
@app.route('/removebg', methods=['POST'])
def upload_video():
    #Get title from http request's body
    req_json = request.data.decode('utf-8')
    data = json.loads(req_json)

    #Return path of new video
    return data['videoUrl']

if __name__ == '__main__':
    app.run(debug=True)
