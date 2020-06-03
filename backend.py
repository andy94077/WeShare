from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/weshare/eventCode', methods=['POST'])
def eventCode():
    text = request.form['eventCode']
    eventCodes = ['123', '456', 'fuck'] # from MySQL
    if text in eventCodes:
        return jsonify({'valid': 'true'})
    else:
        return jsonify({'valid': 'false'})

app.run('140.112.29.204', port=48764)
