;(function($){
	// стандартный способ расширить апи jQuery это добавление к прототипу объекта свой метод
$.fn.customSelect = function (){
	$(this).each( function(){
		// прячем ориг. селект
		$(this).addClass("hidden")

		// создаем dom элемент-эмуляцию селекта, определяем переменные
		var select_cont = $("<div class='select_cont'>"),
			div_select = $("<div class='div_select'>"),
			num = $(this).find("option").length,
			options = $(this).find("option"),
			that = $(this),
			opened = false

		// создаем событие открытия селекта
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

		// если есть в селекте оптионы
		if(num > 0){
			var i = 0, // счетчик
				selected = null
			while(i < num){
				// создаем dom элемент эмуляцию option
				var div_option = 
					$("<div class='div_option "+ ((options.eq(i).is(':selected')) ? ' selected' : '' ) +"' data-value='"+ options.eq(i).val() + "'>").html(options.eq(i).text())
					
				// если есть ориг. оптион с атрибутом selected, эмуляция оптиона будет в начале
				options.eq(i).is(':selected') ? selected = true : null 
				// добавляем обработчики для нажатия на оптион
				div_option[0].addEventListener("click", function(){
					// очищаем выбранный элемент в ориг. селекте
					that.find("option").removeAttr("selected")
					;(function(x){
						var i2 = 0
						var ind = $(x).data("value")
						/*  делаем выбранным оптоин в ориг. селекте  */
						while(i2 < num){
							if(options.eq(i2).val() == ind){
								that.find("option").eq(i2).attr("selected", "selected")
							}
							i2++;
						}
						// перемещаем эмуляцию оптоиона наверх как в обычном селекте
						$(x).parent().find(".div_option").eq(0).remove()
						// клон выбранного оптоина наверх
						$(x).clone(true).prependTo(div_select)
						// очищаем выбранный элменет в эмулир. селекте
						$(".div_option").removeClass("selected")
						// 
						$(x).addClass("selected")
					})(this)
				})
				// Первый элемент в эмулир. селекте будет 1-й оптион или выбранный оптион с параметром selected
				if(i == 0 && selected == null){
					div_select.prepend(div_option.clone(true)) 
				}else if(selected != null){
					// Удаляем оптион по умолчанию  
					div_select.find(".div_option").eq(0).remove()
					// Перемещаем клон эмуляции оптиона наверх
					div_select.prepend(div_option.clone(true).removeClass("selected"))
					selected = null 
				}
				// добавляем эмуляцию оптиона к эмул.селекта
				div_select.append(div_option) 

				i++;

			}// end while

		}// endif

		// добавляем эмул. селекта в отд. контейнер
		select_cont.append(div_select)
		// кастомиз. селект вставляем перед скрытым ориг. селектом
		select_cont.insertBefore($(this))
	})
}
})(jQuery);