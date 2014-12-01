
/*parameters  
stringToRender : the string correspnding to this qrcode
size : the size of the qrCode svg

example of call (in html ) : 
{{>qrcode stringToRender="This is a test" size=150}}
*/
Template.qrcode.rendered = function () {
	
    var qrcodesvg = new Qrcodesvg(this.data.stringToRender, document.getElementById("qrcode"), this.data.size);

    qrcodesvg.draw();
};