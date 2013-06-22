$(document).ready(function(){

	$('#designlens').click(function() {
		//alert("handler for click called");
		console.log("designlens clicked");
		var comp = $.Edge.getComposition("EDGE-1423125942");
		var stage = comp.getStage();
		console.log(stage);
		stage.play();
	});
});