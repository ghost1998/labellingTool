from flask import Flask
app = Flask(__name__)
import cv2

from collections import Counter

import numpy as np
from PIL import Image
import base64
import re
import time
from flask import request
from flask import render_template
from io import BytesIO
from io import StringIO

def roundness(objecperimeter, objectarea):
    roundness_threshold = 0.3;
    roundnessmean = 1;
    pi = 3.14;
    roundness = ((objecperimeter * objecperimeter) / (4*pi*objectarea));
    if(np.abs(roundness - roundnessmean) > roundness_threshold):
        return 0;
    return 1;


@app.route('/tool')
def tool():
    return app.send_static_file('labelTool.html')

@app.route('/', methods=['GET', 'POST'])
def get_image():
    if request.method == "POST":
        image_b64 = request.values['image']
        encoded_data = image_b64.split(',')[1]
        nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
        imgor = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        #cimg = cv2.cvtColor(img,cv2.COLOR_GRAY2BGR)
        tmp_name = time.time()
        # gray = cv2.cvtColor(imgor, cv2.COLOR_BGR2GRAY)
       # cv2.imshow('img',image_b64)

        # gray = cv2.medianBlur(gray, 5)
    
    
        # rows = gray.shape[0]
        # circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, 1, rows / 8,
        #                            param1=100, param2=30,
        #                            minRadius=1, maxRadius=30)
    
    
        # if circles is not None:
        #     circles = np.uint16(np.around(circles))
        #     for i in circles[0, :]:
        #         center = (i[0], i[1])
        #         # circle center
        #         cv2.circle(img, center, 1, (0, 100, 100), 3)
        #         # circle outline
        #         radius = i[2]
        #         cv2.circle(img, center, radius, (255, 0, 255), 3)
        print (imgor)
        img = imgor[:, :, 2]
        img[img>125] = 255

        imgclose = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel=None)
        imgbin = cv2.threshold(imgclose, 200, 255, cv2.THRESH_BINARY)[1]

        ret, labels = cv2.connectedComponents(imgbin)

        # cv2.imshow('Closed image', imgbin) 
        # cv2.waitKey(0) 


        for i in range(1, ret+1):
            xpoints = (labels==i).nonzero()[0]
            ypoints = (labels==i).nonzero()[1]

            if(xpoints.shape[0] < 10):
                for j in range(xpoints.shape[0]):
                    imgbin[xpoints[j]][ypoints[j]] = 0


        ret, labels = cv2.connectedComponents(imgbin)
        cc_num = ret;


        for i in range(1, cc_num+1):
            #print (i)
            imgcopy = np.copy(imgbin)
            imgcopy[labels!=i] = 0
            imgcopy[labels==i] = 255
            circle_check=0
            if(circle_check):
                ret,binary = cv2.threshold(imgcopy, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)
                cnts = cv2.findContours(binary, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        
                if(len(cnts[0]) <= 1) :
                    continue
                peri = cv2.arcLength(cnts[0][1], True)
                area = cv2.contourArea(cnts[0][1])
       
                if(roundness(peri, area) == 0):
                    imgbin[labels==i] = 0;
            

        cv2.imwrite('/home/mouryareddy/newproj/labellingTool/static/uploads/{}.jpg'.format(tmp_name), imgbin)
        #image_b64 = request.values['imageBase64']
        ##image_data = re.sub('^data:image/.+;base64,', '', image_b64)
        ##img = np.frombuffer(base64.b64decode(image_data), np.uint8)
        #pic = Image.open(BytesIO(base64.b64decode(image_b64)))
        #image_np = np.asarray(pic)
        #print(image_np)
        #cv2.imwrite('/tmp/tttt.jpg', image_np)
        #print ('Image received: {}')
        return str(tmp_name)
    else:
        return render_template('labelTool.html')
        #return "Lavda RK"

if __name__ == '__main__':
	app.run()

