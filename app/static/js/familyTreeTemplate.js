//JavaScript

// const { none } = require("./familytree");


FamilyTree.templates.tommy_female.field_2 =
  '<text data-width="230" style="font-size: 18px;font-weight:bold;" fill="#ffffff" x="10" y="110" text-anchor="start">{val}</text>'
FamilyTree.templates.tommy_male.field_2 =
  '<text data-width="230" style="font-size: 18px;font-weight:bold;" fill="#ffffff" x="10" y="110" text-anchor="start">{val}</text>'

FamilyTree.templates.group = Object.assign({}, FamilyTree.templates.tommy);
FamilyTree.templates.group.size = [250, 120];
FamilyTree.templates.group.node = 
    '<rect rx="20" ry="20" x="0" y="0" height="{h}" width="{w}" fill="#ffd333" stroke-width="3" stroke="#aeaeae"></rect>';
FamilyTree.templates.group.nodeMenuButton = "";
FamilyTree.templates.group.field_0 = 
    '<text data-width="220" style="font-size: 18px;" fill="black" x="{cw}" y="30" text-anchor="middle">'
    + '{val}</text>';
FamilyTree.templates.group.field_1 = '';

FamilyTree.templates.group.ripple = {
    radius: 50,
    color: "#aeaeae"
};

FamilyTree.templates.group.min = Object.assign({}, FamilyTree.templates.group);
FamilyTree.templates.group.min.img_0 = "";
FamilyTree.templates.group.min.field_0 = '{val}',
FamilyTree.templates.group.min.field_1 = "";
var scale = 0.5

function save(){
    let nodes = family.nodes
    let data = {"treeData":[]}

    for (let [key, value] of Object.entries(nodes)) {
        let node = family.get(key)
        data["treeData"].push(node)
    }
    return data
}

function load(canEdit=false){

    if (canEdit){
        var family = new FamilyTree(document.getElementById("tree"), {
            mode: 'dark',
            nodeTreeMenu: true,
            nodeBinding: {
                field_0: 'name',
                field_2: 'born',
                img_0: 'photo'
            },
            editForm: {
                titleBinding: "name",
                photoBinding: "photo",
                addMoreBtn: 'Add element',
                addMore: 'Add more elements',
                addMoreFieldName: 'Element name',
                generateElementsFromFields: true,
                elements: [
                    { type: 'textbox', label: 'Full Name', binding: 'name' },
                    { type: 'textbox', label: 'Email Address', binding: 'email' },
                    [
                        { type: 'textbox', label: 'Phone', binding: 'phone' },
                        { type: 'date', label: 'Date Of Birth', binding: 'born' }
                    ],
                    [
                        { type: 'textbox', label: 'Country', binding: 'country' },
                        { type: 'textbox', label: 'City', binding: 'city' },
                    ],
                    { type: 'textbox', label: 'Photo Url', binding: 'photo', },//btn: 'Upload' 
                ],
                buttons:  {
                    share: null,
                    pdf: null
                }
            }
        });
    } else{
        var family = new FamilyTree(document.getElementById("tree"), {
            mode: 'dark',
            nodeBinding: {
                field_0: 'name',
                field_2: 'born',
                img_0: 'photo'
            },
            editForm: {
                titleBinding: "name",
                photoBinding: "photo",
                addMoreBtn: 'Add element',
                addMore: 'Add more elements',
                addMoreFieldName: 'Element name',
                generateElementsFromFields: true,
                elements: [
                    { type: 'textbox', label: 'Full Name', binding: 'name' },
                    { type: 'textbox', label: 'Email Address', binding: 'email' },
                    [
                        { type: 'textbox', label: 'Phone', binding: 'phone' },
                        { type: 'date', label: 'Date Of Birth', binding: 'born' }
                    ],
                    [
                        { type: 'textbox', label: 'Country', binding: 'country' },
                        { type: 'textbox', label: 'City', binding: 'city' },
                    ],
                    { type: 'textbox', label: 'Photo Url', binding: 'photo', },//btn: 'Upload' 
                ],
                buttons:  {
                    share: null,
                    edit: null,
                    pdf: null
                }
            }
        });
    }


    family.on('field', function (sender, args) {
        if (args.node.min) {
            if (args.name == "name") {
                var count = args.node.stChildrenIds.length > 5 ? 5 : args.node.stChildrenIds.length;
                var x = args.node.w / 2 - (count * 64) / 2;
                args.value = "";
                for (var i = 0; i < count; i++) {
                    var data = sender.get(args.node.stChildrenIds[i]);
                    if (data.gender == "male")
                        args.value += 
                            '<rect x="' + (x + i * 64) + '" y="55" width="64" height="32" fill="rgb(3, 155, 229)" rx="5" ry="5"></rect>'
                            + '<text x="' + (x + i * 64 + 20)  + '" y="75" fill="#fff">' + data.id + '</text>';
                    else 
                        args.value += 
                            '<rect x="' + (x + i * 64) + '" y="55" width="64" height="32" fill="rgb(245, 124, 0)" rx="5" ry="5"></rect>'
                            + '<text x="' + (x + i * 64 + 20) + '" y="75" fill="#fff">' + data.id + '</text>';
                }
            }
        }
    });

    family.on('click', function (sender, args) {
        if (args.node.templateName == "group") {
            if (args.node.min ) {
                sender.maximize(args.node.id);
            }
            else {
                sender.minimize(args.node.id);
            }
            return false;
        } 
    });
    if(treeData.hasOwnProperty('treeData')){
        family.load(treeData["treeData"]);
    }
    return family
}

$( document ).ready(function() {
    $("#editButton").hide()
    $("#saveButton").hide()
    $("#publishButton").hide()
});
