﻿/***
 * 获得活动列表
 */
function getActivityList(){
    $.ajax({
        url:"/activity.do",
        method:"get",
        success:function (data) {
            if(data=='fail'){
                location.href='login.html';
                return;
            }
            for(var i=0;i< data.length;i++){
                var a = data[i];
                var color ='bg-primary';
                switch (i % 4){
					case 0:
						color = 'bg-primary';
						break;
                    case 1:
                        color = 'bg-inverse';
                        break;
                    case 2:
                        color = 'bg-danger';
                        break;
                    case 3:
                        color = 'bg-warning';
                        break;
				}
                $('#col_'+i % 3).append('<div id="contentfeeds8" class="panel panel-animated panel-default animated fadeInUp" style="visibility: visible;"><div class="panel-body bordered-bottom"><div class="no-padding jumbotron '+color+'"><p class="lead"><a href="activity_detail.html#'+a.id+'">'+a.title+'</a></p></div><p class="text-muted">'+a.body+'</p><div class="text-muted"><small style="color:red;" class="endTime">活动结束时间:0</small></div></div></div>');
           		var endTime = new Date(a.endTime).getTime() - new Date().getTime();
           		$("#col_"+(i % 3)+" small:last").data("endTime",endTime);
            }
        }
    });
    //开启倒计时
	setInterval(countDown,1000);
}
function countDown() {
	var smalls =$('#side_right .endTime');
	$(smalls).each(function () {
		var endTime =$(this).data("endTime");
		if(endTime > 0){
			var time =endTime;
			var day = parseInt(time/(1000*60*60*24));
			time %=(1000*60*60*24);
			var hours = parseInt(time/(1000*60*60));
			time %=(1000*60*60);
			var minute = parseInt(time/(1000*60));
			time %=(1000*60);
			var second = parseInt(time/1000);
			$(this).html('距离活动结束还有：'+day+'天'+hours+'时'+minute+'分'+second+'秒');
			$(this).data("endTime",(endTime-1000));
		}else{
			$(this).html('活动已结束');
			var a =$(this).parent().parent().find('a');
			a.attr("href","javascript:return false");
			a.css('cursor','default');
		}
    });
}

/***
 * 查询指定活动下已参加活动的笔记列表
 */
function getNoteActivitys(){
	//alert("查询参加活动的笔记列表");
	var activityId = location.hash.substr(1);
	$.ajax({
		url:"/activityNote.do",
		method:"get",
		data:{activityId:activityId},
		success:function (data) {
			$('#first_action .contacts-list').empty();
			for(var i=0;i<data.length;i++){
				var n=data[i];
				$('#first_action .contacts-list').append('<li class="online"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom">' +
					'</i>'+n.share.title+'<button type="button" class="btn btn-default btn-xs btn_position_3 btn_up"><i class="fa fa-thumbs-o-up"></i></button><button type="button" class="btn btn-default btn-xs btn_position_2 btn_down"><i class="fa fa-thumbs-o-down"></i></button><button type="button" class="btn btn-default btn-xs btn_position btn_like"><i class="fa fa-star-o"></i></button></a></li>');
                $('#first_action .contacts-list li:last').data('activityNote',n);
                $('#first_action .contacts-list li:first').click();
			}
        }
	})
}

/***
 * 查询活动笔记内容
 */
function getNoteActivityDetail(){
	console.log("查询活动笔记内容");
}

/***
 * 查询可选择的笔记本
 */
function getSelectNoteBook(){
	$.ajax({
        url:"/notebook.do",
        method:"get",
        success:function (data) {
            if(data == 'fail'){
                location.href ="login.html";
                return;
            }
            var special =data['special'];
            var normal = data['normal'];
            //绑定特殊笔记本
            for(var i=0;i<special.length;i++){
                var  nb = special[i];
                switch (nb.name){
                    case '默认':
                        $('#select_notebook .contacts-list li:first').data("notebook",nb);
                        break;
                }
            }
            //绑定普通笔记本
            for(var i=0;i < normal.length;i++){
                var nb =normal[i];
                $('#select_notebook .contacts-list').append('<li class="online"><a ><i class="fa fa-book" title="online" rel="tooltip-bottom"></i>'+nb.name+'</a></li>');
                $('#select_notebook .contacts-list li:last').data("notebook",nb);
            }
            $('#select_notebook .contacts-list li:first').click();
        }
	})
}

/***
 * 查询可选择的笔记
 */
function getSelectNoteList(){
    var li =$('#select_notebook .contacts-list li .checked').parent();
    var nb =li.data('notebook');
    var notebookId =nb.id;
    $.ajax({
        url:"/note.do",
        method:"get",
        data:{notebookId:notebookId},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            $('#select_note .contacts-list').html('');
            for(var i = 0;i<data.length;i++){
                var note = data[i];
                $('#select_note .contacts-list').append('<li class="online"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+note.title+'</a></li>');
                $('#select_note .contacts-list li:last').data('note',note);
                $('#select_note .contacts-list li:first').click();
            }
        }
    })
}

/***
 *	将用户选择的笔记参加活动
 */
function createNoteActivity(){
	var note =$('#select_note .contacts-list li .checked').parent().data('note');
    var activityId = location.hash.substr(1);

	$.ajax({
		url:"/activityNote.do",
		method:"post",
		data:{noteId:note.id,activityId:activityId},
		success:function (data) {
			if(data){
                //刷新页面
                location.reload();
                $('.close,.cancle').trigger('click');
            }else{
                $('.close,.cancle').trigger('click');
                alert("笔记不能为空或者此笔记已经参加过活动");
            }

        }
	})


}

/***
 *	分享活动笔记
 */
function likeActivityNote() {
	alert("分享活动笔记");
}

/***
 *	顶笔记
 */
function up() {
	alert("顶笔记");
}

/***
 *	踩笔记
 */
function down(noteActivityId, dom) {
	alert("踩笔记");
}
