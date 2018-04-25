/*
 * home-head
 */
$(function(){
	/**
	 *  head
	 */
	head ="<nav class='navbar navbar-default' role='navigation' >";
	head+="<div class='container-fluid'><div class='navbar-header'><a class='navbar-brand' href='#'>Meng Team</a></div>";
	head+="<div id='head-icon' class='pull-right'><button type='button' class='btn btn-default btn-lg icon-background' ><span class='glyphicon glyphicon-comment'></span><span class='badge '>1</span></button>";
	head+="<button type='button' class='btn btn-default btn-lg icon-background' ><span class='glyphicon glyphicon-envelope'></span><span class='badge' >1</span></button>";
	head+="<button type='button' class='btn btn-default btn-lg icon-background' ><span class='glyphicon glyphicon-user'></span><span class='badge' >2</span></button>";
	head+="</div></div></nav>";
	$("#head").html(head);
	
	/***
	 * sidebar
	 * 
	 */
	//子导航隐藏显示
	$("li").click(function(){
		/**
		 * toggle()切换子导航栏隐藏/显示状态;this指当前元素;children()指当前元素的子元素 ;
		 * tip:由于不清楚为什么加toggle()加时间参数后,子导航栏的样式变了，因此不用该函数（已找到原因：toggle设置显示时会设置display的参数,而block的参数与hide()冲突）
		 */
		//判断子导航栏是否属于隐藏状态，如不是，将其设为block(块状元素)
		if($(this).children("#sonli").is(":hidden")){  
			$(this).children("#sonli").show(500,function(){      
				$(this).css('display','block');
			});
		}else{
			$(this).children("#sonli").hide(500);
			$(this).children("#sonli").css('display','block');
		}
		 
		$(this).siblings("li").children("#sonli").hide(500); 
	})
})
