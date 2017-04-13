$(document).ready(function() {
	// List of products
	var productList = [
		{idProduct:'1', name:'Leche', price: '25',  type: 'Lacteo'},
		{idProduct:'2', name:'Carne', price: '50',  type: 'Animal'},
		{idProduct:'3', name:'Queso', price: '25',  type: 'Concerva'},
		{idProduct:'4', name:'Jamon', price: '15',  type: 'Concerva'},
		{idProduct:'5', name:'Agua', price: '15',  type: '<Natutal></Natutal>'},
		{idProduct:'6', name:'Aceite', price: '20',  type: 'Vegetal'},
		{idProduct:'7', name:'Manzana', price: '20',  type: 'Vegetal'}
	];
	// List of checkers
	var checkerList = [
		{id:'1', name:'Raul Sanchez Campos'},
		{id:'2', name:'Maria Brito Canro'},
		{id:'3', name:'Mario Soto Rodriguez'}
	];

	// Store table information in localSorate
	localStorage.setItem('checker', JSON.stringify(checkerList));
	localStorage.setItem('products', JSON.stringify(productList));
});