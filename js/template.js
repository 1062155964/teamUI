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
	siderbar = '<ul class="siderul"><li><a href="#home"><i class="glyphicon glyphicon-home icon-xm" ></i> 项目管理</a><a id="sonli" href="#home"> 项目登记</a><a id="sonli" href="#home"> 项目管理</a></li>';
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
	
	
	if($(".body-content>.body-table").length>0){
		//测试用tr
		for(var i=0;i<100;i++){
			tr = '<tr><td>'+i+'</td><td>项目名称</td><td>项目委托方</td><td>项目相关信息</td><td>负责人</td></tr>';
			$('.body-table-content tbody').append(tr);
		}
		Table();
	}
	
	
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
	if($(".body-table-content tr:visible").length==1){  //判断是否有显示行，如无代表该页无数据
		alert('暂无数据');
	}
	
	body_search = '<div class="body-search">查询: <input /></div><hr style="top:25px;position: relative;"></hr>';  //查询
	$(".body-content").prepend(body_search);
}

/**
 *  分页重新排列
 */
function pagelist(index, page_trnumber) {
	$(".body-table-content tr:first").nextAll().hide();
	for(var i = 1 + (index - 1) * page_trnumber; i <= index * page_trnumber; i++) {
		$(".body-table-content tr:eq(" + i + ")").show();
	}
//	console.log($(".body-table-content tr:contains('委托方')").length);   //tr:contains('val') 找到tr中文本内容有val的项
//	alert($(".body-table-content tr:visible").length);
	if($(".body-table-content tr:visible").length==1){  //判断是否有显示行，如无代表该页无数据
		alert('暂无数据');
	}
}

/**
 * search框触发
 */
function searchF(search_index,search_content){
	$(".body-table-content tr:first").nextAll().hide();
	for(var y = 0 + (search_index - 1) * page_trnumber; y <= search_index * page_trnumber-1; y++){
		if($(".body-table-content tr:contains("+search_content+"):eq("+y+")").text()!=null){
			$(".body-table-content tr:contains("+search_content+"):eq("+y+")").show();	
		}
//		alert($(".body-table-content tr:contains("+search_content+"):eq("+0+")").text());  //判断目标tr是否是有效tr
	}
	if($(".body-table-content tr:visible").length==1){  //判断是否有显示行，如无代表该页无数据
		alert('暂无数据');
	}
}

//Table
function Table(){
			tr_length = $(".body-table tr").length - 1;
	//	alert(tr_length);
		page_trnumber = 8; //控制行数的变量
		page_li = Math.ceil(tr_length / page_trnumber); //计算实际分页的数量,Math.ceil:数据往上去整，当数据为整数时，不变
		index = 1;				//
		search_index = 1;    	
		
		//生成第一页数据及表头
		page_lifirst();	
		//分页标签
		page_list='<ul class="pagination "><li id="Previous" ><a >上一页</a></li><li id="Next"><a >下一页</a></li><input class="skip"/><li id="page_li"> /'+page_li+'</li></div><button id="pageGo" >Go</button></ul>';  
		$(".paging").append(page_list);
		
		$("#Previous").click(function(){
	//		console.log('上一页')
			var search_content = $(".body-search input").val();  //判断当前search框内是否有值
			if(search_content!=''){
				if(search_index==1){
					
				}else{
					search_index = parseInt(search_index);      //将search_index先转化为整数
					search_index = search_index-1;
	//				alert(search_index);
					searchF(search_index, search_content);
				}
			}else{
				if(index==1){
					
				}else{
					index = parseInt(index); 	 //将index先转化为整数
					index = index-1;
		//			console.log(index)
					pagelist(index, page_trnumber);
				}	
			}		
		})
		$("#Next").click(function(){
	//		console.log('下一页')
			var search_content = $(".body-search input").val();  //判断当前search框内是否有值
	//		alert(search_content);
			if(search_content!=''){
				if(search_index==search_li){
				
				}else{
					search_index = parseInt(search_index);      //将search_index先转化为整数
					search_index = search_index+1;
	//				alert(search_index);
					searchF(search_index, search_content);
				}
			}else{
				if(index==page_li){
				
				}else{
					index = parseInt(index);      //将index先转化为整数
					index = index+1;
		//			console.log(index)
					pagelist(index, page_trnumber);
				}
			}
			
		})
		
		$("#pageGo").click(function(){
	//		alert($(".paging input").val());
	//		console.log('Go')
			var search_content = $(".body-search input").val();  //判断当前search框内是否有值
			var go = $(".paging input").val();					//获取跳转页面input框内的值
			if(search_content!=''){
				if(go<1||go>search_li||go==null){
				
				}else{
					search_index = go;
					searchF(search_index, search_content);
					$(".paging input").val('');
				}	
			}else{
				if(go<1||go>page_li||go==null){
				
				}else{
					index = go;
					pagelist(index, page_trnumber);
					$(".paging input").val('');
				}	
			}
			
		})
		$(".body-search input").change(function(){
			var search_content = $(this).val();
			if(search_content==''){
	//			alert(search_content);
				search_index = 1;   //当search 框change时，search_index初始化
				index =1;	//当search 框重新为空时，index初始化
				page_lifirst();
				$("#page_li").text(" /"+page_li);
			}else{
	//			alert(search_content);
				search_index = 1;   //当search 框change时，search_index初始化
				search_tr = $(".body-table-content tr:contains("+search_content+")").length;   //获取查询到的条目数
				search_li = Math.ceil(search_tr/page_trnumber);   //计算查询分页的数量,Math.ceil:数据往上去整，当数据为整数时，不变
				$("#page_li").text(" /"+search_li);
				searchF(search_index,search_content);
			}
		})
	}