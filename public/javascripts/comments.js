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
      const userLink = $('<a>').attr('href', '/user/<%=c._creator.id%>');
      const userPic = $('<img>').addClass('img-circle').attr('src','/uploads/'+response.userPic).attr('width','50').attr('height','50');
      //const time = $('<span>').text("el "+ mydate);
      userLink.append(userPic);
      panelBody.append(p);
      panelHeading
        .append(userLink)
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
