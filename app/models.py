from datetime import datetime
from app import db , login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model , UserMixin) :
    sno = db.Column(db.Integer , primary_key = True)
    time = db.Column(db.DateTime , default = datetime.now)
    uname = db.Column(db.String(20) , unique = True , nullable = False)
    email = db.Column(db.String(50) , unique = True , nullable = False)
    password = db.Column(db.String(60) , nullable = False)
    treeid = db.Column(db.String(255) , nullable = False)

    def get_id(self):
        try:
            return (self.sno)
        except AttributeError:
            raise NotImplementedError('No `id` attribute - override `get_id`')

    def __repr__(self):
        return  'User(%s , %s)' % (self.uname , self.email)

class Tree(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    name = db.Column(db.String(60) , nullable = False)
    time = db.Column(db.DateTime , default = datetime.now)
    treeJson = db.Column(db.Text(), nullable = False)
    viewPassword = db.Column(db.String(60) , nullable = False)
    editPassword = db.Column(db.String(60) , nullable = False)

    def __repr__(self):
        return  'Tree(%s , %s)' % (self.id , self.treeJson)

