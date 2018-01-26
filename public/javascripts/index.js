$(document).ready(function(){
	var width = $(window).width();
	var seller={};
	if(width > 768){
		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 200){
				$('.robot').css({
		 			"opacity":"1",
		 			"top":"0px"
	 			});
			}	
			else {
				$('.robot').css({
		 			"opacity":"0",
		 			"top":"160px"
	 			})
			}
		});
		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 1300){
				$('.course-item-1').css({
		 			"opacity":"1",
		 			"top":"0px"
	 			});
			}	
			else {
				$('.course-item-1').css({
		 			"opacity":"0",
		 			"top":"100px"
	 			})
			}
		});
		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 1500){
				$('.course-item-2').css({
		 			"opacity":"1",
		 			"top":"0px"
	 			});
			}	
			else {
				$('.course-item-2').css({
		 			"opacity":"0",
		 			"top":"100px"
	 			})
			}
		});
		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 2100){
				$('.faq-1-p').css({
		 			"opacity":"1",
		 			"left":"0px"
	 			});
			}	
			else {
				$('.faq-1-p').css({
		 			"opacity":"0",
		 			"left":"0px"
	 			})
			}
		});
	}else {
		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 150){
				$('.robot').css({
		 			"opacity":"0.2",
		 			"top":"-100px"
	 			});
			}	
			else {
				$('.robot').css({
		 			"opacity":"0",
		 			"top":"0px"
	 			})
			}
		});
		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 300){
				$('.course-item-1').css({
		 			"opacity":"1",
		 			"top":"0px"
	 			});
			}	
			else {
				$('.course-item-1').css({
		 			"opacity":"0",
		 			"top":"100px"
	 			})
			}
		});
		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 1000){
				$('.course-item-2').css({
		 			"opacity":"1",
		 			"top":"0px"
	 			});
			}	
			else {
				$('.course-item-2').css({
		 			"opacity":"0",
		 			"top":"100px"
	 			})
			}
		});
		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 2000){
				$('.faq-1-p').css({
		 			"opacity":"1",
		 			"left":"0px"
	 			});
			}	
			else {
				$('.faq-1-p').css({
		 			"opacity":"0",
		 			"left":"0px"
	 			})
			}
		});
	}
})