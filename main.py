from flask import Flask, render_template, request, redirect, flash, session
import json
import os

#configurando o projeto, pasta e flask
json_path = os.path.join(os.path.dirname(__file__), 'bingo_users.json')
app = Flask(__name__)
app.config['SECRET_KEY'] = 'RX4NRX4N'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = "filesystem"
logado = False

#Principal, abrir site, mandar para o cadastro!
@app.route('/')
def home():
    return render_template('bingo_cadastro.html')

#paginas de cadastro ou login
#cadastro
@app.route('/bingo_cadastro', methods=["POST"])
def cadastro():
    nome_user = request.form.get('nome_user')
    senha_user = request.form.get('senha_user')

    with open(json_path) as bingo_users:
        users = json.load(bingo_users)

    for usuario in users:
        if (
            usuario['nome_user'] == nome_user and
            usuario['senha_user'] == senha_user
        ):
            flash('Usuário já existe!')
            return redirect("/")

    novo_user = {
        "nome_user": nome_user,
        "senha_user": senha_user
    }

    users.append(novo_user)

    with open(json_path, 'w') as gravarTemp:
        json.dump(users, gravarTemp, indent=4)

    return render_template('bingo_login.html')

#login
@app.route('/bingo_login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        nome_user = request.form.get('nome_user')
        senha_user = request.form.get('senha_user')

        with open(json_path) as bingo_users:
            users = json.load(bingo_users)

        for usuario in users:
            if usuario['nome_user'] == nome_user and usuario['senha_user'] == senha_user:
                session['logado'] = True
                session['usuario'] = nome_user
                session.modified = True  # Força a gravação da sessão
                return redirect('/bingo_game')

        flash("Usuário inexistente ou senha incorreta!")
        return redirect('/bingo_login')

    return render_template('bingo_login.html')


# Rota para o Bingo, jogo do bingo!
@app.route('/bingo_game')
def bingo_game():
    if 'logado' in session and session['logado']:
        return render_template('bingo_game.html', usuario=session.get('usuario'))
    
    flash("Você precisa fazer login primeiro!")
    return redirect('/bingo_login')

#Fazendo o logout!
@app.route('/logout')
def logout():
    session.clear()  # Limpa a sessão do usuário
    flash("Você saiu da conta!")
    return redirect('/')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
