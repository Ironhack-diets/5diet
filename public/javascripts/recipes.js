$(document).ready(function() {
  $('#createComent').on('click', (e) => {
    var content = $('#commentContent').val();
    var dietId = $('#dietId').val();
    $.post('/comments/new', {
      content: content,
      dietId: dietId

    }).then( (response) => {
      console.log(response);
      $("#wrapper-comments").append("<div class='row'>hola</div>");

    });
  });
});
