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

$( document ).ready(function() {
    $("#publishButton").show()
});