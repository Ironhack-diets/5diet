$(document).ready(function() {
  $('#createComent').on('click', (e) => {
    var content = $('#commentContent').val();
    var dietId = $('#dietId').val();
    $.post('/comments/new', {
      content: content,
      dietId: dietId

    }).then( (response) => {
    console.log(response);
      var mydate = new Date(response.created_at);
      console.log(mydate);


      const row = $('<div>').addClass('row comments');
      const col = $('<div>').addClass('col-sm-12');
      const panel = $('<div>').addClass('panel panl-default');
      const panelHeading = $('<div>').addClass('panel-heading');
      const panelBody =  $('<div>').addClass('panel-body');
      const p = $('<p>').text(content);
      const author = $('<strong>').text("Creado por: "+response.userName + " ");
      //const time = $('<span>').text("el "+ mydate);
      panelBody.append(p);
      panelHeading
        .append(author);
    //    .append(time);
      panel
        .append(panelHeading)
        .append(panelBody);
      col.append(panel);
      row.append(col);
      $("#wrapper-comments").append(row);

    });
  });
});
