
$(function (){
    var socket = io();

        socket.on("addcomplain", function (data){
            var color;
            var x;
            if (data.fin_time != null){color="mediumspringgreen";} else {color="pink";}
            if (data.fin_time == null) { x= "<input  type=\"submit\" class=\"btn btn-primary btn-md\" id=\"submit\" name=\"submit\" value=\"민원 해결\">";}else {x = "<strong style=\"color: #903479; font-size: 2rem;\">처리완료</strong>";}
            $("#list_place").append(
                "<hr style=\"border: solid 0.5px\">"+
                    "<div class=\"row\">"+
                        "<div class=\"probootstrap-gutter40\">"+
                            "<div class=\"col-sm-3\" style=\"border-radius: 20px; padding: 3% 2%;background-color:"+ color +";\">"+
                                "<div class=\"review-block-name\"><a href=\"#\"><strong>객실 번호 : "+String(data.roomnum)+"</strong></a></div>"+
                                "<div class=\"review-block-room\"><strong>직원 ID : "+String(data.employee_id)+"</strong></div>"+
                                "<div class=\"review-block-room\"><strong>담당 직원 : "+ "나중에 고칠게" +"</strong></div>"+
                                "<div class=\"review-block-room\"><strong>우선 순위 : "+String(data.piriorityx)+"</strong></div>"+
                                "<div class=\"rating-selected\" style=\"margin-left: 30%;\">"+
                                "</div>"+
                            "</div>"+
                            "<div class=\"col-sm-9\">"+
                                "<div class=\"row\">"+
                                    "<div class=\"col-sm-9\">"+
                                        "<div class=\"review-block-title\"><p>타입 : "+data.complain_type+"</p></div>"+
                                    "</div>"+
                                    "<div class=\"col-sm-3\">"+
                                        "<div class=\"form-group text-right\" style=\"margin-top: 10%;\">"+
                                            x+
                                            "</div>"+
                                            "</div>"+
                                            "</div>"+
                                            "<div class=\"review-block-description\">"+data.contentx+"</div>"+
                                            "<div class=\"review-block-description text-right\" style=\"font-size: 14px;\"><p>발생 시간 : "+data.st_time+"</p></div>"+
                                            "<div class=\"review-block-description text-right\" style=\"font-size: 14px;\"><p>종료 시간 : "+data.fin_time+"</p></div>"+
                                            "</div>"+
                                            "</div>"+
                                            "</div>"+
                                            "<hr/>"
            )
        });


        $("#complain_socket").submit(function(e){//추가 버튼 눌렸을
            e.preventDefault();
            var $roomnum=$("#roomnum");
            var $complain_type=$("#complain_type");
            var $priorityx=$("#priorityx");
            var $contentx=$("#contentx");
            var date = new Date();
            var $st_time="2000-11-11 00:00:00";//need fix

           socket.emit("addcomplain",{
               roomnum:parseInt($roomnum.val()),
               complain_type:$complain_type.val(),
               priorityx:parseInt($priorityx.val()),
               contentx:$contentx.val(),
               employee_id:null,
               st_time:$st_time,
               // st_time:$st_time.val(),
               fin_time:null,
           });
           $roomnum.val("");
           $complain_type.val('');
           $priorityx.val("0");
           $contentx.val("");
        });
    });