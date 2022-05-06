//  Ivan Eremeev - 2022
//  Telegram: IvanMessage
//  Email: ivan.frontcoder@gmail.com

$(document).ready(function () {

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку.
	function menuScroll() {
		var btn = $('a[href^="#"]'),
				time = 500,
				menu = $('#menu'),
				btnMenu = $('[data-drop="menu"]'),
				body = $('body');
		btn.click( function(){
			var scroll_el = $(this).attr('href');
			if ($(scroll_el).length != 0) {
			$('html, body').animate({ scrollTop: $(scroll_el).offset().top - 50 }, time);
				btn.removeClass('active');
				$(this).addClass('active');
				menu.removeClass('open');
				btnMenu.removeClass('active');
				body.removeClass('lock');
			}
			return false;
		});
	};
	menuScroll();

	// Stiky menu // Липкое меню.
	function stikyMenu(header) {
		headerTop = header.offset().top;
		init();
		$(window).scroll(function(){
			init();
		});
		function init() {
			if ($(window).scrollTop() > headerTop + 150) {
				header.addClass('stiky');
			} else if ($(window).scrollTop() < headerTop + 5) {
				header.removeClass('stiky');
			}
		}
	};
	stikyMenu($('#header'));

	// Модальное окно
	const body = $('body');
	const page = $('.page');
	function modal(modal) {
		$('.modal-trigger').on('click', function(e) {
			e.preventDefault();
			var $this = $(this),
					data = $this.data('modal'),
					thisModal = $(data);
			modalShow(thisModal);
		});
	};
	// Открытие модального окна
	function modalShow(thisModal) {
		var modalClose = thisModal.find($('.modal_close'));
		thisModal.addClass('open');
		body.addClass('lock');
		page.addClass('blur');
		modalClose.on('click', function() {
			modalHide(thisModal);
		});
		thisModal.on('click', function(e) {
			if (thisModal.find('.modal_body').has(e.target).length === 0) {
				modalHide(thisModal);
			}
		});
	};
	// Закрытие модального окна
	function modalHide(thisModal) {
		thisModal.removeClass('open');
		body.removeClass('lock');
		page.removeClass('blur');
	};
	modal();

	// Делает активным пункт меню при скролле до блока
	function menuItemActive(menu) {
		var lastId,
		topMenu = menu,
		topMenuHeight = topMenu.outerHeight(),
		menuItems = topMenu.find("a"),
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});
		menuItems.click(function(e){
			var href = $(this).attr("href"),
					offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight - 50;
			$('html, body').stop().animate({ 
					scrollTop: offsetTop
			}, 300);
			e.preventDefault();
		});
		$(window).scroll(function(){
			var fromTop = $(this).scrollTop()+topMenuHeight;
			var cur = scrollItems.map(function(){
				if ($(this).offset().top < fromTop + 55)
					return this;
			});
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";
			if (lastId !== id) {
					lastId = id;
					menuItems
						.removeClass("active")
						.filter("[href='#"+id+"']").addClass("active");
			}                   
		});
	};
	menuItemActive($('#menu'));

	// Паралакс относительно курсора мыши
	function parallaxMove(parallax) {
		if (parallax.length) {
			parallax.each(function () {
				var $window = $(window),
					$this = $(this),
					direction = $this.data('direction'),
					intensity = $this.data('intensity'),
					speed = $this.data('speed'),
					revers = $this.data('revers');
				if (!direction) {
					direction = 'xy';
				}
				if (!intensity) {
					intensity = 3;
				}
				if (!speed) {
					speed = 100;
				}
				if (!revers) {
					revers = false;
				}
				$this.css({ transition: (speed / 1000) + 's ease-out'});
				$window.mousemove(function (event) {
					var left = event.clientX,
						top = event.clientY,
						windowWidth = $window.width(),
						windowHeight = $window.height();
					if (revers) {
						moveX = ((left - windowWidth / 2) * intensity / 100 * -1).toFixed(),
							moveY = ((top - windowHeight / 2) * intensity / 100 * -1).toFixed();
					} else {
						moveX = ((left - windowWidth / 2) * intensity / 100).toFixed(),
							moveY = ((top - windowHeight / 2) * intensity / 100).toFixed();
					}
					inVisible($this);
					function inVisible(element) {
						var topScroll = $(document).scrollTop(),
							screenHeight = $(window).height(),
							bottomScroll = topScroll + screenHeight,
							elementHeight = element.height(),
							elementTop = element.offset().top,
							elementBottom = elementTop + elementHeight;
						if (elementTop < bottomScroll && elementBottom > topScroll) {
							if (direction == 'xy') {
								$this.css({ transform: 'translateX(' + moveX + 'px) translateY(' + moveY + 'px)' });
							}
							else if (direction == 'x') {
								$this.css({ transform: 'translateX(' + moveX + 'px)' });
							}
							else if (direction == 'y') {
								$this.css({ transform: 'translateY(' + moveY + 'px)' });
							}
						}
					};
				});
			});
		}
	};
	parallaxMove($('.js-parallaxMouse'));

	// Меню
	function dropMenu(btn) {
		var $this = undefined,
			drop = undefined,
			close = $('.js-menu-close'),
			body = $('body');
		btn.on('click', function () {
			$this = $(this);
			drop = $('#' + $this.data('drop'));
			$this.toggleClass('active');
			drop.toggleClass('open');
			body.toggleClass('lock');
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('active');
					drop.removeClass('open');
					body.removeClass('lock');
				}
			});
		})
		close.on('click', function () {
			$('[data-drop="' + $(this).data('drop') + '"]').removeClass('active');
			$('#' + $(this).data('drop')).removeClass('open');
			body.removeClass('lock');
		})
	}
	dropMenu($('.js-menu-btn'));

	// Swiper Slider
	const vacanciesSlider = new Swiper('#vacanciesSlider', {
		slidesPerView: 1,
		spaceBetween: 8,
		navigation: {
			nextEl: '.vacancies__arrow--next',
			prevEl: '.vacancies__arrow--prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 20
			}
		}
	});

	function translate() {
		var string = $('[data-translate]');
		var btn = $('[data-lang');
		var btnEn = $('[data-lang="en"]');
		var btnRu = $('[data-lang="ru"]');
		btn.on('click', function () {
			if (!$(this).hasClass('active') && $(this).data('lang') == 'ru') {
				btnEn.removeClass('active');
				btnRu.addClass('active');
				string.each(function () {
					if ($(this).parent().hasClass('input')) {
						dataToPlaceholder($(this));
					} else {
						dataToText($(this));
					}
				})
			} else if (!$(this).hasClass('active') && $(this).data('lang') == 'en') {
				btnRu.removeClass('active');
				btnEn.addClass('active');
				string.each(function () {
					if ($(this).parent().hasClass('input')) {
						dataToPlaceholder($(this));
					} else {
						dataToText($(this));
					}
				})
			} else {
				return false;
			}
		})
		function dataToText(element) {
			var data = element.data('translate');
			var text = element.html();
			element.html(data);
			element.data('translate', text);
		}
		function dataToPlaceholder(element) {
			var data = element.data('translate');
			var placeholder = element.attr('placeholder');
			element.attr('placeholder', data);
			element.data('translate', placeholder);
		}
	}
	translate();

	// Простая проверка форм на заполненность и отправка аяксом
	function formSubmit() {
		$("[type=submit]").on('click', function (e) {
			e.preventDefault();
			// Заводим переменные
			// Ищем родительскую фору для того чтобы манипулировать элементами находящимися только внутри неё
			var form = $(this).closest('form');
			// Запоминаем путь к php обработчику формы
			var url = form.attr('action');
			// Собираем все данные с полей формы для отправки
			var form_data = form.serialize();
			// Выбираем все обязательные поля по атрибуту required
			var field = form.find('[required]');

			// Задаем количество пустых полей по умолчанию
			empty = 0;

			// Перебираем каждое обязательное поле
			field.each(function () {
				// Если поля пустые
				if ($(this).val() == "") {
					// Добавляем класс invalid
					$(this).addClass('invalid');
					// Увеличиваем счеткик пустых полей
					empty++;
					// Если поля не пустые
				} else {
					// Убираем класс invalid
					$(this).removeClass('invalid');
					// Добавляем класс valid если необходимо для стилизации
					// $(this).addClass('valid');
				}
			});

			// Можно проверить пересчет пустых полей в консоли
			// console.log(empty);

			// Если пустых полей больше 0
			if (empty > 0) {
				// Останавливаем работу скрипта запрещая отправку формы
				return false;
				// Если пустых полей нет
			} else {
				// Запускаем отправку формы без перезагрузки страницы
				$.ajax({
					// Используем переменные в параметрах для отправки формы
					url: url,
					type: "POST",
					dataType: "html",
					data: form_data,
					// При успешной отправке
					// В аргумент response(произвольное название) можно записать и видеть результат ответа сервера
					success: function (response) {
						console.log(response);
						$('.callback__success').fadeIn();
						setTimeout(() => {
							modalHide($('#callback'));
							$('.callback__success').fadeOut();
						}, 3000);
					},
					// При ошибке отправки
					error: function (response) {
						console.log(response);
						$('.callback__error').fadeIn();
						setTimeout(() => {
							$('.callback__error').fadeOut();
						}, 3000);
					}
				});
			}
		});
		// Убираем класс invalid при снятии фокуса если поле не пустое
		$('[required]').on('blur', function () {
			if ($(this).val() != '') {
				$(this).removeClass('invalid');
			}
		});
	}
	formSubmit();

});