    var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "red",
        y = 2;
    
    function init() 
    {
        canvas = document.getElementById("Q3");
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;

        // ctx.fillStyle = "#FF0000";
        // ctx.fillRect(0, 0, w, h);

        // alert(w);
        // alert(h);

        canvas.addEventListener("mousemove", 
            function (e) 
            {
                // document.getElementById('test').innerHTML = "hi";
            findxy('move', e) ; 
            // console.log("in listener"); alert("in listener");
            }, false);

        // alert(w);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e) 
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);
    }




    
    function color(obj,size) 
    {
        //alert(obj.id);
        if(obj.id == "black")
        {
            ctx.globalCompositeOperation = "source-over";
            // alert("inb");
            x = "rgba(255,0,0)";
            y = size;
        }
        else
        {
            ctx.globalCompositeOperation = "destination-out"
            // x = "rgba(255,0 ,0,0)";
            y = size;
        }
        // switch (obj.id) 
        // {

        //     alert("in objid");
        //     case "black":
        //         
        //         break;
        //     case "white":
        //         
        //         break;
        // }

        // y = 12;
        // if (x == "white") y = 14;
        // else y = 2;
    
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
    
    function erase() {
        // var m = confirm("Want to clear");
         {

            // ctx.globalCompositeOperation = "destination-out";
            // ctx.strokeStyle = "rgba(255,0,0,100)";

            ctx.clearRect(0, 0, w, h);
            document.getElementById("Q3").style.display = "none";
        }
    }
    
    function save() {
        document.getElementById("Q3").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("Q3").src = dataURL;
        document.getElementById("Q3").style.display = "inline";
    }
    
    function findxy(res, e) 
    {
        // alert("in fxy");
        // console.log("in fxy");
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.layerX;
            currY = e.layerY ;
    
            flag = true;
            dot_flag = true;
            if (dot_flag) {
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

init();
// window.onload = init();
