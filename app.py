import flask, time, math

app = flask.Flask(__name__)

bdina = False

@app.route('/')
def index():
    if bdina:
        if 'game' not in flask.session:
            flask.session['game'] = 1
            flask.sessionp['id'] = time.time()
            flask.session['banned'] = False
        if flask.session['banned']:
            return "u're banned."
        return flask.redirect(f"/game/{flask.session['game']}")
    else:
        return flask.render_template('index.html')
    
@app.route('/game/<game>')
def gamee(game):
    if flask.session.get('game') <= int(game):
        return flask.render_template(f'game{game}.html')
    else:
        return flask.redirect(flask.url_for('index'))
    
@app.route('/bdina')
def nbdaw():
    global bdina
    bdina = True
    return flask.redirect(flask.url_for('index'))

@app.route('/increment/<tt>', methods=['POST'])
def increment(tt):
    if math.abs(time.time() - tt) < 0.5:
        flask.session['game'] += 1
        return flask.redirect(flask.url_for('index'))
    else:
        flask.session['banned'] = True
        return flask.redirect(flask.url_for('index'))
