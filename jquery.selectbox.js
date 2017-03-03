;(function($){
$.fn.customSelect = function (){
	$(this).each( function(){
		$(this).addClass("hidden")

		// vars
		var select_cont = $("<div class='select_cont'>"),
			div_select = $("<div class='div_select'>"),
			num = $(this).find("option").length,
			options = $(this).find("option"),
			that = $(this),
			opened = false

		// create select dropdown emulate
		div_select[0].addEventListener("click", function(){
			if(opened == false){
				$(this).height((num+1)*28 + "")
				select_cont.addClass("opened")
				opened = true
			}else{
				$(this).height(28 + "")
				select_cont.removeClass("opened")
				opened = false
			}

		})

		if(num > 0){
			var i = 0,
				selected = null
			while(i < num){
				// create option emulate
				var div_option = 
					$("<div class='div_option "+ ((options.eq(i).is(':selected')) ? ' selected' : '' ) +"' data-value='"+ options.eq(i).val() + "'>").html(options.eq(i).text())
					
				// save selected index
				options.eq(i).is(':selected') ? selected = i : null 
				// add events to emuled options
				div_option[0].addEventListener("click", function(){
					// clear selected attribute
					that.find("option").removeAttr("selected")
					;(function(x){
						var i2 = 0
						var ind = $(x).data("value")
						/*  add selected attr to true option  */
						while(i2 < num){
							if(options.eq(i2).val() == ind){
								that.find("option").eq(i2).attr("selected", "selected")
							}
							i2++;
						}
						// move emuled option to begin, like option in select
						$(x).parent().find(".div_option").eq(0).remove()
						$(x).clone(true).prependTo(div_select)
						$(".div_option").removeClass("selected")
						$(x).addClass("selected")
					})(this)
				})
				// Add 1st default option, empty by default or selected if isset
				if(i == 0 && selected == null){
					div_select.prepend(div_option.clone(true)) 
				}else if(selected != null){
					// Remove previously added def option  
					div_select.find(".div_option").eq(0).remove()
					// Add default selected option to begin
					div_select.prepend(div_option.clone(true).removeClass("selected"))
					selected = null 
				}
				// add created emule option in emuled select
				div_select.append(div_option) 

				i++;

			}// end while

		}// endif

		select_cont.append(div_select)
		select_cont.insertBefore($(this))
	})
}
})(jQuery);