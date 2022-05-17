from flask import render_template, request, redirect, url_for, session, flash
from ..models import User, db
from .controller import auth


@auth.route('/signup', methods=["POST", 'GET'])
def signup():
    if request.method == "POST":
        username = request.form['user']
        password = request.form['psw']
        re_psw = request.form['psw-repeat']
        if password != re_psw:
            flash('Password is not the same.', category='error')
        else:
            found_user = User.query.filter_by(username=username).first()
            if found_user:
                flash('Username has existed.', category='error')
            else:
                new_user = User(username=username, password=password)
                new_user.set_psw(password=password)
                db.session.add(new_user)
                db.session.commit()
                print("User created!")
                return redirect(url_for('auth.login'))
    return render_template('SignUp.html')


@auth.route('/login', methods=["POST", "GET"])
def login():
    if request.method == 'POST':
        username = request.form['user']
        password = request.form['psw']
        user = User.query.filter_by(username=username).first()
        if user is None or not user.check_psw(password):
            flash('Invalid username or password', category='error')
        else:
            if user.admin_role:
                session['admin'] = user.id
            session['user'] = user.id
            return redirect(url_for('home.homepage'))
    if 'user' in session:
        return redirect(url_for('home.homepage'))
    return render_template('Login.html')


@auth.route('/logout')
def logout():
    session.pop('user', None)
    session.pop('admin', None)
    return redirect(url_for('auth.login'))
