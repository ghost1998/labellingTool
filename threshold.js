function thresholdImage(slidername, Value)
{
  var canv2 = document.getElementById("Q1");
  var context2 = canv2.getContext("2d");
  var imageData2 = context2.getImageData(0, 0, canv2.width, canv2.height);
  Value = 254;
  // alert("in thresh");

  if(slidername == "S1")
  {
    var i;
    // alert("in S1");
    for (i = 0; i < imageData2.data.length; i += 4) 
    {
      if(imageData2.data[i] < Value ) imageData2.data[i] = 0;  
    }
    alert("Done S1");
  }

  else if(slidername == "S2")
  {
    var i;
    // alert("in S1");
    for (i = 0; i < imageData2.data.length; i += 4) 
    {
      if(imageData2.data[i] > Value ) imageData2.data[i] = 0;  
    }
    alert("Done S2");

  }

  else if(slidername == "S3")
  {
    var i;
    // alert("in S1");
    for (i = 0; i < imageData2.data.length; i += 4) 
    {
      if(imageData2.data[i+1] < Value ) imageData2.data[i+1] = 0;  
    }
  }

  else if(slidername == "S4")
  {
    var i;
    // alert("in S1");
    for (i = 0; i < imageData2.data.length; i += 4) 
    {
      if(imageData2.data[i+1] > Value ) imageData2.data[i+1] = 0;  
    }
  }

  if(slidername == "S5")
  {
    var i;
    // alert("in S1");
    for (i = 0; i < imageData2.data.length; i += 4) 
    {
      if(imageData2.data[i+2] < Value ) imageData2.data[i+2] = 0;  
    }
  }

  else if(slidername == "S6")
  {
    var i;
    // alert("in S1");
    for (i = 0; i < imageData2.data.length; i += 4) 
    {
      if(imageData2.data[i+2] > Value ) imageData2.data[i+2] = 0;  
    }
  }

  var canv1 = document.getElementById("Q1");
  var context1 = canv1.getContext("2d");

  context1.putImageData(imageData2, 0, 0);
}





function threshold()
{
  var canv2 = document.getElementById("Q2");
  var context2 = canv2.getContext("2d");
  var imageData2 = context2.getImageData(0, 0, canv2.width, canv2.height);

  var red_lo = document.getElementById("S1").value;
  var red_hi = document.getElementById("S2").value;
  var blue_lo = document.getElementById("S3").value;
  var blue_hi = document.getElementById("S4").value;
  var green_lo = document.getElementById("S5").value;
  var green_hi = document.getElementById("S6").value;


  var i;
  for (i = 0; i < imageData2.data.length; i += 4) 
  {
    // if(imageData2.data[i] < red_lo ) imageData2.data[i] = 0;
    // if(imageData2.data[i] > red_hi ) imageData2.data[i] = 0;
    // if(imageData2.data[i+1] < blue_lo ) imageData2.data[i+1] = 0;
    // if(imageData2.data[i+1] > blue_hi ) imageData2.data[i+1] = 0;
    // if(imageData2.data[i+2] < green_lo ) imageData2.data[i+2] = 0;
    // if(imageData2.data[i+2] > green_hi ) imageData2.data[i+2] = 0;

    if( (imageData2.data[i] < red_lo) || (imageData2.data[i] > red_hi) || (imageData2.data[i+1] < blue_lo) || (imageData2.data[i+1] > blue_hi ) 
      || (imageData2.data[i+2] < green_lo ) || (imageData2.data[i+2] > green_hi) )
    {
      imageData2.data[i] = 0;
      imageData2.data[i+1] = 0;
      imageData2.data[i+2] = 0;

    }
  }

  var canv1 = document.getElementById("Q1");
  var context1 = canv1.getContext("2d");

  context1.putImageData(imageData2, 0, 0);
  alert("Done Threshold function");
}






window.onload = function() 
{
   var S1 = document.getElementById("S1");
   var V1 = document.getElementById('V1');
   S1.oninput = function()
   {
    V1.innerHTML = this.value;
    threshold();
    // thresholdImage("S1", this.value);
   }

   var S2 = document.getElementById("S2");
   var V2 = document.getElementById('V2');
   S2.oninput = function()
   {
    V2.innerHTML = this.value;
    threshold();
    // thresholdImage("S2", this.value);

   }


   var S3 = document.getElementById("S3");
   var V3 = document.getElementById('V3');
   S3.oninput = function()
   {
    V3.innerHTML = this.value;
   }

   var S4 = document.getElementById("S4");
   var V4 = document.getElementById('V4');
   S4.oninput = function()
   {
    V4.innerHTML = this.value;
   }

   var S5 = document.getElementById("S5");
   var V5 = document.getElementById('V5');
   S5.oninput = function()
   {
    V5.innerHTML = this.value;
   }

   var S6 = document.getElementById("S6");
   var V6 = document.getElementById('V6');
   S6.oninput = function()
   {
    V6.innerHTML = this.value;
   }


};