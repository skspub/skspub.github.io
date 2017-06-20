/*document.title = "SK securities";*/

$(document).ready(function () {
	
	/*
	*	faq toggle button
	*/
	$('[data-common-toggle]').on('click', function() {
   		var klass = $(this).data('common-toggle');
    	$(this).parent().toggleClass(klass);
	});

	/*
	*	checkbox only one check
	*/
	$('[data-common-check-group]').on('oneCheck', function() {
		var scope = $(this);
		var target = scope.find('[data-common-check]');

		target.on('click', function() {
			var targetId = $(this).attr('id');
			
			target.each(function(idx, item){
				var id = $(item).attr('id');
				if (targetId == id) {
					return;
				} else {
					$(item).prop('checked', false);
				}
			});
		});
	}).trigger('oneCheck');

	/* 테이블 타입 버튼 리스트 모서리 둥글게 */
	$('.table-list').each(function(index, item) {

		var themeName = $(item).data('common-theme');

		$(item).on('tableRefresh', function() {

			$(item).on('tableListRadius', function() {

				//initialize
				$(this).find('.empty').remove();

				var cell = $(this).find('button');
				cell.removeAttr('style');

				var length = $(this).find('button').length;
				var emptyCell = '<span class="empty" />';

				//빈칸 채우기
				if ( length % 3 < 3 ) {
					switch(length % 3) {
						case 1: $(this).append(emptyCell).append(emptyCell);
						break;
						case 2: $(this).append(emptyCell);
						break; 
					}
				}

				var target = $(this).find('> *');
				var targetArr = [
					target.eq(0),
					target.eq(2),
					target.eq(target.length - 3),
					target.eq(target.length - 1)
				];
				var direction = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

				direction = direction.map(function(item) {
					return 'border-' + item + '-radius';
				});

				// border-radius 설정
				targetArr.forEach(function(item, idx, arr) {
					$(item).css(direction[idx], '4px');
				});

			}).trigger('tableListRadius');

			//toggle
			$(item).find('button').on('click', function() {
				$(this).addClass(themeName)
					.siblings('button').removeClass(themeName);
				$(item).on('tableListRadius');
			});

		}).trigger('tableRefresh');

	});

	/*
	*	tab
	*/
	$('[data-common-tab]').each(function(idx, item) {

		var scope = $(item);
		var tabScope = scope.find('.tab');
		var pageScope = scope.find('.tab-page-group');
		var themeName = $(item).data('common-tab');

		//tab button
		tabScope.find('button').on('click', function() {

			var idx = $(this).parent().index();
			
			// tab 전환
			$(this).addClass(themeName)
				.parent().siblings().find('button').removeClass(themeName);

			//page 전환
			pageScope.find('.tab-page').eq(idx).addClass('active')
				.siblings().removeClass('active');

		});

	}).trigger('tabActive');


	// 금융사 list tab rounding refresh
	$('[data-fc-refresh] .tab button').on('click', function() {
		$('.table-list').trigger('tableListRadius');
	});

	/* input placehoder
	$(".input_hn").not(":password").each(function(idx, item) {
		$(item).focusin(function() {
			$(this).next(".lab").animate({top:"0", fontSize:"13px"}, 300);
		}).focusout(function(){
			if ($(item).val().length <= 0) {
				$(this).next(".lab").animate({top:"23px", fontSize:"16px"}, 300);
			}
		})
	});*/


	/*
	*	전체 동의
	*/
	$('[data-common-all-check]').on('click', function() {
		var $this = $(this);
		var childNode = $('[data-common-ac-group]').find('[data-common-ac-child]');
		var state = $(this).prop('checked');

		childNode.each(function(idx, item) {
			if ( state ) {
				$(item).hasClass('btn-white') ? $(item).removeClass('btn-white').addClass('tm01') : false;
			} else {
				$(item).hasClass('tm01') ? $(item).removeClass('tm01').addClass('btn-white') : false;
			}
		});

		$this.attr('data-common-all-check', $(this).prop('checked'));

	});

	//$('[data-common-ac-group] [data-common-ac-child]').trigger("checkValid")
	$('[data-common-ac-group] [data-common-ac-child]').on("checkValid", function() {

		$(this).on("click", function() {
			var cnt = 0;
			var targetGroup = $(this).parents("[data-common-ac-group]").find("[data-common-ac-child]");
			
			// $(this).toggleClass("tm01", "btn-white");

			targetGroup.each(function(idx, item) {
				if ( $(item).hasClass("tm01") ) {
					cnt += 1;
				}
			});

			if ( targetGroup.length == cnt ) {
				$('[data-common-all-check]').prop("checked", true);
			}

		});

	}).trigger("checkValid");

});