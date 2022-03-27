from math import fabs
from platform import python_build
import re
from flask import render_template , flash , redirect , url_for , request, jsonify
from app import app
from app.forms import RegForm , LoginForm, LoginTreeForm
from app.models import User, Tree
from app import app, db, pwd
from flask_login import login_user , current_user , logout_user , login_required

@app.route('/')
def homepage():
    return render_template("information.html")

# login routes
@app.route("/signup" , methods = ['GET' , 'POST'])
def signuppage() :
    if current_user.is_authenticated :
        flash("You are already logged in." , "warning")
        return redirect(url_for("homepage"))
    form = RegForm(request.form)
    if request.method == "POST" and form.validate():
        hashed = pwd.generate_password_hash(form.password.data).decode('utf-8')
        element = User(uname = form.uname.data , email = form.email.data , password = hashed, treeid="[]")
        db.session.add(element)
        db.session.commit()
        flash("Account created for %s!" % (form.uname.data) , "success")
        return redirect(url_for("loginpage"))
    return render_template("signup.html" , form = form)

@app.route("/login" , methods = ['GET' , 'POST'])
def loginpage():
    if current_user.is_authenticated :
        flash("You are already logged in." , "warning")
        return redirect(url_for("homepage"))
    form = LoginForm(request.form)
    if request.method == "POST" and form.validate():
        member = User.query.filter_by(uname = form.uname.data).first()
        if member and pwd.check_password_hash(member.password , form.password.data) :
            login_user(member)
            flash("Welcome, %s!" % (form.uname.data) , "success")
            return redirect(url_for("homepage"))
        else :
            flash("Username or Password doesn't match, please try again." , "danger")
            return redirect(url_for("loginpage"))
    return render_template("login.html" , form = form)

@app.route("/logout")
def logoutpage():
    logout_user()
    flash("Successfuly logged out." , "success")
    return redirect(url_for("homepage"))

#tree routes
@app.route("/view/<id>", methods = ['GET' , 'POST'])
def viewTree(id):
    form = LoginTreeForm(request.form)
    tree = Tree.query.filter_by(id = id).first()
    if tree:
        print(tree.viewPassword)
        if tree.viewPassword == "" or (request.method=="POST" and pwd.check_password_hash(tree.viewPassword , form.password.data)) :
            return render_template("tree-view.html", id=id, jsonData=tree.treeJson)
        elif request.method == "POST":
            flash("Incorrect password, please try again." , "danger")
    else:
        flash("This tree does not exist, please check your link." , "danger")
    return render_template("tree-view-password.html", id=id, form = form)

@app.route("/create")
def createTree():
    return render_template("tree-create.html", jsonData="{}")

@app.route("/edit/<id>", methods = ['GET' , 'POST'])
def editTree(id):
    form = LoginTreeForm(request.form)
    tree = Tree.query.filter_by(id = id).first()

    #if post, check for password
    if request.method == "GET": 
        #if user can access this tree
        if current_user.is_authenticated :
            member = User.query.filter_by(uname = current_user.uname).first()
            if (member.treeid.strip('][') == ""):
                trees = []
            else:
                trees = [int(x) for x in member.treeid.strip('][').split(', ')]
            if (id in trees):
                return render_template("tree-edit.html", id=id, jsonData=tree.treeJson)
        return render_template("tree-view-password.html", id=id, form = form)

    if tree:
        if pwd.check_password_hash(tree.editPassword , form.password.data) :
           return render_template("tree-edit.html", id=id, jsonData=tree.treeJson)
        flash("Incorrect password, please try again." , "danger")
    else:
        flash("Tree does not exist, please check link." , "danger")
       

    return render_template("tree-view-password.html", id=id, form = form)



@app.route("/save_new_tree", methods = ['POST'])
def saveNewTree():
    #make new tree
    name = request.form["name"] if request.form["name"] != "" else "Default Tree"
    editPwd = pwd.generate_password_hash(request.form["editPassword"]).decode('utf-8')
    viewPwd = pwd.generate_password_hash(request.form["viewPassword"]).decode('utf-8') if request.form["viewPassword"] != "" else ""
    element = Tree(treeJson=str(request.form["treeData"]), editPassword=editPwd, viewPassword=viewPwd, name=name)
    db.session.add(element)
    db.session.commit()
    id=element.id

    #add to user if there is one
    if current_user.is_authenticated: 
        member = User.query.filter_by(uname = current_user.uname).first()
        if (member.treeid.strip('][') == ""):
            trees = []
        else:
            trees = [int(x) for x in member.treeid.strip('][').split(', ')]
        trees.append(id)
        db.session.query(User).filter(User.uname == current_user.uname).update({'treeid': str(trees)})
        db.session.commit()

    return jsonify({"id": id})

@app.route("/update_tree", methods = ['POST'])
def updateTree():
    id = request.form["id"]
    editPwd = pwd.generate_password_hash(request.form["editPassword"]).decode('utf-8') if request.form["editPassword"] != "" else ""
    viewPwd = pwd.generate_password_hash(request.form["viewPassword"]).decode('utf-8') if request.form["viewPassword"] != "" else ""
    updatedJson = {
        'treeJson': str(request.form["treeData"])
    }
    if editPwd != "":
        updatedJson["editPassword"] = editPwd
    if viewPwd != "":
        updatedJson["viewPassword"] = viewPwd
    db.session.query(Tree).filter(Tree.id == id).update(updatedJson)
    db.session.commit()
    return jsonify({"id": id})


@app.route("/trees", methods = ['GET'])
@login_required
def mytrees():
    member = User.query.filter_by(uname = current_user.uname).first()
    if (member.treeid.strip('][') == ""):
        trees = []
    else:
        trees = [int(x) for x in member.treeid.strip('][').split(', ')]
    res = []
    print(trees)
    for treeid in trees:
        print(treeid)
        tree = Tree.query.filter_by(id = treeid).first()
        if tree:
            res.append({
                "id": str(treeid),
                "time": tree.time,
                "name": tree.name,
                "public": tree.viewPassword == ""
            })
    return render_template("trees.html", info=res, letter=current_user.uname[0].lower())

