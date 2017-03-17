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

function getPrices() {
    $.ajax({
        url: URL + "consulting/prices",
        async: false,
        type: "GET",
        datatype: "json",
        success: function(prices) {
            
        },
        error: function(){
            alert("erreur");
        }
    });
}

function updatePriceOfCopy(id,value) {
    $.ajax({
        url: URL + "administration/copies/"+id+"/price",
        async: true,
        type: "PUT",
        datatype: "json",
        data: {"priceId" : value},
        success: function(copy) {
            alert(copy);
        },
        error: function(){
            alert("erreur");
        }
    });
}
