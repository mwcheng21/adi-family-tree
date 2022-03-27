function publish(){
    $.ajax({
        type: "POST",
        url: "/save_new_tree",
        data: {
            "editPassword": $("#editPwd").val(),
            "viewPassword": $("#viewPwd").val(),
            "name": $("#name").val(),
            "treeData": JSON.stringify(save())
        },
        success: function(data)
        {
            window.location.replace(`/view/${data.id}`);
        }
    });
}
var family = load(true)

$('#publishform').on('submit', function(e) {
    // validation code here
    e.preventDefault();
    publish()
})
$('#submit').on('click', function(e) {
    // validation code here
    e.preventDefault();
    publish()
})
var startingSize = -1;

$( document ).ready(function() {
    $("#publishButton").show()
    startingSize = Object.entries(family.nodes).length;

});


var saved = false; // global variable
$("#submit").click(function() {
    startingSize = Object.entries(family.nodes).length;
    saved = true;
});


const unloadPage = () => {
  if (!saved && Object.entries(family.nodes).length != startingSize) {
    console.log(1)
    return "You have unsaved changes on this page.";
  }
};

window.onbeforeunload = unloadPage;