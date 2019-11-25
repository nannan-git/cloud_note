/***
 * 加载普通笔记
 */
function getNormalNoteList(){
    var li =$('#first_side_right .contacts-list li .checked').parent();
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
            $('#second_side_right .contacts-list').html('');
            for(var i = 0;i<data.length;i++){
                var note = data[i];
                $('#second_side_right .contacts-list').append('<li class="online">\n' +
                    '<a>\n' +
                    '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+note.title+'&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+ new Date(note.modifyTime).getFullYear()+'/'+(new Date(note.modifyTime).getMonth()+1)+'/'+new Date(note.modifyTime).getDate() +'  ' +new Date(note.modifyTime).getHours()+':'+new Date(note.modifyTime).getMinutes()+')<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n' +
                    '</a>\n' +
                    '<div class="note_menu" tabindex=\'-1\'>\n' +
                    '<dl>\n' +
                    '<dt><button type="button" class="btn btn-default btn-xs btn_move" title=\'移动至...\'><i class="fa fa-random"></i></button></dt>\n' +
                    '<dt><button type="button" class="btn btn-default btn-xs btn_share" title=\'分享\'><i class="fa fa-sitemap"></i></button></dt>\n' +
                    '<dt><button type="button" class="btn btn-default btn-xs btn_delete" title=\'删除\'><i class="fa fa-times"></i></button></dt>\n' +
                    '</dl>\n' +
                    '</div>\n' +
                    '</li>');
                $('#second_side_right .contacts-list li:last').data('note',note);
                $('#second_side_right .contacts-list li:first').click();
            }
        }
    })
}

/***
 * 查询普通笔记内容
 */
function getNoteDetail(){
    var note=$('#second_side_right .contacts-list li .checked').parent().data('note');
    $('#input_note_title').val(note.title);
    um.setContent(note.body==null ? '' : note.body);
}

/***
 * 创建普通笔记
 */
function createNormalNote(){
    var title = $('#input_note').val().trim();
    var li =$('#first_side_right .contacts-list li .checked').parent();
    var nb =li.data('notebook');
    var notebookId =nb.id;

    $.ajax({
        url:"/note.do",
        method:"post",
        data:{title:title,notebookId:notebookId},
        success:function (note) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            $('.cancle').click();
            $('#second_side_right .contacts-list').prepend('<li class="online">\n' +
                '<a>\n' +
                '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+note.title+'&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+ new Date(note.modifyTime).getFullYear()+'/'+(new Date(note.modifyTime).getMonth()+1)+'/'+new Date(note.modifyTime).getDate()+'  ' +new Date(note.modifyTime).getHours()+':'+new Date(note.modifyTime).getMinutes()+')<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n' +
                '</a>\n' +
                '<div class="note_menu" tabindex=\'-1\'>\n' +
                '<dl>\n' +
                '<dt><button type="button" class="btn btn-default btn-xs btn_move" title=\'移动至...\'><i class="fa fa-random"></i></button></dt>\n' +
                '<dt><button type="button" class="btn btn-default btn-xs btn_share" title=\'分享\'><i class="fa fa-sitemap"></i></button></dt>\n' +
                '<dt><button type="button" class="btn btn-default btn-xs btn_delete" title=\'删除\'><i class="fa fa-times"></i></button></dt>\n' +
                '</dl>\n' +
                '</div>\n' +
                '</li>');
            $('#second_side_right .contacts-list li:first').data("note",note);
        }
    })
}

/***
 * 更新普通笔记
 */
function updateNormalNote(){
    var note=$('#second_side_right .contacts-list li .checked').parent().data('note');
    var noteId = note.id;
    var title=$('#input_note_title').val().trim();
	var body = um.getContent();
	$.ajax({
        url:"/note.do",
        method:"put",
        data:{id:noteId,title:title,body:body},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            alert("笔记已保存")
            note.modifyTime = data.modifyTime;
            note.title =title;
            note.body =body;
            $('#second_side_right .contacts-list li .checked').parent().data('note',note);
            $('#second_side_right .contacts-list li .checked').html('<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+note.title+'&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+ new Date(note.modifyTime).getFullYear()+'/'+(new Date(note.modifyTime).getMonth()+1)+'/'+new Date(note.modifyTime).getDate()+'  ' +new Date(note.modifyTime).getHours()+':'+new Date(note.modifyTime).getMinutes()+')<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n')
        }
    })
}

/***
 * 删除普通笔记
 */
function deleteNormalNote(){
    var notebookId= $('#rollback_button').data("notebook").id;
    var li = $('#second_side_right .contacts-list li .checked').parent();
    moveNote(li,notebookId);
}

/***
 * 移动笔记
 */
function moveNote(li,notebookId){
    var noteId = li.data('note').id;
    $.ajax({
        url:"/note/move.do",
        method:"put",
        data:{id:noteId,notebookId:notebookId},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            var parent=li.parent();
            li.remove();
            $('.close').click();
            parent.children('li:first').click();
        }
    })
}

/***
 * 分享笔记
 */
function createShareNote(){
	$("footer div strong").text("分享成功").parent().fadeIn(100);
	setTimeout(function(){
		$("footer div").fadeOut(500);
	}, 1500);
}

/***
 * 查询回收站笔记列表
 */
function getRecycleNoteList(){
    var nb =$('#rollback_button').data('notebook');
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
            $('#four_side_right .contacts-list').html('');
            for(var i = 0;i<data.length;i++){
                var note = data[i];
                $('#four_side_right .contacts-list').append('<li class="disable"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+note.title+'&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+ new Date(note.modifyTime).getFullYear()+'/'+(new Date(note.modifyTime).getMonth()+1)+'/'+new Date(note.modifyTime).getDate()+' ' +new Date(note.modifyTime).getHours()+':'+new Date(note.modifyTime).getMinutes()+')<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button><button type="button" class="btn btn-default btn-xs btn_position_2 btn_replay"><i class="fa fa-reply"></i></button></a></li>');
                $('#four_side_right .contacts-list li:last').data('note',note);
                $('#four_side_right .contacts-list li:first').click();
            }
        }
    })
}

/***
 * 查看回收站笔记内容
 */
function getRecycleNoteDetail() {
	console.log("查看回收站笔记内容");
    var note=$('#four_side_right .contacts-list li .checked').parent().data('note');
    $('#noput_note_title').html(note.title);
    $('#note_body').html(note.body);
}

/***
 * 删除回收站笔记
 */
function deleteRecycleNote(){
	var li =$('#four_side_right .contacts-list li .checked').parent();
	var noteId =li.data('note').id;
	$.ajax({
        url:"/note.do",
        method:"delete",
        data:{id:noteId},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            li.remove();
            $('#four_side_right .contacts-list li:first').click();
            $('.cancle').click();
        }
    })
}

/***
 * 搜索分享笔记列表
 */
function getShareNoteList(){
	alert("搜索分享笔记列表");
}

/***
 * 查询分享笔记内容
 */
function getShareNoteDetail(){
	alert("查询分享笔记内容");
}

/***
 * 收藏分享笔记
 */
function likeShareNote(shareId,dom){
	alert("收藏分享笔记");
}

/***
 * 加载收藏笔记
 */
function getLikeNoteList(likeNoteId){
	alert("加载收藏笔记");
}

/***
 * 查看收藏笔记内容
 */
function getLikeNoteDetail(noteId) {
	console.log("查看收藏笔记内容");
}

/***
 * 删除收藏笔记
 */
function deleteLikeNote(noteId,dom){
	alert("删除收藏笔记");
}

/***
 * 加载本用户参加活动笔记列表
 */
function getNoteActivityList(noteBookId){
	alert("加载本用户参加活动笔记列表");
}

/***
 * 查询参加活动的笔记内容
 */
function getActivityNoteDetail(noteId) {
	console.log("查询参加活动的笔记内容");
}