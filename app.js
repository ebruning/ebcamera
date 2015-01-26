window.onload = function() {
 
  var rawCanvas = document.getElementById('raw-canvas');
  var resultData = document.getElementById('rtti-result');
   var takePicture = document.getElementById('take-picture');
   var instruction = document.getElementById('ins-result');
   var serverResponse;
   var demoUrls = {
    "New Account": "http://172.31.1.19/mobilesdk/api/mobileid?xCropImage=True",
	"Check Deposit": "http://63.110.241.79/mobilesdk/api/checkdeposit1_1?customer=kofax&processimage=true",
    
  };
   var select = document.getElementById('demoSelect');
  select.innerHTML = Object.keys(demoUrls).map(function(data) {
    return '<option value="'+demoUrls[data]+'">'+data+'</option>';
  });
  var kfxImage = new KfxMobileCapture({sourceId:'take-picture',targetId:'raw-canvas',width: 500, height: 500}, function(res){
	
		instruction.innerHTML = 'Please wait... While getting response from server';
			kfxImage.export({utf8Image:res,url:select.value}, function(data){
			serverResponse = JSON.parse(data);
			displayExtractedFields(serverResponse.fields);
			});
	});
	
	function displayExtractedFields(res){
		var dynamicHTML = "<div>";
		for (var filed in res) {
			dynamicHTML += "<div><h6>"+res[filed].name+"</h6></div><div><input type='text' style='height:50px;font-size:20px' value='"+res[filed].text+"'disabled='disabled' /></div><br/>";
		}
		dynamicHTML += "</div>";
		resultData.innerHTML = dynamicHTML;
		instruction.innerHTML = '';
	}
  
};
