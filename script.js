$(document).ready(function () {
  printAll();
  $("button").click(function () {
    var impegno = $("#nuovo-impegno").val();
    nuovoImpegno(impegno)
  });
  $(document).on("click","span",function () {
    var idImpegno = $(this).parent("li").attr("data-id");
    cancella(idImpegno)
  })
  $(document).on("click","li",function () {
     $(this).children("input").removeClass("display-none");


  })
  $(document).on("keypress","li input",function () {
    if(event.which == 13 || event.keyCode == 13){
      var id = $(this).parents("li").attr("data-id")
      var nuovoTesto = $(this).val();
      modifica(id,nuovoTesto)
      console.log(id + nuovoTesto);
    }
  })
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
// funzione cancellazione
function cancella(id) {
  $.ajax({
    url :"http://157.230.17.132:3008/todos/" + id,
    method : "DELETE",
    success :function (data) {
      $("ul li").remove();
      printAll()
    },
    error : function (error) {
      alert("errore"+error)
    }
  })
}
// funzione modifica
function modifica(id,modifica) {
  $.ajax({
    url :"http://157.230.17.132:3008/todos/" + id,
    method : "PATCH",
    data : {
      text: modifica,
    },
    success :function (data) {
      $("ul li").remove();
      printAll()
    },
    error : function (error) {
      alert("errore"+error)
    }
  })
}
