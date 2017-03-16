/**
 * ajax request GET Type
 */

function getBooks(){
    $.ajax({
        url : URL + "consulting/books",
        async: true,
        type: "GET",
        datatype: "json",
        success: function(datas){
            createTableBooks(datas);
        },
        error: function(){
            alert("problème")
        }
    });
}


