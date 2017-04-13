var products = function() {
	var productList = JSON.parse(localStorage.getItem('products'));

	this.init = function () {
		document.getElementById('SeacrhProduct').addEventListener('click', this.FindById);
		document.getElementById('LotCalculate').addEventListener('click', this.LotCalculate);
		document.getElementById('AddProduct').addEventListener('click', this.addProductToSellNote);
		document.getElementById('btnFinishSell').addEventListener('click', this.finishSell);
		document.getElementById('SellDate').innerText = Date();
		fillTable();
	};

	this.FindById = function() {
		var id = document.getElementById('IdProducto').value;
		fillProductForm(getLocalStorageItem(id));
	};

	this.LotCalculate = function(event) {
		event.preventDefault();
		var lotvalue = document.getElementById('ProductLot').value;
		var productPrice = document.getElementById('ProductPrice').value;
		var total = 0;
		var TotalWhitoutIVA = 0;

		if (lotvalue > 0 && productPrice > 0) {
			TotalWhitoutIVA = lotvalue * productPrice;
			total = TotalWhitoutIVA + (TotalWhitoutIVA * 0.16);

			document.getElementById('ProductNotIVA').value = TotalWhitoutIVA;
			document.getElementById('Total').value = total;
		}
	};

	this.finishSell = function() {
		var items = [];
		var notesTmp = JSON.parse(localStorage.getItem('salleNoteTmp'));

		for(var i=0; i < notesTmp.length; i++) {
			console.log(notesTmp[i]);
			items.push(notesTmp[i]);
		}

		if (JSON.parse(localStorage.getItem('salleNotes')) === null) {
			localStorage.setItem('salleNotes', JSON.stringify(items));
		} else {
			var salesNotesItems = JSON.parse(localStorage.getItem('salleNotes'));

			for(var j=0; j < salesNotesItems.length; j++) {
				items.push(salesNotesItems[j]);
				if (j === (salesNotesItems.length -1)) {
					localStorage.setItem('salleNotes', JSON.stringify(items));
				}
			}
		}

		localStorage.setItem('salleNotes', JSON.stringify(items));
		localStorage.removeItem('salleNoteTmp');
		location.reload();
	};

	this.addProductToSellNote = function(event) {
		event.preventDefault();
		var JSONtoArray = [];
		var formData =
		{
			date: document.getElementById('SellDate').innerText,
			checkerName: document.getElementById('SellerName').innerText,
			totalNotIVA: document.getElementById('ProductNotIVA').value,
			iva: 16,
			total: document.getElementById('Total').value,
			idProduct: document.getElementById('IdProducto').value,
			productLot: document.getElementById('ProductLot').value,
			productPrice: document.getElementById('ProductPrice').value,
			ProductName: document.getElementById('ProductName').value
		};

		if (document.getElementById('ProductName').value.length > 0 && document.getElementById('Total').value.length > 0) {
			if (JSON.parse(localStorage.getItem('salleNoteTmp')) === null) {
				JSONtoArray.push(formData);
				localStorage.setItem('salleNoteTmp', JSON.stringify(JSONtoArray));
			} else {
				var items = JSON.parse(localStorage.getItem('salleNoteTmp'));

				for(var i=0; i < items.length; i++) {
					JSONtoArray.push(items[i]);
					if (i === (items.length -1)) {
						JSONtoArray.push(formData);
						localStorage.setItem('salleNoteTmp', JSON.stringify(JSONtoArray));
					}
				}
			}
		}

		if (document.getElementById('ProductName').value.length > 0 && document.getElementById('Total').value.length > 0)
			fillTable();

		clearFormData();
		location.reload();
	};

	function getLocalStorageItem(item) {
		for (var i = 0; i < productList.length; i++) {
			if (item == productList[i].idProduct) {
				return productList[i];
			}
		}
	}

	function fillProductForm(data) {
		document.getElementById('ProductName').value = data.name;
		document.getElementById('ProductPrice').value = data.price;
	}

	function clearFormData() {
		document.getElementById('ProductNotIVA').value = "";
		document.getElementById('Total').value = "";
		document.getElementById('IdProducto').value = "";
		document.getElementById('ProductLot').value = "";
		document.getElementById('ProductPrice').value = "";
		document.getElementById('ProductName').value = "";
	}

	function deleteItem() {
		console.log('hshsh');
	}

	function fillTable() {
		var tbody = document.getElementById('tblBody');
		var noteSellData = JSON.parse(localStorage.getItem('salleNoteTmp'));

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
				row.insertCell(9).innerHTML = "<button id='" + id + "' class='btn btn-lg btn-danger' onclick='btnDeleteItem(event)'><i class='fa fa-trash-o'></i></button>";
			}
		}
	}
};

var products = new products();
products.init();

// function btnDeleteItem(event) {
// 	var id = event.target.id;
// 	console.log(id);

// 	var item= JSON.parse(localStorage.getItem('salleNoteTmp'));

// 	for (var i = 0; i < item.length; i++) {
// 		if (id == item[i].idProduct) {
// 			console.log(item[i]);
// 			localStorage.removeItem(item[i].idProduct)
// 		}
// 	}
// }