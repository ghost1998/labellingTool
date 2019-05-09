var canvas, ctx, flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false;

currenttool = "pencil"
var x = "red",
y = 2;

size = 2;

function init() 
{
    canvas = document.getElementById("Q3");
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    canvas.addEventListener
    ("mousemove", 
        function (e) 
        {
            findxy('move', e) ; 
        }, 
        false
        );

    canvas.addEventListener
    ("mousedown", 
        function (e) 
        {
            findxy('down', e) 
        }, 
        false
        );

    canvas.addEventListener
    ("mouseup", 
        function (e) 
        {
            findxy('up', e)
        }, 
        false
        );

    canvas.addEventListener
    ("mouseout", 
        function (e) 
        {
            findxy('out', e)
        }, 
        false
        );
}



function getPencil()
{
    if(currenttool == "magnify") removeglass();

    var elementToChange = document.getElementsByTagName("body")[0];
    elementToChange.style.cursor = "url('./pencil.cur'), auto";

    ctx.globalCompositeOperation = "source-over";
    x = "rgba(255,0,0)";
    y = size;
    currenttool = "pencil"
}

function getErasor()
{
    if(currenttool == "magnify") removeglass();

    var elementToChange = document.getElementsByTagName("body")[0];
    elementToChange.style.cursor = "url('./eraser.cur'), auto";

    ctx.globalCompositeOperation = "destination-out"
    y = size;
    currenttool = "erasor"
}

function draw() 
{

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;



    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}


function findxy(res, e) 
{
    if (res == 'down') 
    {
        prevX = currX;
        prevY = currY;
        currX = e.layerX;
        currY = e.layerY ;

        flag = true;
        dot_flag = true;
        if (dot_flag) 
        {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.layerX;
            currY = e.layerY;
            draw();
        }
    }
}



function increaseSize()
{
    size = size + 2
    if (currenttool == "erasor") getErasor();
    else getPencil();
}
        
function decreaseSize()
{
    size = size - 2
    if(size < 2) size = 2
    if (currenttool == "erasor") getErasor();
    else getPencil();
}

function customSize(arg)
{
    // console.log(arg)

    // size = size + 2

    if(arg == "S") size = 2
    else if(arg == "M") size = 4
    else if(arg == "L") size = 8
    else if(arg == "H") size = 12
    if (currenttool == "erasor") getErasor();
    else getPencil();
}


  function zoom1(e)
  {
    // console.log(e);
    zoomCtx.fillStyle = "white";
    //zoomCtx.clearRect(0,0, zoom.width, zoom.height);
    //zoomCtx.fillStyle = "transparent";
        // currX = e.layerX;
        // currY = e.layerY

    // console.log(main.width)
    var rect = canvas.getBoundingClientRect();
    xp =  (e.clientX - rect.left) / (rect.right - rect.left) * main.width - 2
    yp = (e.clientY - rect.top) / (rect.bottom - rect.top) * main.height - 2

    // console.log(xp)
    // console.log(yp)
    zoomCtx.fillRect(0,0, zoom.width, zoom.height);
    // zoomCtx.drawImage(main, e.x, e.y, 200, 100, 0,0, 400, 200);
    // zoomCtx.drawImage(main, e.layerX, e.layerY, 200, 100, 0,0, 400, 200);
    zoomCtx.drawImage(main2, xp, yp, 200, 100, 0,0, 400, 200);
    zoomCtx.drawImage(main, xp, yp, 200, 100, 0,0, 400, 200);
    // console.log(zoom.style);
    // console.log("in erasor")
    zoom.style.top = e.pageY - 120 + "px"
    zoom.style.left = e.pageX  + 10 + "px"
    zoom.style.display = "block";
  }

  function zoom2()
  {
    zoom.style.display = "none";
  }

  var main = document.getElementById("Q3");
  var main2 = document.getElementById("Q2");
  var zoom = document.getElementById("zoom");
  var ctx = main.getContext("2d")
  var zoomCtx = zoom.getContext("2d");


function mag()
{
  currenttool = "magnify"
  var elementToChange = document.getElementsByTagName("body")[0];
  elementToChange.style.cursor = "url('./mag.cur'), auto";





  main.addEventListener("mousemove", zoom1
  );

  main.addEventListener("mouseout", zoom2
  );
}


function removeglass()
{
    console.log("removeglass");

    document.getElementById("Q3").removeEventListener("mousemove", zoom1); 
    document.getElementById("Q3").removeEventListener("mousemove", zoom2); 
    zoomCtx.clearRect(0,0, zoom.width, zoom.height);
    zoomCtx.fillStyle = "transparent";

    // init();
}

function download(){
    console.log("in down 2")
    var date = new Date();
    var timestamp = date.getTime();
    var name1 = "Image_" + timestamp + ".jpg"
    var name2 = "Mask_" + timestamp + ".jpg"
    console.log(name1);
    console.log(name2);

    var canvas = document.getElementById("Q2");
    var fileName = name1
    if ('msToBlob' in canvas) 
    { // IE10+
        var blob = canvas.msToBlob();
        navigator.msSaveBlob(blob, fileName);
    } 
    else 
    {
        var a = document.createElement('a');
        a.setAttribute('href', canvas.toDataURL());
        a.setAttribute('target', '_blank');
        a.setAttribute('download', fileName);
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    var canvas = document.getElementById("Q3");
    var fileName = name2
    if ('msToBlob' in canvas) 
    { // IE10+
        var blob = canvas.msToBlob();
        navigator.msSaveBlob(blob, fileName);
    } 
    else 
    {
        var a = document.createElement('a');
        a.setAttribute('href', canvas.toDataURL());
        a.setAttribute('target', '_blank');
        a.setAttribute('download', fileName);
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


}


init();







function initDraw(canvas) 
{

    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) 
        { //Moz
            console.log("in moz")

            var rect = canvas.getBoundingClientRect();
            xp =  (e.clientX - rect.left) / (rect.right - rect.left) * main.width
            yp = (e.clientY - rect.top) / (rect.bottom - rect.top) * main.height

            mouse.x = e.layerX
            mouse.y = e.layerY

            // mouse.x = ev.pageX + window.pageXOffset;
            // mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    var element = null;

    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {

                        var rect = canvas.getBoundingClientRect();
            xp =  (e.clientX - rect.left) / (rect.right - rect.left) * main.width
            yp = (e.clientY - rect.top) / (rect.bottom - rect.top) * main.height

            mouse.x = e.layerX
            mouse.y = e.layerY


            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
        }
    }

    canvas.onclick = function (e) {
        if (element !== null) {
            element = null;
            canvas.style.cursor = "default";
            console.log("finsihed.");
        } else {
            console.log("begun.");

                        var rect = canvas.getBoundingClientRect();
            xp =  (e.clientX - rect.left) / (rect.right - rect.left) * main.width
            yp = (e.clientY - rect.top) / (rect.bottom - rect.top) * main.height

            mouse.x = e.layerX
            mouse.y = e.layerY

            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            element = document.createElement('div');
            element.className = 'rectangle'
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            canvas.appendChild(element)
            canvas.style.cursor = "crosshair";
        }
    }
}


// initDraw(document.getElementById('Q3'));
