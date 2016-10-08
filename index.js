var _self=this;
var initData = [
{"id":236,"status":0,"name":"签单","code":"A","isUpdate":1},
{"id":237,"status":0,"name":"协议细节","code":"B","isUpdate":0},
{"id":238,"status":0,"name":"合作沟通","code":"C","isUpdate":0},
{"id":239,"status":0,"name":"确定意向","code":"D","isUpdate":0},
{"id":240,"status":0,"name":"见面拜访","code":"E","isUpdate":0},
{"id":241,"status":0,"name":"初步接洽","code":"F","isUpdate":0},
{"id":242,"status":0,"name":"放弃","code":"G","isUpdate":1}
];
// 初始化数据
var initTable = function(){
	var operArr = [
	    {txt:'关闭',btnCss1:'theme-color',btn2:'close',disabledCss:''},
	    {txt:'启用',btnCss1:'',btn2:'open',disabledCss:'disabled'}
	];
	var html = '';
	html += '<table class="table-wrap-lite tc">';
	html +='    <thead>';
	html += '       <tr><th width="40">序号</th><th>商机阶段</th><th width="50">级别</th><th width="50">操作</th></tr>';
	html +='    </thead>';
	html +='    <tbody>';
	initData.forEach(function(v,i){
	    html +='<tr class="'+operArr[v.status].disabledCss+'">';
	    html +='    <td>'+(i+1)+'</td>';
	    html +='    <td>';
	    html +='        <span class="type_text" style="display:inline-block;width:130px;">'+v.name+'</span>';
	    html +='    </td>';
	    html +='    <td>'+v.code+'</td>';
	    html +='    <td class="btnOpers">';
	    if(v.isUpdate==0){
	        html +='    <a class="'+operArr[v.status].btnCss1+'" data-btn="edit" title="修改" href="javascript:;">修改</a>&nbsp;';
	        html +='    <a class="theme-color" data-btn="'+operArr[v.status].btn2+'"  title="'+operArr[v.status].txt+'" href="javascript:;">'+operArr[v.status].txt+'</a>';
	    }
	    html +='    </td>';
	    html +='</tr>';
	});
	html += '   </tbody>';
	html += '</table>';
	$("#tableEdit").append(html);
}
// 表格操作
var tableEvent = function(){
	$("#tableEdit a").die('click').live('click',function(event) {
        var $btnSelf = $(this);
        var index = $btnSelf.parents('.btnOpers').index('#tableEdit .btnOpers');
        var data = initData[index];
        // console.log(index,data);
        var btnType = $btnSelf.data('btn');
        // console.log(btnType);
        switch(btnType){
            case 'edit':
                if((data.status)){
                    return;
                }else{
                    var tempInp = '<input type="text" name="temp" value="" class="ui-input w100 focus" />';
                    $btnSelf.parents('tr').find(".type_text").html(tempInp);
                    $btnSelf.parents('td').html(showOperBtns(2));
                }
                break;
            case 'open':
                //启用商机类型
                initData[index].status=1;
                $btnSelf.parents('tr').removeClass('disabled');
                $btnSelf.parents('td').html(showOperBtns(0));
                break;
            case 'close':
                // 关闭出现弹框，确定时请求后台修改相应数据
                var count = 0;
                var optionsHtml = '';
                var confirmHtml = '';
                initData.forEach(function(v,i){
                    if((v.status==0)&&(v.isUpdate==0)&&i!=index){
                        count++;
                        optionsHtml +='<option value="'+v.id+'">'+v.code+':'+v.name+'</option>';
                    }
                });
                // console.log(count);
                /*if(count>0){
                    confirmHtml = '关闭“'+data.name+'”需要将商机进行转移，请选择要转移的商机阶段';
                    confirmHtml += '<div class="tc mt10"><select name="chanceLevelSelect" id="chanceLevelSelect" class="ui_select">'+optionsHtml+'</select></div>';
                      $.dialog({
                        title:'商机阶段',
                        content:confirmHtml,
                        width:380,
                        height:200,
                        lock:true,
                        ok:function(){
                            initData[index].status=0;
                            $btnSelf.parents('tr').addClass('disabled');
                            $btnSelf.parents('td').html(showOperBtns(1));
                            $('#tableEdit .btnOpers').eq(index).find('a').eq(0).removeClass('theme-color');//关闭时修改无theme-color
                        },
                        cancel:function(){}
                      });
                }else{
                    confirmHtml = '请至少保留B/C/D/E/F其中一个商机，不可以全部关闭';
                    $.dialog.confirm(confirmHtml,function(){},function(){});
                }*/
                initData[index].status=0;
                $btnSelf.parents('tr').addClass('disabled');
                $btnSelf.parents('td').html(showOperBtns(1));
                $('#tableEdit .btnOpers').eq(index).find('a').eq(0).removeClass('theme-color');//关闭时修改无theme-color
                break;
            case 'save':
                var newVal = $btnSelf.parents('tr').find('input').val();
                if(newVal&&newVal!=data.name){
                    initData[index].name=newVal;
                    $btnSelf.parents('tr').find('.type_text').html(newVal);
                    $btnSelf.parents('td').html(showOperBtns(0));
                }else{
                   alert('未修改，请重新输入');
                }
                break;
            case 'cancel':
                $btnSelf.parents('tr').find('.type_text').html(data.name);
                $btnSelf.parents('td').html(showOperBtns(0));
                break;
        }

        function showOperBtns(type){
           var btnsArr = [
                [{type:'edit',text:'修改'},{type:'close',text:'关闭'}],
                [{type:'edit',text:'修改'},{type:'open',text:'启用'}],
                [{type:'save',text:'保存'},{type:'cancel',text:'取消'}]
            ];
            var html = '';
            btnsArr[type].forEach(function(v,i){
                // console.log(v,i);
                html +='<a class="theme-color" data-btn="'+v.type+'" title="'+v.text+'" href="javascript:;">'+v.text+'</a>';
                if(i==0){
                    html +='&nbsp;';
                }
            });
            return html;
        }

    });
}

initTable();
tableEvent();