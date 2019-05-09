	function newArray(w, h, val) 
	{
		// console.log(w);
		// console.log(h);
		// console.log(val);
		var arr = [];
		for(i = 0; i < h; i++) 
		{
			arr[i] = [];
			for(j = 0; j < w; j++) {
				arr[i][j] = val;
			}
		}
		return arr;
	}

	function getArray()
	{
		var canv3 = document.getElementById("Q3");
		var context3 = canv3.getContext("2d");
		var binaryImageData = context3.getImageData(0, 0, canv3.width, canv3.height);

		arr = newArray(canv3.width , canv3.height , 0);

		var canv2 = document.getElementById("Q2");
		var context2 = canv2.getContext("2d");
		var originalImagedata = context2.getImageData(0, 0, canv2.width, canv2.height);

	  // var arrayImagedata = ctx.createImageData(canv2.width, canv2.height);
	  var arrayImagedata = context3.getImageData(0, 0, canv2.width, canv2.height);

	  PImage img = createImage(66, 66, RGB);
	  // PImage img = createImage(canv2.width, canv2.height, ALPHA);

	  alert("in Get Array");


// 	  var arr = [];
// 	  for(i = 0; i < canv2.height; i++) 
// 	  {
// 	  	arr[i] = [];
// 	  	for(j = 0; j < canv2.width; j++) 
// 	  	{
// 	  		var s = 4 * i * canv3.width + 4 * j;
// 	  		if(binaryImageData.data[s] > 0 )
// 	  		{
// 	  			arr[i][j] = 1;	
// 	  		}
// 	  		else
// 	  		{
// 	  			arr[i][j] = 0;
// 	  			// console.log(s);
// 	  		}
// 	  	}
// 	  }

// 	  var bitsarray = [];
// 	  for(i = 0; i < canv2.height; i++) 
// 	  {
// 	  	for(j = 0; j < canv2.width; j++)
// 	  	{
// 	  		bitsarray[i*canv2.width + j] = arr[i][j];
// 	  	}
// 	  }
// 	  console.log(bitsarray.length);


// 	  // for(i = 0; i < arrayImagedata.data.length; i+=4)
// 	  // {

// 	  // }


// 	  var morph = new Morph(canv2.height, canv2.width, bitsarray);
// 	  // morph.erodeWithElement();
// 	  morph.closingWithElement();
// 	  console.log(morph.data.length);
// 	  // morph.dilateWithElement();

// 	  for (var i = 0; i<morph.data.length; i++)
// 	  {
// 	  	var s = 4*i;
// 	  	if(morph.data[i] == 1)
// 	  	{
// 	  			arrayImagedata.data[s] = 0;
// 	        	arrayImagedata.data[s + 1] = 255;
// 	        	arrayImagedata.data[s + 2] = 0;
// 	        	arrayImagedata.data[s + 3] = 255;  // fully opaque	
// 	  	}
// 	  	else
// 	  	{
// 	    	arrayImagedata.data[s] = 0;
// 	    	arrayImagedata.data[s + 1] = 0;
// 	    	arrayImagedata.data[s + 2] = 0;
// 	        arrayImagedata.data[s + 3] = 0;  // fully opaque	  		
// 	  	}
// 	  }

// // 	  for(var i = 0; i < canv3.height; i++) 
// // 	  {
// // 	  	for(var j = 0; j < canv3.width; j++) 
// // 	  	{
// // 	        var s = 4 * i * canv3.width + 4 * j;  // calculate the index in the array
// // 	        var x = arr[i][j];  // the RGB values
// // 	        // arrayImagedata[s] = x[0];
// // 	        // arrayImagedata[s + 1] = x[1];
// // 	        // arrayImagedata[s + 2] = x[2];
// // 	        // console.log(s);
// // 	        if(x==1)
// // 	        {
// // 	        	arrayImagedata.data[s] = 0;
// // 	        	arrayImagedata.data[s + 1] = 250;
// // 	        	arrayImagedata.data[s + 2] = 0;
// // 	        	arrayImagedata.data[s + 3] = 255;  // fully opaque	
// // 	    }
// // 	    else
// // 	    {
// // 	    	arrayImagedata.data[s] = 0;
// // 	    	arrayImagedata.data[s + 1] = 0;
// // 	    	arrayImagedata.data[s + 2] = 0;
// // 	        arrayImagedata.data[s + 3] = 0;  // fully opaque
// // 	    }
// // 	}
// // }


// 	context3.putImageData(arrayImagedata, 0, 0);
	// canv2.style.visibility='hidden';

}