import flask, time
from flask import session

app = flask.Flask(__name__)

app.secret_key = 'JScompet'

bdina = True

@app.route('/')
def index():
    if bdina:
        if 'game' not in session:
            session['banned'] = False
            session['game'] = 1
        print(session)
        # if session['banned']:
        #     return "u're banned."
        if session['game'] > 7:
            return "congrats, you've finished the game."
        return flask.redirect(f"/game/{session['game']}")
    else:
        return flask.render_template('index.html')
    
@app.route('/game/<game>')
def gamee(game):
    if session.get('game') >= int(game):
    # if True:
        return flask.render_template(f'game{game}.html')
    else:
        return flask.redirect(flask.url_for('index'))
    
@app.route('/bdina')
def nbdaw():
    global bdina
    bdina = True
    return flask.redirect(flask.url_for('index'))

@app.route('/increment/<tt>')
def increment(tt):
    print(abs(time.time() - int(tt)))
    if abs(time.time() - int(tt)) < 1:
        session['game'] += 1
        return flask.redirect(flask.url_for('index'))
    else:
        session['game'] += 1
        session['banned'] = True
        return flask.redirect(flask.url_for('index'))

@app.route('/validate', methods=['GET', 'POST'])
def validate():
    return "Yipeee"