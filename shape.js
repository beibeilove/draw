function shape(canvas,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.style="stroke";
    this.fillType="line";
    this.lineWidth=1;
    this.fill="#000000";
    this.border="#000000";
    this.clearRect=this.cobj.clearRect;
    this.history=[];
    this.bianNum=5;
    this.jiaoNum=5;
    this.isback=true;
}
shape.prototype={
    init:function(){
        this.cobj.strokeStyle=this.border;
        this.cobj.fillStyle=this.fill;
        this.cobj.lineWidth=this.lineWidth;
    },
    draw:function () {
        var that=this;
        this.canvas.onmousedown=function(e){
            that.isback=true;
            that.init();
            var startx=e.offsetX;
            var starty=e.offsetY;
            that.canvas.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0)
                }
                var endx=e.offsetX;
                var endy=e.offsetY;
                that.cobj.beginPath();
                that[that.fillType](startx,starty,endx,endy);
            }
            that.canvas.onmouseup=function (e) {
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height))
            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
    },
    rect:function (x,y,x1,y1) {
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.style]();
    },
    arc:function (x,y,x1,y1) {
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    bian:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var angle=360/this.bianNum*Math.PI/180;
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(r*Math.cos(angle*i)+x,r*Math.sin(angle*i)+y)
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        var angle=360/(this.jiaoNum*2)*Math.PI/180;
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(r*Math.cos(angle*i)+x,r*Math.sin(angle*i)+y)
            }else{
                this.cobj.lineTo(r1*Math.cos(angle*i)+x,r1*Math.sin(angle*i)+y)
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    pencil:function(x,y,x1,y1){
        var that=this;
        that.cobj.moveTo(x,y);
        that.canvas.onmousemove=function(e){
            that.init();
            var endx= e.offsetX;
            var endy= e.offsetY;
            that.cobj.clearRect(0,0,that.width,that.height);
            if(that.history.length>0){
                that.cobj.putImageData(that.history[that.history.length-1],0,0);
            }
            that.cobj.lineTo(endx,endy);
            that.cobj.stroke();
        }
    }
}

function blur(){
    this.width=dataobj.width;
    this.height=dataobj.height;
    this.num=10;
    this.x=x;
    this.y=y;
    alert(1);
}

blur.prototype={
    // 马赛克

    msk:function(dataobj,num,x,y) {
        var that=this;
        var w = width / num;
        var h = height / num;
        for (var i = 0; i < num; i++) {//行
            for (var j = 0; j < num; j++) {//列  x
                var dataObj=that.cobj.getImageData(j*w,i*h,w,h);
                var r=0,g=0,b=0;
                for (var k=0;k<dataObj.width*dataObj.height;k++) {
                    r += dataObj.data[k * 4 + 0];
                    g += dataObj.data[k * 4 + 1];
                    b += dataObj.data[k * 4 + 2];
                }
                r = parseInt(r / (dataObj.width * dataObj.height));
                g = parseInt(g / (dataObj.width * dataObj.height));
                b = parseInt(b / (dataObj.width * dataObj.height));
                console.log(r + "--" + g + "--" + b);
                for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                    dataObj.data[k * 4 + 0] = r;
                    dataObj.data[k * 4 + 1] = g;
                    dataObj.data[k * 4 + 2] = b;
                }
                cobj.putImageData(dataObj, x + j * w, y+i * h);
            }

        }
    },
    /*模糊*/
    blur:function(dataobj,num,x,y) {
        var width = dataobj.width, height = dataobj.height;
        var arr=[];
        var num = num;
        alert(num);
        var that=this;
        for (var i = 0; i < height; i++) {//行
            for (var j = 0; j < width; j++) {//列  x
                var x1=j+num>width?j-num:j;
                var y1=i+num>height?i-num:i;
                var dataObj = that.cobj.getImageData(x1, y1,num, num);
                var r = 0, g = 0, b = 0;
                for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                    r += dataObj.data[k * 4 + 0];
                    g += dataObj.data[k * 4 + 1];
                    b += dataObj.data[k * 4 + 2];
                }
                r = parseInt(r / (dataObj.width * dataObj.height));
                g = parseInt(g / (dataObj.width * dataObj.height));
                b = parseInt(b / (dataObj.width * dataObj.height));
                arr.push(r,g,b,255);
            }
        }
        for(var i=0;i<dataobj.data.length;i++){
            dataobj.data[i]=arr[i]
        }
        cobj.putImageData(dataobj,x,y);
    },
    fx:function(dataobj,x,y){
        for(var i=0;i<dataobj.width*dataobj.height;i++){
            dataobj.data[i*4+0]=255-dataobj.data[i*4+0];
            dataobj.data[i*4+1]=255-dataobj.data[i*4+1];
            dataobj.data[i*4+2]=255-dataobj.data[i*4+2];
            dataobj.data[i*4+3]=255
        }
        cobj.putImageData(dataobj,x,y);
    }
}

function lizi(canvas,cobj){
    this.cobj=cobj;
    this.x=0;
    this.y=0;
    this.r=3+3*Math.random();
    this.color="rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
    this.speedx=10*Math.random()-5;
    this.speedy=10*Math.random()-5;
    this.zhongli=0.3;
    this.speedr=0.05;
}
lizi.prototype={
    draw:function () {
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.beginPath();
        this.cobj.arc(600,100,this.r,0,2*Math.PI);
        this.cobj.fillStyle=this.color;
        this.cobj.closePath();
        this.cobj.fill();
        this.cobj.restore();
    },
    update:function () {
        this.x+=this.speedx;
        this.y+=this.speedy;
        this.speedy+=this.zhongli;
        this.r-=this.speedr;
    }
}
function fire(cobj){
    this.cobj=cobj;
    this.x=200;
    this.y=200;
    this.r=3+6*Math.random();
    this.speedy=6+Math.random();
    this.speedr=0.3;
    this.speedl=0.1;
    this.life=2;
    this.color="rgb(226,17,12)"
}
fire.prototype={
    draw:function () {
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.beginPath();
        this.cobj.fillStyle=this.color;
        this.cobj.globalCompositeOperation="lighter";
        this.cobj.arc(400,100,this.r,0,2*Math.PI);
        this.cobj.fill();
        this.cobj.restore();
    },
    update:function () {
        this.x+=24*Math.random()-12;
        this.y-=this.speedy;
        this.r-=this.speedr;
        this.life-=this.speedl;
    }
}


