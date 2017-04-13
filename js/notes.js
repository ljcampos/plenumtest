var notes = function() {
	this.init = function() {
		fillTable();
	};

	function fillTable() {
		var tbody = document.getElementById('tblBody');
		var noteSellData = JSON.parse(localStorage.getItem('salleNotes'));
		if (noteSellData !== null) {
			for (var i = 0; i < noteSellData.length; i++) {
				var name = noteSellData[i].ProductName;
				var checker =  noteSellData[i].checkerName;
				var date = noteSellData[i].date;
				var id = noteSellData[i].idProduct;
				var iva = noteSellData[i].iva;
				var lot = noteSellData[i].productLot;
				var price = noteSellData[i].productPrice;
				var total = noteSellData[i].total;
				var totalNotIva = noteSellData[i].totalNotIVA;

				var row  = tbody.insertRow(0);
				row.insertCell(0).innerHTML = id;
				row.insertCell(1).innerHTML = name;
				row.insertCell(2).innerHTML = price;
				row.insertCell(3).innerHTML = lot;
				row.insertCell(4).innerHTML = totalNotIva;
				row.insertCell(5).innerHTML = iva;
				row.insertCell(6).innerHTML = total;
				row.insertCell(7).innerHTML = checker;
				row.insertCell(8).innerHTML = date;
			}
		}
	}
};

var notes= new notes();
notes.init();