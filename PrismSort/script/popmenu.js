$(document).ready(function(){
	
	
	
	//hover over prism and get the sort menu
	$('#prism').mouseenter(function() {
		$('#prismsort').show();
	});

	$('#prism').mouseleave(function() {
		$('#prismsort').hide();
	});

	$('#prismsort').mouseenter(function() {
		$('#prismsort').show();
	});

	$('#prismsort').mouseleave(function() {
		$('#prismsort').hide();
	});

	$(document).on('mouseover', '#results', function() {
		$('.file').attr("onmouseover", "popup($(this).children(':nth-child(2)').html(), 600);");
	});


	
	
	
	
	
	
/*
	$('.file').mouseleave(function() {
	      $(this).children(":first").hide();
	  });
*/
/**
	$('#prism').hover(function() {
	      $('#prismsort').show();
	}, function() {
	      $('#prismsort').hide();
	});**/
});