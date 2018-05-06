/*
 * @Author: pickle_tiger 
 * @Date: 2018-05-05 09:54:56 
 * @Last Modified by: pickle_tiger
 * @Last Modified time: 2018-05-05 10:41:54
 */

/*
 * home-head
 */
$(function() {
	/**
	 *  head
	 */
	head = "<nav class='navbar navbar-default' role='navigation' >";
	head += "<div class='container-fluid'><div class='navbar-header head-name' ><a class='navbar-brand' href='#'>Meng Team</a></div>";
	head += "<div id='head-icon' class='pull-right'><button type='button' class='btn btn-default btn-lg icon-background' ><span class='glyphicon glyphicon-comment'></span><span class='badge badge-color'>1</span></button>";
	head += "<button type='button' class='btn btn-default btn-lg icon-background' ><span class='glyphicon glyphicon-envelope'></span><span class='badge badge-color' >1</span></button>";
	head += "<button type='button' class='btn btn-default btn-lg icon-background' ><span class='glyphicon glyphicon-user'></span><span class='badge badge-color' >2</span></button>";
	head += "</div></div></nav>";
	$("#head").html(head);

	/***
	 * siderbar
	 * 
	 */
	siderbar = '<ul class="siderul"><li><a href="#home"><i class="glyphicon glyphicon-home icon-xm" ></i> 项目管理</a><a id="sonli" href="#home"> 登记</a><a id="sonli" href="#home"> 项目管理</a></li>';
	siderbar += '<li><a  href="#news"><i class="glyphicon glyphicon-send icon-xm" ></i> OA办公</a><a id="sonli" href="#home"> 消息提醒</a><a id="sonli" href="#home"> 下载文件</a></li>';
	siderbar += '<li><a  href="#contact"><i class="glyphicon glyphicon-list-alt icon-xm" ></i> 资料共享</a></li>';
	siderbar += '<li><a  href="#about"><i class="glyphicon glyphicon-indent-left icon-xm" ></i> 设置</a></li>';
	siderbar += '<li><a  href="#exit"><i class="glyphicon glyphicon-log-out icon-xm" ></i> Exit</a></li></ul>';
	$("#siderbar").html(siderbar);

	//子导航隐藏显示
	$("li").click(function() {
		/**
		 * toggle()切换子导航栏隐藏/显示状态;this指当前元素;children()指当前元素的子元素 ;sibling()指当前元素的同胞元素；parent()指当前元素的父元素;
		 * tip:由于不清楚为什么加toggle()加时间参数后,子导航栏的样式变了，因此不用该函数（已找到原因：toggle设置显示时会设置display的参数,而block的参数与hide()冲突）
		 */
		//判断子导航栏是否属于隐藏状态，如不是，将其设为block(块状元素)
		if($(this).children("#sonli").is(":hidden")) {
			$(this).children("#sonli").show(500, function() {
				$(this).css('display', 'block');
			});
		} else {
			$(this).children("#sonli").hide(500);
			$(this).children("#sonli").css('display', 'block');
		}

		$(this).siblings("li").children("#sonli").hide(500);
	});
	/***
	 * table 控件
	 */
	//测试用tr
	for(var i=0;i<100;i++){
		tr = '<tr><td>'+i+'</td><td>项目名称</td><td>项目委托方</td><td>项目相关信息</td><td>负责人</td></tr>';
		$('.body-table-content tbody').append(tr);
	}
	
	
	tr_length = $(".body-table tr").length - 1;
//	alert(tr_length);
	page_trnumber = 8; //控制行数的变量
	page_li = Math.ceil(tr_length / page_trnumber); //计算实际分页的数量,Math.ceil:数据往上去整，当数据为整数时，不变
	index = 1;
	
	
	//生成第一页数据及表头
	page_lifirst();	
	$("#Previous").click(function(){
//		console.log('上一页')
		if(index==1){
			
		}else{
			index = index-1;
			pagelist(index, page_trnumber);
		}
	})
	$("#Next").click(function(){
//		console.log('下一页')
		if(index==page_li){
			
		}else{
			index = index+1;
			pagelist(index, page_trnumber);
		}
	})
	$("#pageGo").click(function(){
//		alert($(".paging input").val());
//		console.log('Go')
		var go = $(".paging input").val();
		pagelist(go, page_trnumber);
	})
})
/**
 * 生成第一页数据及表头及分页标签
 */
function page_lifirst() {
	$(".body-table-content tr").hide();
	$(".body-table-content tr:eq(0)").show();
	for(var i = 1; i <= page_trnumber; i++) {
		$(".body-table-content tr:eq(" + i + ")").show();
	}
	page_list='<ul class="pagination "><li id="Previous" ><a >上一页</a></li><li id="Next"><a >下一页</a></li><input class="skip"/> /'+page_li+' <button id="pageGo" >Go</button></ul>';
	$(".paging").append(page_list);
}

/**
 *  分页重新排列
 */
function pagelist(index, page_trnumber) {
	$(".body-table-content tr:first").nextAll().hide();
	for(var i = 1 + (index - 1) * page_trnumber; i <= index * page_trnumber; i++) {
		$(".body-table-content tr:eq(" + i + ")").show();
	}
}