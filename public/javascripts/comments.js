

$(document).ready(function() {
  $('#createComent').on('click', (e) => {
    var content = $('#commentContent').val();
    $.post('/comments/new', {
      content: content

    }).then( (response) => {
    console.log(response);
    });
  });
});
