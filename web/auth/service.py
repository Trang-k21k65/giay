from flask import render_template, request, redirect, url_for, session, flash
from web.extensions.models import User, db
from werkzeug.security import generate_password_hash, check_password_hash


def signup_service():
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
    return render_template('auth/SignUp.html')


def login_service():
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
    return render_template('auth/Login.html')


def logout_service():
    session.pop('user', None)
    session.pop('admin', None)
    return redirect(url_for('auth.login'))


def user_service():
    if 'user' in session:
        user_id = session.get('user')
        user_detail = User.query.filter_by(id=user_id).first()
        current_psw = ""
        new_psw = ""
        re_password = ""
        flag = False
        user_fullname = request.form.get('fullname', None)
        user_phone = request.form.get('phone', None)
        user_address = request.form.get('address', None)
        if request.method == "POST":
            if user_fullname:
                if user_fullname.isspace():
                    flash("You're not entering your fullname! Try again")
                else:
                    user_detail.fullname = user_fullname
                    session['fullname'] = user_detail.fullname
                    flash("Changed information success!")
            elif user_phone:
                if user_phone.isspace():
                    flash("You're not entering your phone! Try again")
                else:
                    user_detail.phone = user_phone
                    session['phone'] = user_detail.phone
                    flash("Changed information success!")
            elif user_address:
                if user_address.isspace():
                    flash("You're not entering your address! Try again")
                else:
                    user_detail.address = user_address
                    session['address'] = user_detail.address
                    flash("Changed information success!")
            else:
                current_psw = request.form.get('currentpassword')
                new_psw = request.form.get('newpassword')
                re_password = request.form.get('confirmnewpassword')
                if current_psw:
                    if re_password != new_psw:
                        flash('New password not match', category='error')
                    elif re_password == new_psw:
                        flag = True
                else:
                    flag = False
            db.session.commit()
        if flag == True:
            if check_password_hash(user_detail.password, current_psw) == False:
                flash('Wrong current password', category='error')
            else:
                user_detail.password = generate_password_hash(new_psw)
                flash('Change password success', 'success')
            flag = False
            db.session.commit()
        return render_template('auth/User.html', user_detail=user_detail)
