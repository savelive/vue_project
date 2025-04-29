!(function () {

    //关于文字的画布，防止取到烟花粒子点阵信息
   var textCanvas = document.createElement("canvas");
    textCanvas.width=1000;
    textCanvas.height=300;

    var textctx = textCanvas.getContext("2d");
    textctx.fillStyle="#000000";
    textctx.fillRect(0,0,textCanvas.width,textCanvas.height);
 

    //关于烟花的画布
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    canvas.style.position="fixed";
    canvas.style.left="0";
    canvas.style.top="0";
    canvas.style.zIndex=-1;

    var context = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        clearCanvas();
    }

    function clearCanvas() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    resizeCanvas();


    window.addEventListener("resize", resizeCanvas);


    function mouseDownHandler(e) {
        var x = e.clientX;
        var y = e.clientY;
        console.log("鼠标的坐标：" + "(" + x, y + ")");

        createFireworks(x, y, "测试");
    }
    document.addEventListener("mousedown", mouseDownHandler);

    // 烟花粒子的数组
    var particles = [];

    // 同频刷新
    function tick() {
        //实现拖尾
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(0,0,0,' + 10 / 100 + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = 'lighter';

        drawFireworks();
        requestAnimationFrame(tick);
    }
    tick();


    //定时器自动放烟花
    setInterval(function () {
        createFireworks(Math.random() * canvas.width, Math.random() * canvas.height)
    }, 1000);



    //粒子的Stytle
    function createFireworks(x, y, text = "") {

        // 色度相关
        var hue = Math.floor(Math.random() * 51) + 150;
        var hueVariance = 30;

        //写入字体判断,是否显示字体
        if (text != "") {
            // console.log('成功打印文字烟花！');
            var fontSize = 150;
            textctx.font = fontSize + "px Verdana";

            var textWidth=textctx.measureText(text).width;
            var textHeight=fontSize;

            textctx.fillStyle = "#ffffff";
            textctx.fillText(text, 0, 0 +textHeight);

            //去除字体区域的点阵信息，达到烟花效果
            //点阵信息为[r,g,b,a,r,g,b,a... ...]
            var imageData = textctx.getImageData(0,0,textWidth,textHeight);
          
            //画完后变为黑色背景状态
            textctx.fillRect(0,0,textCanvas.width,textCanvas.height);
            //值越小，取到的点击越多，点越密
            var gap = 4;

            for (var h = 0; h < textHeight; h += gap) {
                for (var w = 0; w < textWidth; w += gap) {
                    var position = (textWidth * h + w) * 4;
                    var r = imageData.data[position], g = imageData.data[position + 1], b = imageData.data[position + 2];
                    if (r + g + b == 0) continue;

                    // context.fillRect(w, h+ textHeight, 1, 1);

                    var p={};
                    p.x=x;
                    p.y=y;

                    p.fx=x+w-textWidth/2;
                    p.fy=y+h-textHeight/2;

                    p.size=Math.floor(Math.random()*2)+1;
                    p.speed=1;

                    //与烟花绚丽同步
                    p.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
                    p.brightness = Math.floor(Math.random() * 31) + 50;
                    p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;
    
                    particles.push(p);

                }
            }
        }
        else {
            var count = 100;
            // var radius = 0;
            for (var i = 0; i < count; i++) {
                var angle = 360 / count * i;
                var radians = angle * Math.PI / 180;

                /*  var vx = x + Math.cos(radians) * radius;
                 var vy = y + Math.sin(radians) * radius; */

                var p = {};
                p.x = x;
                p.y = y;
                p.radians = radians;

                p.size = 2;

                p.speed = (Math.random() * 5) + .4;
                p.radius = p.speed;

                p.fx=x+Math.cos(radians)*p.radius;
                p.fy=x+Math.sin(radians)*p.radius;
                //烟花变绚丽，复杂  色度、亮度、透明度
                p.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
                p.brightness = Math.floor(Math.random() * 31) + 50;
                p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;

                particles.push(p);
            }

        }

    }



    //绘制烟花的函数
    function drawFireworks() {
        clearCanvas();
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var vx = Math.cos(p.radians) * p.radius;
            var vy = Math.sin(p.radians) * p.radius + 0.4;

            p.x += vx;
            p.y += vy;
            p.radius *= 1 - p.speed / 100;

            //烟花透明度由1到0
            p.alpha -= 0.005;
            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            context.beginPath();
            //绘制圆点像素
            context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
            context.closePath();
            //这个函数传色度、亮度、透明度。
            context.fillStyle = 'hsla(' + p.hue + ',100%,' + p.brightness + '%,' + p.alpha + ')';
            context.fill();
        }

    }


})();