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
          $("#viewLink").attr("href", `/view/${data.id}`)
          $("#success").show()
          $("#close").click()
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