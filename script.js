$(document).ready(function () {
  printAll();
  $("button").click(function () {
    var impegno = $("input").val();
    nuovoImpegno(impegno)
  });
})
// funzione stampa
function printAll() {
  $.ajax({
    url :"http://157.230.17.132:3008/todos",
    method : "GET",
    success :function (data) {
      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);

      for (var i = 0; i < data.length; i++) {
        var context = data[i]
        var html = template(context);
        $("ul").append(html)
      }
    },
    error : function (error) {
      alerr("errore"+error)
    }
  })
}
// inserimento dato
function nuovoImpegno(testo) {
  $.ajax({
    url :"http://157.230.17.132:3008/todos",
    method : "POST",
    data : {
      text : testo,
    },
    success :function (data) {
      $("ul li").remove();
      printAll()
    },
    error : function (error) {
      alerr("errore"+error)
    }
  })
}
