function createComment() {

 $.post('/comments/new', $('#comments').val()).then((e)=>{
   console.log(e);
 });
}

$(document).ready(function() {

  $( "#createComent" ).on( "click", createComment());

});
