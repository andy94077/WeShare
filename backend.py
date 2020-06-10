import os
from flask import Flask, request, jsonify, session
from flask_cors import CORS

from sql import SQLHelper

UPLOAD_FOLDER = './uploads'

app = Flask(__name__)
CORS(app)

sqlhelper = SQLHelper()

# Only for demo, probabily useless
@app.route('/weshare/eventCode', methods=['POST'])
def eventCode():
    code = request.form['eventCode']
    result = sqlhelper.CheckIfEventCodeExists(code)
    return jsonify({'valid': str(result)})

@app.route('/weshare/create', methods=['POST'])
def create():
    title = request.form['eventTitle']
    code, token = sqlhelper.CreateEvent(title)
    os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], code))
    os.mkdir(os.path.join(app.config['UPLOAD_FOLDER'], code, 'files'))
    os.mkdir(os.path.join(app.config['UPLOAD_FOLDER'], code, 'images'))

    session['event_code'] = code
    session['event_token'] = token

    return jsonify({
        'event_code' : code,
        'event_token' : token
    })

# Login as administrator
@app.route('/weshare/admin', methods=['POST'])
def admin():
    token = request.form['eventToken']
    result = sqlhelper.LoginEventWithToken(token)
    if result is None:
        return jsonify({
            'valid' : 'False'
        })
    else:
        code, title = result
        session['event_code'] = code
        session['event_token'] = token
        return jsonify({
            'valid' : 'True',
            'event_code' : code,
            'event_title' : title
        })

# Join as audience
@app.route('/weshare/join', methods=['POST'])
def join():
    code = request.form['eventCode']
    if sqlhelper.CheckIfEventCodeExists(code):
        session['event_code'] = code
        title = sqlhelper.GetEventTitle(code)
        return jsonify({
            'valid': 'True',
            'event_title': title
        })
    else:
        return jsonify({
            'valid': 'False'
        })

@app.route('/weshare/insert', methods=['POST'])
def insert():
    if 'event_token' not in session:
        return jsonify({
            'valid' : 'False'
        })

    code = session['event_code']
    postType = request.form['postType']
    if postType in ['text', 'link', 'image', 'file']:
        if postType in ['text', 'link']:
            content = request.form['postContent']
        elif postType == 'file':
            file = request.files['postFile']
            filename = file.filename.strip().split('/')[-1]
            content = os.path.join(app.config['UPLOAD_FOLDER'], code, 'files', filename)
            file.save(content)
        else:
            image = request.files['postImage']
            imagename = file.filename.strip().split('/')[-1]
            content = os.path.join(app.config['UPLOAD_FOLDER'], code, 'images', imagename)
            image.save(content)

        sqlhelper.InsertPost(code, postType, content)
        return jsonify({
            'valid' : 'True'
        })
    else:
        return jsonify({
            'valid' : 'False'
        })

@app.route('/weshare/show', methods=['POST'])
def show():
    code = session['event_code']
    posts = sqlhelper.GetPosts(code)
    return jsonify({
        'posts' : posts
    })

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 64 * 1024 * 1024
app.secret_key = 'cnlab2020'
app.run('140.112.29.204', port=12345)
