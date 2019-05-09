function loadintocanvas()
{
  var canv3 = document.getElementById("Q3");
  var context3 = canv3.getContext("2d");
  var binaryImageData = context3.getImageData(0, 0, canv3.width, canv3.height);

  // Reseize image to canv width and can height

  var i;
  i = 0; 
  for(j=0; j<widthof(img); j++) 
  for(k=0; k<heightof(img); k++)
  {

    if(img[j][k] is grey)
    {
      binaryImageData.data[i] = 255;
      binaryImageData.data[i+1] = 0;
      binaryImageData.data[i+2] = 0;
      binaryImageData.data[i+3] = 255;


    }
    else 
    {
      binaryImageData.data[i] = 0;
      binaryImageData.data[i+1] = 0;
      binaryImageData.data[i+2] = 0;
      binaryImageData.data[i+3] = 0;
    }
    i+=4;
  }
  context3.putImageData(binaryImageData, 0, 0);
}
