	$.fn.customSelect = function (){
		$(this).each( function(){
			$(this).addClass("hidden")

			var select_cont = $("<div class='select_cont'>"),
				div_select = $("<div class='div_select'>"),
				num = $(this).find("option").length,
				options = $(this).find("option"),
				that = $(this),
				opened = false

			// create select dropdown emulate
			div_select[0].addEventListener("click", function(){
				if(opened == false){
					$(this).height(num*28 + "")
					select_cont.addClass("opened")
					opened = true
				}else{
					$(this).height(28 + "")
					select_cont.removeClass("opened")
					opened = false
				}

			})

			if(num > 0){
				var i = 0
				while(i < num){
					// create option emulate
					var div_option = $("<div class='div_option' data-value='"+ options.eq(i).val() + "'>").html(options.eq(i).text())

					div_option[0].addEventListener("click", function(){
						// clear selected attribute
						that.find("option").removeAttr("selected")
						;(function(x){
							var i2 = 0
							var ind = $(x).data("value")
							/*  add selected attr to option  */
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
					// add all created option emules in select
					div_select.append(div_option)
					i++;
				}
			}
			select_cont.append(div_select)
			select_cont.insertBefore($(this))
		})
	}

