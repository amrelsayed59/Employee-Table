$(document).ready(function) {
	$('.carousel').carousel ({
		interval: 2000
	});	
});

$(document).ready(function) {

	$(".testimonials .carousel-indicators li").click(function() {
    	$(this).addClass("active").siblings().removeClass("active")
		
});
	});

