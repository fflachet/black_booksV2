/**
 * ajax request GET Type
 */
//BOOKS
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
            alert("problème");
        }
    });
}

//COPIES
function getCopiesFromBook(id) {
    $.ajax({
        url: URL + "consulting/books/"+id+"/copies",
        async: true,
        type: "GET",
        datatype: "json",
        success: function(copies) {
            createTableCopies(copies);
        },
        error: function(){
            alert("erreur");
        }
    });
}

//STATES
function getStates() {
    $.ajax({
        url: URL + "consulting/states",
        async: false,
        type: "GET",
        datatype: "json",
        success: function(states) {
            listOfStates = states;
        },
        error: function(){
            alert("erreur");
        }
    });
}

function updateStateOfCopy(id,value) {
    $.ajax({
        url: URL + "administration/copies/"+id+"/state",
        async: true,
        type: "PUT",
        datatype: "json",
        data: {"stateId" : value},
        success: function(copy) {
            alert(copy);
        },
        error: function(){
            alert("erreur");
        }
    });
}

//STATUS
function getStatus() {
    $.ajax({
        url: URL + "consulting/status",
        async: false,
        type: "GET",
        datatype: "json",
        success: function(status) {
            listOfStatus = status;
        },
        error: function(){
            alert("erreur");
        }
    });
}

function updateStatusOfCopy(id,value) {
    $.ajax({
        url: URL + "administration/copies/"+id+"/status",
        async: true,
        type: "PUT",
        datatype: "json",
        data: {"statusId" : value},
        success: function(copy) {
            alert(copy);
        },
        error: function(){
            alert("erreur");
        }
    });
}

//PRICES

function updatePriceOfCopy(id,value) {
    $.ajax({
        url: URL + "administration/copies/"+id+"/price",
        async: true,
        type: "PUT",
        datatype: "json",
        data: {"price" : value},
        success: function(copy) {
        },
        error: function(){
            alert("erreur");
        }
    });
}

function addCopy(copy) {
    $.ajax({
        url: URL + "administration/books/" + currentBook.id + "/copy",
        async: true,
        type: "POST",
        datatype: "json",
        data: copy,
        success: function(c) {
            $(table).append(getLineForTableCopy(c));
        },
        error: function(){
            alert("erreur");
        }
    });
}
