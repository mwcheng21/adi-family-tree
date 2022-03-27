function publish(){
    $.ajax({
        type: "POST",
        url: "/update_tree",
        data: {
            "id": id.toString(),
            "editPassword": $("#editPwd").val(),
            "viewPassword": $("#viewPwd").val(),
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

$( document ).ready(function() {
    $("#saveButton").show()
});

var unsaved = true; // global variable

$("#submit").click(function() {
   unsaved = false;
});


const unloadPage = () => {
  if (unsaved) {
    return "You have unsaved changes on this page.";
  }
};

window.onbeforeunload = unloadPage;