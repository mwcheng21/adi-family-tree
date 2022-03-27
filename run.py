from app import app
from flask import Flask

from flask import Flask
from flask_sqlalchemy import SQLAlchemy


# # to update sqllite db
# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app/site.db'
# db = SQLAlchemy(app)

#then run 
# from app import db
# db.create_all()

if __name__ == "__main__" :
    app.secret_key = "4b7fef6525314de19e0fd8e589aecb0e5028757476d2313c0c45a3db582a3cde"
    app.run(debug = True)

