var $catList = $('#cats');


$.ajax({
	method: 'GET',
	url: 'https://ga-cat-rescue.herokuapp.com/api/cats'
})
.done(function(data) {
        // console.log(data);
        var obj = JSON.parse(data);
        // console.log(obj);
        for (var i = 0; i < obj.length; i++) {
        	var catli = document.createElement('li');
        	catli.innerHTML = obj[i].name + "-" + obj[i].note;
        	$catList.append(catli);        
        }
    });

$("#new-cat").submit(function(event) {

	event.preventDefault();

	var name = $('#cat-name').val();
	console.log(name);
	var note = $('#cat-note').val();
	console.log(note);

	var newCat = {
		name: name,
		note: note,
	};

	var catString = JSON.stringify(newCat);

	$.ajax({
		method: 'POST',
		url: 'https://ga-cat-rescue.herokuapp.com/api/cats',
		data: catString
	});
	$.get('https://ga-cat-rescue.herokuapp.com/api/cats')
	.done(function(data) {
		var newObj = JSON.parse(data);
		var addCat = newObj.pop();
		$catList.prepend('<li>' + addCat.name + "-" + addCat.note + '</li>'); 
	});

});
 
