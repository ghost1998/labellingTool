import numpy as np
import cv2

from collections import Counter






imgor = cv2.imread("../../../Downloads/hole/canvas.png", 1);

img = imgor[:, :, 2]
# img[img==255] = 1


imgclose = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel=None)
imgbin = cv2.threshold(imgclose, 200, 255, cv2.THRESH_BINARY)[1]

ret, labels = cv2.connectedComponents(imgbin)

for i in range(1, ret+1):
	xpoints = (labels==i).nonzero()[0]
	ypoints = (labels==i).nonzero()[1]

	if(xpoints.shape[0] < 10):
		print("here")
		for j in xrange(xpoints.shape[0]):
			imgbin[xpoints[j]][ypoints[j]] = 0




# imgbin is the final binary image ie 0 or 255


cv2.imshow('Closed image', imgbin) 
  
cv2.waitKey(0) 




