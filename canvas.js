   no_cc = 0;
   cc = [];
  var arr = [];
  var vis = [];

  ch = 0;
  cw = 0;

function Display(e)
{
  var reader = new FileReader();
  // var canv1 = document.getElementById('Q1');
  // var ctx1 = canv1.getContext('2d');

  var canv2 = document.getElementById('Q2');
  var ctx2 = canv2.getContext('2d');

  var canv3 = document.getElementById('Q3');
  var ctx3 = canv3.getContext('2d');

  reader.onload = function(event)
  {
    var img = new Image();
    img.onload = function()
    {
      // ctx1.drawImage(img,0,0, canv1.width, canv1.height);
      ctx2.drawImage(img,0,0, canv2.width, canv2.height);
      ctx3.drawImage(img,0,0, canv3.width, canv3.height);
      toggle();

    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.files[0]);
}


function toggle()
{
  var canvas1=document.getElementById('Q2');
  var canvas2=document.getElementById('Q3');

  // alert("Toggle");
  if(canvas2.style.visibility=='visible')
  {
    canvas2.style.visibility='hidden';
    // canvas2.style.visibility='visible';
  }
  else
  {
    canvas2.style.visibility='visible';
    // canvas2.style.visibility='hidden';
  }
}


function dfs(ix, jx)
{
  if(vis[ix][jx] == 1 || ix<0 || jx <0 || ix>=ch || jx >=cw)
  {
    return;
  }

  vis[ix][jx] = 1;
  dfs(ix-1, jx); 
  dfs(ix-1, jx+1); 
  dfs(ix-1, jx-1); 
  dfs(ix, jx+1); 
  dfs(ix, jx-1); 
  dfs(ix+1, jx); 
  dfs(ix+1, jx+1); 
  dfs(ix+1, jx-1); 
  return ;
}


function Predict()
{
  var canvas1=document.getElementById('Q2');
  var canvas2=document.getElementById('Q3');

  var canvas1=document.getElementById('Q2');
  var context1 = canvas1.getContext("2d");

  var canvas2=document.getElementById('Q3');
  var context2 = canvas2.getContext("2d");

  var originalImagedata = context1.getImageData(0, 0, canvas2.width, canvas2.height);
  var binaryImagedata = context2.getImageData(0, 0, canvas2.width, canvas2.height);

  console.log(binaryImagedata.data.length);

  var binaryimg = [];

  for (i = 0; i < binaryImagedata.data.length; i += 4)
  {
    if(binaryImagedata.data[i] == 255) binaryimg.push(1);
    else binaryimg.push(0);
  }

  console.log(binaryimg.length)
  // matrix = BlobExtraction(binaryimg, canvas2.width, canvas2.height);

  // console.log(marix.length)

  ch = canvas2.height;
  cw = canvas2.width;
  console.log(binaryImagedata[10]);
  console.log(binaryImagedata[20]);
  console.log(binaryImagedata[30]);


  for(i = 0; i < canvas2.height; i++) 
  {
   arr[i] = [];
   vis[i] = [];
   for(j = 0; j < canvas2.width; j++) 
   {
    s = 4 * i * canvas2.width + 4 * j;
  // console.log(binaryImagedata.data.length);
  // console.log(binaryImagedata[s]);
  arr[i][j] == 0;

     // if(binaryImageData.data[s] == 255)
     // {
     //   arr[i][j] = 1;  
     // }
     // else
     //  {
     //   arr[i][j] = 0;
     //     // console.log(s);
     //  }
      vis[i][j] = -1;

     }
   }


   for(i = 0; i < canv2.height; i++) 
   {
    for(j = 0; j < canv2.width; j++)
    {
      if(vis[i][j] == -1  && ar[i][j] == 1)
      {
        cc[no_cc] = [];
        dfs(i, j);
        no_cc = no_cc + 1;

      }
    }
   }
  console.log(binaryImagedata.data.length);

   console.log(no_cc);



}







