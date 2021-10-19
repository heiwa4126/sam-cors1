function ex1() {

  // 1
  $("#msg1").text("テキスト");

  // 2
  $.ajax({
    contentType : "application/json",
    dataType : "json",
    type : "GET",
    url : "js/dummy.js",
    success : function(data) {
      $("#msg2").text(data.time);
    },
    error : function(data) {
      console.log("error", data);
    }
  })

  // 3
  $.ajax({
    // contentType : "application/json", // これがあるとpreflightが起きる
    dataType : "json",
    type : "GET",
    url : "https://e18pz1no84.execute-api.ap-northeast-1.amazonaws.com/Prod/hello/",
    success : function(data) {
      $("#msg3").text(data.time);
    },
    error : function(data) {
      console.log("error", data);
    }
  })

}
