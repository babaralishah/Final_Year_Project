#Import Libraries :

import pandas as pd
from flask import jsonify
import warnings
from string import Template
warnings.filterwarnings("ignore", category=FutureWarning)

from sklearn.metrics import accuracy_score

from sklearn.linear_model import LinearRegression

from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import chi2

#import various ML algorithms to be used from the library
from sklearn.preprocessing import MinMaxScaler
#Naive Bayes Classifier
from sklearn import naive_bayes

#SVM
from sklearn.svm import SVC,NuSVC

#LabelEncoder
from sklearn.preprocessing import LabelEncoder

#KNN
from sklearn.neighbors import KNeighborsClassifier

#Splitting
from sklearn.model_selection import train_test_split

#NB
from sklearn.naive_bayes import GaussianNB,MultinomialNB

#Logistic Regression
from sklearn.linear_model import SGDClassifier, LogisticRegression

#DTClassifier
from sklearn.tree import DecisionTreeClassifier, ExtraTreeClassifier

#RFC
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier, GradientBoostingClassifier
import csv
from flask import make_response, url_for,Blueprint
from werkzeug.utils import secure_filename
import pandas as pad
from flask_cors import CORS, cross_origin
import numpy as np
from sklearn.model_selection import train_test_split
from flask import Flask, render_template, request, redirect
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
from sklearn import metrics
import csv
from flask import make_response, url_for
from flask import Flask, jsonify,render_template
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
# from flask_restful import Resource, Api;
from flask import Flask, render_template, request, redirect
import matplotlib.pyplot as plt
from Test import test
app = Flask(__name__)

abc = ''

#cors = CORS(app, resources={r"/api/http://localhost:4200": {"origins": "http://localhost:4200"}})# api = Api(app)
CORS(app, supports_credentials=True)
app.register_blueprint(test,url_prefix="/")
@app.route('/')
def index():
  return 'abcdef'
@app.route('/output/', methods = ['POST','GET'])
@cross_origin(allow_headers=['http://localhost:4200'])
def upload_file():

      if request.method == 'POST':
        file = request.files['file']
        file.save(secure_filename(file.filename))
        print('File received at rest service: ' + file.filename)
        #Data Preprocessing:

        #Reading Data file (csv) from web cache
        data_frame = pad.read_csv(file.filename)

        #Removing all columns with only one value, or have more than 50% missing values to work faster
        # data_frame=data_frame.dropna(axis=1)

        #Replace nan values with average of columns
        #data_frame.fillna(data_frame.mean())

        from sklearn.preprocessing import OneHotEncoder, LabelEncoder
        ohe = OneHotEncoder()
        le = LabelEncoder()

        #Converting columns from object dtype to int if there is any in the dataframe
        for x in data_frame.columns:
            if data_frame[x].dtype == 'object':
                data_frame[x] = le.fit_transform(data_frame[x])

        #Replace negative numbers in Pandas Data Frame by zero
        data_frame[data_frame < 0] = 0

        #Convert Floats to ints
        for x in data_frame.columns:
          data_frame[x]= data_frame[x].astype(int)

        #All rows and columns (Attributes/Features) except last column
        X = data_frame.iloc[:,:-1]

        #Only Last row and column (Label)
        y = data_frame.iloc[:,[-1]]

        # Train-test split
        a = len(data_frame.index)
        # Train-test split
        if a >= 1 and a <= 1000 :
            X_train, X_test, y_train, y_test = train_test_split(X, y,test_size=0.30,train_size=0.70, random_state=0)
            print('1')
        elif a >= 1000 and a <= 10000 :
            X_train, X_test, y_train, y_test = train_test_split(X, y,test_size=0.07,train_size=0.03, random_state=0)
            print('2')
        elif a >= 10000 and a <= 100000 :
            X_train, X_test, y_train, y_test = train_test_split(X, y,test_size=0.007,train_size=0.003, random_state=0)
            print('3')
        else:
            X_train, X_test, y_train, y_test = train_test_split(X, y,test_size=0.0007,train_size=0.0003, random_state=0)


        print(X_train.shape)
        # k = X_train.columns()/2

        #Standard scaling of the dataset
        from sklearn.preprocessing import StandardScaler

        sc = StandardScaler()
        X_train = sc.fit_transform(X_train)
        X_test = sc.transform(X_test)

        #Principle Component Analysis  (Feature Selection)
        from sklearn.decomposition import PCA

        pca = PCA(n_components = 2)
        X_train = pca.fit_transform(X_train)
        X_test = pca.transform(X_test)

        #Applying Univariate Selection  (Feature Selection)
        #(Most appropriate Columns among all columns)
        # num_feats = 5
        #X_train = SelectKBest(chi2,k=num_feats).fit_transform(X_train, y_train)
        #X_test = SelectKBest(chi2, k=10).fit_transform(X_test, y_test)
        print(X_train.shape)

        #ML Models Building:

        #Predict Linear Regression
        #y_pred = linear.predict(X_test)

        # Models Declaration and Definition

        #Linear Regression
        linear = LinearRegression()

        #LogisticRegression
        LR_clf = LogisticRegression()

        #DecisionTreeClassifier
        DT_clf = DecisionTreeClassifier()

        #KNeighborsClassifier
        knn_clf = KNeighborsClassifier(n_neighbors=1)

        #Support Vector Machine
        svc_clf = SVC()

        #naive_bayes
        nbclf = naive_bayes.GaussianNB()

        #RandomForestClassifier
        RF_clf = RandomForestClassifier(random_state=0)

        #Feed the Model:

        # Training of Models on Train set

        # fit the model with data
        linear.fit(X_train, y_train)

        # Calculating the processing time
        import time

        start = time.time()

        # fit the model with data
        LR_clf.fit(X_train, y_train) # .values.ravel())

        # Stops the watch
        end = time.time()
        # Calculates the consumed time
        print("\nExecution time of Linear regression training: ",end - start)

        # Start calculating the time
        start = time.time()

        # Stops the watch
        end = time.time()

        # Calculates the consumed time
        print("\nExecution time of Logistic regression training: ",end - start)

        start = time.time()

        # fit the model with data
        DT_clf.fit(X_train, y_train)
        end = time.time()
        print("\nExecution time of Decision Tree training: ",end - start)

        start = time.time()

        # fit the model with data
        knn_clf.fit(X_train, y_train.values.ravel())

        # Stops the watch
        end = time.time()

        # Calculates the consumed time
        print("\nExecution time of Knn training: ",end - start)

        start = time.time()

        # fit the model with data
        svc_clf.fit(X_train, y_train.values.ravel())
        end = time.time()
        print("\nExecution time of SVC training: ",end - start)

        start = time.time()

        # fit the model with data
        nbclf.fit(X_train, y_train.values.ravel())

        # Stops the watch
        end = time.time()

        # Calculates the consumed time
        print("\nExecution time of Naive Bayes training: ",end - start)

        start = time.time()

        # fit the model with data
        RF_clf.fit(X_train, y_train.values.ravel())

        # Stops the watch
        end = time.time()

        # Calculates the consumed time
        print("\nExecution time of Random Forest training: ",end - start)

        print("\n\nModel \t\t\t\t\t Test Score\t\t\t\t\tTrain Score")

        # Start calculating the time
        start = time.time()

        #Model Validation:

        #Predict Linear Regression
        y_pred = linear.predict(X_test)

        #Accuracy of Logistic Regression
        print("\nLinear Regression Accuracy Score:\t",linear.score(X_test, y_test)*100,"\t\t\t\t",linear.score(X_train, y_train)*100)
        linear = linear.score(X_test, y_test)*100
        # Stops the watch
        end = time.time()

        # Calculates the consumed time
        #print("\nExecution time of Linear regression Predicting: ",end - start)

        # Start calculating the time
        start = time.time()

        #Accuracy of Logistic Regression
        print("\nLogistic Regression Accuracy Score:\t",LR_clf.score(X_test, y_test)*100,"\t\t\t\t",LR_clf.score(X_train, y_train)*100)
        lr = LR_clf.score(X_test, y_test)*100
        # Stops the watch
        end = time.time()

        # Calculates the consumed time
        #print("\nExecution time of Logistic regression Predicting: ",end - start)

        # Start calculating the time
        start = time.time()

        #Accuracy of Decision Tree
        print("\nDecision Tree Accuracy Score:\t\t",DT_clf.score(X_test, y_test)*100,"\t\t\t\t",DT_clf.score(X_train, y_train)*100)
        dt = DT_clf.score(X_test, y_test)*100
        # Stops the watch
        end = time.time()
        # Calculates the consumed time
        #print("\nExecution time of Decision Tree Predicting: ",end - start)

        # Start calculating the time
        start = time.time()

        #Accuracy of K nearest Neighbours (KNN)
        print("\nK nearest Neighbours Accuracy Score:\t",knn_clf.score(X_test, y_test)*100,"\t\t\t\t",knn_clf.score(X_train, y_train)*100)
        end = time.time()
        knn = knn_clf.score(X_test, y_test)*100
        # Calculates the consumed time
        #print("\nExecution time of Knn Predicting: ",end - start)

        # Start calculating the time
        start = time.time()

        #Accuracy of Rabdom Forest
        print("\nRandom Forest Accuracy Score:\t\t",RF_clf.score(X_test, y_test)*100,"\t\t\t\t",RF_clf.score(X_train, y_train)*100)
        rf = RF_clf.score(X_test, y_test)*100
        # Stops the watch
        end = time.time()

        # Calculates the consumed time
        #print("\nExecution time of Random Forest Predicting: ",end - start)

        # Start calculating the time
        start = time.time()

        #Accuracy of Naive Bayes Gaussian
        print("\nNaive Bayes Gaussian Accuracy Score:\t",nbclf.score(X_test, y_test)*100,"\t\t\t\t",nbclf.score(X_test,y_test)*100)
        nbclf = nbclf.score(X_test, y_test)*100
        # Stops the watch
        end = time.time()
        #global svc
        #Accuracy of Naive Bayes Gaussian
        # print("\nSupport Vector Machine Accuracy Score:\t",svc_clf.score(X_test, y_test)*100,"\t\t\t\t",nbclf.score(X_test,y_test)*100)
        
        # svc = svc_clf.score(X_test, y_test)*100
        #abc = 'hello'

        results =  {
        "data":[
          {
          "Algorithm":"Linear Regression",
          "Efficiency":linear
        },  {
          "Algorithm":"Logistic Regression",
          "Efficiency":lr
        },{
          "Algorithm":"Decision Tree",
          "Efficiency":dt
        },  {
          "Algorithm":"K nearest neighbor",
          "Efficiency":knn
        },  {
          "Algorithm":"Naive Bayes",
          "Efficiency":nbclf
        },{
          "Algorithm":"Support Vector",
          "Efficiency":'  '
        }

             ]
      }
        print(results)
        # return 'end of function'
        return jsonify([results])
        #return ('returning string in output flask')
        
        #Predict Support Vector Machine
    #   #y_pred_svc = svc_clf.predict(X_test)

        #index()


      # if request.method == 'POST':
      #   file = request.files['file']
      #   file.save(secure_filename(file.filename))
      #   print('File received at upload: ' + file.filename)

# s = svc_clf.score(X_test, y_test)*100

@app.route("/weatherReport/", methods = ['GET','POST'])
def WeatherReport():

        abc = 'weather report'
        s = 'testing the weather function'
        weather =  {
        "data":[{
            "day":s,
            "temperature":"19",
            "windspeed":"21",
            "event":"Rainy"
        },  {
            "day":"7/6/2019",
            "temperature":"28",
            "windspeed":"14",
            "event":"Sunny"
        }
        ]
    }
        return jsonify([weather])


@app.route('/output1/', methods = ['POST','GET'])
@cross_origin(allow_headers=['http://localhost:4200'])
def upload_file1():
        #abc =''
        d = index()
        t = Template('$when, $who $action $what.')
        #s= t.substitute(when=abc, who='Rajesh', action='drinks', what ='Coffee')

        abc = 'hey there'
        results =  {
        "data":[{
          "name":abc,
          "output":"19"
        },  {
          "name":"Decision tree",
          "output":"28"
      }
      ]
  }

        return jsonify([results])

if __name__ == '__main__':
    app.run(debug = True)
