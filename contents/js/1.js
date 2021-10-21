function ex1() {

  let lambdaURL = "https://akiy8fi9d1.execute-api.ap-northeast-1.amazonaws.com/Prod/hello/";

  // 1. 同じオリジンから読む
  $.ajax({
    contentType : "application/json",
    dataType : "json",
    type : "GET",
    url : "js/dummy.js",
    success : function(data) {
      $("#msg1").text(data.time);
    },
    error : function(data) {
      console.log("error", data);
    }
  })

  // 2. 違うオリジンから読む
  $.ajax({
    // contentType : "application/json", // これがあるとpreflightが起きる
    dataType : "json",
    type : "GET",
    url : lambdaURL,
    success : function(data) {
      $("#msg2").text(data.time);
    },
    error : function(data) {
      console.log("error", data);
    }
  })

  // 3. 違うオリジンから読む(preflightつき)
  $.ajax({
    contentType : "application/json", // これがあるとpreflightが起きる
    dataType : "json",
    type : "GET",
    url : lambdaURL,
    success : function(data) {
      $("#msg3").text(data.time);
    },
    error : function(data) {
      console.log("error", data);
    }
  })

}
