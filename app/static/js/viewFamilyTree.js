
var family = load(false)



$( document ).ready(function() {
    $("#editButton").show()
    $( "#edit" ).click(function() {
        window.location.replace(`/edit/${id}`);
    });
});