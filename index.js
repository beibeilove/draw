// /*马赛克*/
// function m(dataobj,num,x,y) {
//     var width = dataobj.width, height = dataobj.height;
//     var num = num;
//     var w = width / num;
//     var h = height / num;
//     for (var i = 0; i < num; i++) {//行
//         for (var j = 0; j < num; j++) {//列  x
//             var dataObj = cobj.getImageData(j * w, i * h, w, h);
//             var r = 0, g = 0, b = 0;
//             for (var k = 0; k < dataObj.width * dataObj.height; k++) {
//                 r += dataObj.data[k * 4 + 0];
//                 g += dataObj.data[k * 4 + 1];
//                 b += dataObj.data[k * 4 + 2];
//             }
//             r = parseInt(r / (dataObj.width * dataObj.height));
//             g = parseInt(g / (dataObj.width * dataObj.height));
//             b = parseInt(b / (dataObj.width * dataObj.height));
//             console.log(r + "--" + g + "--" + b);
//             for (var k = 0; k < dataObj.width * dataObj.height; k++) {
//                 dataObj.data[k * 4 + 0] = r;
//                 dataObj.data[k * 4 + 1] = g;
//                 dataObj.data[k * 4 + 2] = b;
//             }
//             cobj.putImageData(dataObj, x + j * w, y+i * h);
//         }
//     }
// }
// /*模糊*/
// function blur(dataobj,num,x,y) {
//     var width = dataobj.width, height = dataobj.height;
//     var arr=[];
//     var num = num;
//     for (var i = 0; i < width; i++) {//行
//         for (var j = 0; j < height; j++) {//列  x
//             var x1=j+num>width?j-num:j;
//             var y1=i+num>height?i-num:i;
//             var dataObj = cobj.getImageData(x1, y1,num, num);
//             var r = 0, g = 0, b = 0;
//             for (var k = 0; k < dataObj.width * dataObj.height; k++) {
//                 r += dataObj.data[k * 4 + 0];
//                 g += dataObj.data[k * 4 + 1];
//                 b += dataObj.data[k * 4 + 2];
//             }
//             r = parseInt(r / (dataObj.width * dataObj.height));
//             g = parseInt(g / (dataObj.width * dataObj.height));
//             b = parseInt(b / (dataObj.width * dataObj.height));
//             arr.push(r,g,b,255);
//         }
//     }
//     for(var i=0;i<dataobj.data.length;i++){
//         dataobj.data[i]=arr[i]
//     }
//     cobj.putImageData(dataobj,x,y);
// }
// function fx(dataobj,x,y){
//     for(var i=0;i<dataobj.width*dataobj.height;i++){
//         dataobj.data[i*4+0]=255-dataobj.data[i*4+0];
//         dataobj.data[i*4+1]=255-dataobj.data[i*4+1];
//         dataobj.data[i*4+2]=255-dataobj.data[i*4+2];
//         dataobj.data[i*4+3]=255
//     }
//     cobj.putImageData(dataobj,x,y);
// }
//
// var lis=document.getElementsByTagName("li");
// for(var i=0;i<lis.length;i++){
//     lis[i].onclick=function(){
//         var attr=this.getAttribute("data-role")
//         if(attr=="blur"){
//             blur(dataobj,5,0,0)
//         }else if(attr=="fx"){
//             fx(dataobj,0,0)
//         }else if(attr=="m"){
//             m(dataobj,50,0,0)
//         }
//     }
// }