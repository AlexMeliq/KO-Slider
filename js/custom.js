jQuery(document).ready(function($){
	if (typeof koSlider == "undefined") {
		
		var _arrow = true;
		var _thumbnails = true;
		var _thumbTYpe = 'image';
		var _koWidth = 1000;
		var _koSlideAuto = true;
		var _koSlideSpeed = 3000;
		
	}
	else
	{
		/*check default variables*/
		if(typeof koSlider.arrow !== 'undefined')
			_arrow = koSlider.arrow;
		else
			_arrow = true;
		if(typeof koSlider.thumbnails !== 'undefined')
			_thumbnails = koSlider.thumbnails;
		else
			_thumbnails = true;
		if(typeof koSlider.thumbnails.type !== 'undefined')
			_thumbTYpe = koSlider.thumbnails.type;
		else
			_thumbnails = true;
		if(typeof koSlider.sliderWidth !== 'undefined')
			_koWidth = koSlider.sliderWidth;
		else
			_koWidth = 1000;
		if(typeof koSlider.autoSlide !== 'undefined')
			_koSlideAuto = koSlider.autoSlide;
		else
			_koSlideAuto = true;
		if(typeof koSlider.speed !== 'undefined')	
			_koSlideSpeed = koSlider.speed;
		else
			_koSlideSpeed = 3000;
	};
    	
	
    /*global variables*/

    var slider = $('.slider');
    var arLeft = '<p class="arLeft"></p>';
    var arRight = '<p class="arRight"></p>';

    /*global styles*/

    slider.width(_koWidth);

    /*add classes*/

    slider.children('div').eq(0).attr('id', 'images');
    $('#images').height($('#images>div').first().height());
    $('#images>div').attr('id', 'image');
    $('#images').append(arLeft, arRight);

    /*add images index*/

    $('#images>div').each(function(){
        var index = $(this).index();
        var imageWidth = $('img',this).width();
        $('img', this).css({marginLeft:-imageWidth/2});
        $(this).attr('data-index', index);

    });

    /*add thumbnails*/
    if(_thumbnails){
		/*add images thumbnails*/
		if(_thumbTYpe == 'image')
		{
			var thumb = $('#images').clone();
			$(thumb).insertAfter('#images').attr('id', 'thumbnails');
			$(slider).hover(function(){
				$('#thumbnails').height(_koWidth/10);
			},function(){
				$('#thumbnails').height(0);
			});

			$('#thumbnails>div').attr('id', 'thumb').width(_koWidth/10).height(_koWidth/10);
			if(!_arrow)
				$('#thumbnails>p, #images>p').remove();
			else
				$('#thumbnails>p').attr('id', 'thumbArrow').width(_koWidth/20).height(_koWidth/10);
			var thumLength = $('#thumbnails>div').length;
			if(thumLength>10){
				$('#thumbnails').width(thumLength*_koWidth/10);
				$('#thumbnails>p.arRight').css({right:(thumLength-10)*_koWidth/10})
			}else{
				$('#thumbnails').css({paddingLeft:((10-thumLength)*_koWidth/10)/2});
				$('#thumbnails>p').remove();
			}
			$('#thumbnails #thumb').each(function(){
				$('img',this).css({marginLeft:0});
				/*thumbnails hover*/
				$('#thumbnails img').hover(function(){
					$(this).addClass('hover');
				}, function(){
					$(this).removeClass('hover');
				});
			
				/*thumbnails functional*/

				$(this).click(function(){
					$('#thumbnails #thumb').removeClass('active');
					$(this).addClass('active');
					var thumbAtr = $(this).attr('data-index');
					$('#images #image').each(function(){
						var imageAtr =  $(this).attr('data-index');
						if(thumbAtr == imageAtr)
						{
							$('#images #image').stop(true, false).animate({opacity:0,zIndex:0},400);
							$(this).css({display:'block',zIndex:1}).stop(true, false).animate({opacity:1},400);
							return false;
						}
					})
						clearInterval(interval);
						interval = '';
						setTimeout(function(){
							startInterval();	
						}, _koSlideSpeed/2);
					})
			});
			$('#images #image').each(function(){
				var ind = $(this).css('zIndex');
				if(ind == 'auto'){
					var atrib = $(this).attr('data-index');
				}else
					return false;
				$('#thumbnails #thumb').each(function(){
					if($(this).attr('data-index') == atrib)
						$(this).addClass('active');
				})
			})

			/*thumbnails arrow clicks*/
			var clickMargin = $('#thumb').position().left;

			$('#thumbArrow.arRight, #images .arRight').click(function(){
				if(thumLength>10){
					var animLeft = _koWidth/10;
					clickMargin = $('#thumb').position().left;
					if(clickMargin == 'auto')
						clickMargin = 0;
					var maxMargin = -(thumLength-10)*_koWidth/10;
					$('#thumbnails #thumb').each(function(){
						if(clickMargin <= maxMargin){
							$(this).stop(true, false).animate({left:maxMargin},300);
						}
						else
							$(this).stop(true, false).animate({left:clickMargin-animLeft},300);
					});
				}
				else{
					$('#thumbArrow.arLeft').css({opacity:.3});
				}
			});
			$('#thumbArrow.arLeft, #images .arLeft').click(function(){
				if(thumLength>10){
					var animLeft = _koWidth/10;
					clickMargin = $('#thumb').position().left;
					if(clickMargin == 'auto')
						clickMargin = 0;
					var maxMargin = -(thumLength-10)*_koWidth/10;
					$('#thumbnails #thumb').each(function(){
						if(clickMargin >= 0){
							$(this).stop(true, false).animate({left:0},300);
						}
						else
							$(this).stop(true, false).animate({left:clickMargin+animLeft},300);
					});
				}
				else{
					$('#thumbArrow.arLeft').css({opacity:.3});
				}
			});
		}
		/*add circle thumbnails */
		else if(_thumbTYpe == 'circle')
		{
			$('.slider').append('<div class="circle"></div>');
			var thumLength = $('#images #image').length;
			for(var i = 0; i < thumLength; i++)
			{
				$('.circle').append('<li></li>')
			};
			$('.circle li').first().addClass('activeCircle');
			$('#images #image').each(function(){
				var ind = $(this).css('zIndex');
				if(ind == 'auto'){
					var atrib = $(this).attr('data-index');
				}else
					return false;
				$('.circle li').each(function(){
					if($(this).attr('data-index') == atrib)
						$(this).addClass('activeCircle');
				})
			})
			$('.circle li').each(function(){
				var index = $(this).index();
				var imageWidth = $('img',this).width();
				//$('img', this).css({marginLeft:-imageWidth/2});
				$(this).attr('data-index', index);
				$(this).click(function(){
					$('.circle li').removeClass('activeCircle');
					$(this).addClass('activeCircle');
					var thumbAtr = $(this).attr('data-index');
					$('#images #image').each(function(){
						var imageAtr =  $(this).attr('data-index');
						if(thumbAtr == imageAtr)
						{
							$('#images #image').stop(true, false).animate({opacity:0,zIndex:0},400);
							$(this).css({display:'block',zIndex:1}).stop(true, false).animate({opacity:1},400);
							return false;
						}
					})
						clearInterval(interval);
						interval = '';
						setTimeout(function(){
							startInterval();	
						}, _koSlideSpeed/2);
					})
				
			})
		}
    }

	/*global arrow click*/
	
	$(document).on('click', '#images .arRight', function(){
		$('#images #image').each(function(){
			if($(this).css('opacity') != 0){
				var imIndex = $(this).attr('data-index');
				var imLength = $('#images>#image').length;
				if(imIndex < imLength-1)
				{
					$('#images #image').stop(true, false).animate({opacity:0,zIndex:0},400);
					$(this).next().css({display:'block',zIndex:1}).stop(true, false).animate({opacity:1},400);
				}
				if(_thumbnails){
					if(_thumbTYpe == 'image')
					{
						$('#thumbnails #thumb').each(function(){
							var len = $('#thumbnails #thumb').length-1; 
							var thIndex =  $(this).attr('data-index');
							if($(this).hasClass('active') && $(this).index() < len && imIndex == thIndex){
								$('#thumbnails #thumb').removeClass('active');
								$(this).next().addClass('active');
								return false;
							}
						})
					}
					if(_thumbTYpe == 'circle')
					{
						$('.circle li').each(function(){
							var len = $('.circle li').length-1; 
							var thIndex =  $(this).attr('data-index');
							if($(this).hasClass('activeCircle') && $(this).index() < len && imIndex == thIndex){
								$('.circle li').removeClass('activeCircle');
								$(this).next().addClass('activeCircle');
								return false;
							}
						})
					}
				}
			}
		})
		
	});
	$(document).on('click', '#images .arLeft', function(){
		$('#images #image').each(function(){
			if($(this).css('opacity') != 0){
				var imIndex = $(this).attr('data-index');
				var imLength = $('#images>#image').length;
				if(imIndex > 0)
				{
					$('#images #image').stop(true, false).animate({opacity:0,zIndex:0},400);
					$(this).prev().css({display:'block',zIndex:1}).stop(true, false).animate({opacity:1},400);
				}
				if(_thumbnails)
				{
					if(_thumbTYpe == 'image')
					{
						$('#thumbnails #thumb').each(function(){
							var thIndex =  $(this).attr('data-index');
							if($(this).hasClass('active') && $(this).index() > 0 && thIndex == imIndex){
								$('#thumbnails #thumb').removeClass('active');
								$(this).prev().addClass('active');
								return false;
							}
						})
					}
					else if(_thumbTYpe == 'circle')
					{
						$('.circle li').each(function(){
							var thIndex =  $(this).attr('data-index');
							if($(this).hasClass('activeCircle') && $(this).index() > 0 && thIndex == imIndex){
								$('.circle li').removeClass('activeCircle');
								$(this).prev().addClass('activeCircle');
								return false;
							}
						})
					}
					
				}
			}
		})
	})
	
	/*auto slide */
	if(_koSlideAuto){
		var interval = '';
		var startInterval = function(){
			if(interval !== '')
			return;
		
			interval = setInterval(function() {
				
				$('#images #image').each(function(){
					if($(this).css('opacity') != 0){
						var imIndex = $(this).attr('data-index');
						var imLength = $('#images>#image').length;
						if(imIndex < imLength-1)
						{
							$('#images #image').stop(true, false).animate({opacity:0,zIndex:0},400);
							$(this).next().css({display:'block',zIndex:1}).stop(true, false).animate({opacity:1},400);
							if(_thumbnails){
								if(_thumbTYpe == 'image')
									$('#thumbnails #thumb').each(function(){
										if($(this).hasClass('active')){
											var thIndex =  $(this).attr('data-index');
											if(thIndex == imIndex){
												$('#thumbnails #thumb').removeClass('active');
												$(this).next().addClass('active');
												return false;
											}
											else
											{
												$('#thumbnails #thumb').removeClass('active');
												$('#thumbnails #thumb').eq(1).addClass('active');
											}
										}
									})
								}
								if(_thumbTYpe == 'circle')
								{
									$('.circle li').each(function(){
										if($(this).hasClass('activeCircle')){
											var thIndex =  $(this).attr('data-index');
											if(thIndex == imIndex){
												$('.circle li').removeClass('activeCircle');
												$(this).next().addClass('activeCircle');
												return false;
											}
											else
											{
												$('.circle li').removeClass('activeCircle');
												$('.circle li').eq(1).addClass('activeCircle');
											}
										}
									})
								}
						}
						else
						{
							$('#images #image').stop(true, false).animate({opacity:0,zIndex:0},400);
							$('#images #image').eq(0).css({display:'block',zIndex:1}).stop(true, false).animate({opacity:1},400);
						}
					}
				})
			}, _koSlideSpeed);
		};startInterval();
		$(document).on('click', '#images .arLeft, #images .arRight', function(){
			clearInterval(interval);
			interval = '';
			setTimeout(function(){
				startInterval();	
			}, _koSlideSpeed/2);
		})
		
	}
	
    /*other addons files*/

    $('#thumb img').resizecrop({
        width:_koWidth/10,
        height:_koWidth/10,
        vertical:   "center",
        horizontal: "center",
        wrapper:    "div"
    });
});




