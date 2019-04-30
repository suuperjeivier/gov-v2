app.controller('orderDayCtrl', function($timeout,$rootScope,orderdayService, $scope,$http, $window,$log,factory, $state, moduloodService,$location) {
	 	
	$scope.titleTabView = '';
	$scope.orderDays = [];
	$scope.orderday = null;
	$scope.modulosod= [];
	$scope.paragraphODs=[];
	$scope.paragraphOD=null;

	$scope.changeTitleTabView=(title)=>{
		$scope.titleTabView = title;
	};
	
	
	
	$scope.getModulosOd = function(){
		moduloodService.get().then(function success(data) {
			$scope.modulosod = data;
		},function error(error){
			console.log('Error al obtener los mudulos', error);
		});
	};
	
	$scope.getParagraphODs = function(){
		paragraphODService.get().then(function success(data){
			$scope.paragraphODs = data;
		},function error(error){
			console.log('Error al obtener los parrafos')
		})
	};
	
	$scope.NewParagraph = function (p) {
		var paragraph;
		for (var i = 0; i < $scope.paragraphOD.length; i++) {
			if ($scope.paragraphOD[i].ParagraphOD.id == p.id) {
				paragraph = $scope.paragraphOD[i];
			}

		}if (!paragraph) {
			$scope.paragraphOD.push();

		} 
	}
	
	
	$scope.getOrderDays = function (){
		swal({
			title: "Consultando Orden del día",
			text: "Por favor espere...",
			icon: 'info',
			button: {
				text: "Ok",
				closeModal: false
			},
			closeOnClickOutside: false,
			closeOnEsc: false
		});

		orderdayService.get().then(function success(data){
			$scope.orderdays = data;
			$timeout(()=>{
				swal.stopLoading();
				swal.close();
			},500);
		}, function error(response){
			$scope.myWelcome = response;
			swal.stopLoading();
			swal('Error', $scope.myWelcome, "error");
		});
	};
	
	
	$scope.postOrderDay = function(){
		swal({
			title: "Guardando Orden del día",
			text: "Por favor espere...",
			icon: 'info',
			button: {
				text: "Ok",
				closeModal: false
			},
			closeOnClickOutside: false,
			closeOnEsc: false
		});

		orderdayService.post($scope.orderday).then(function success(data){
			if(data){
				swal("Exito", "Orden del día agregado correctamente", "success");
				swal.stopLoading();
				$scope.getOrderDays();
				$scope.orderday = null;
			} else {
				swal("Error", "Orden del día no agregado", "error");
			}
		}, function error(error){
			$scope.myWelcome = error.statusText;
			swal("Error","Orden del día no agregado "+$scope.myWelcome, "error");
			swal.stopLoading();
		});
	};
	
	
	$scope.putOrderDay = () => {
		swal({
			title: "Actualizando  Orden del día",
			text: "Por favor espere...",
			icon: 'info',
			button: {
				text: "Ok",
				closeModal: false
			},
			closeOnClickOutside: false,
			closeOnEsc: false
		});

		orderdayService.put($scope.orderday).then(function success(data){
			if(data){
				swal.stopLoading();
				swal("Exito", "Orden del dia actualizado correctamente", "success");
				$scope.getOrderDays();
				$scope.orderday = null;
			} else {
				swal("Error", "Orden del día no actualizado", "error");
			}
		}, function error(error){
			$scope.myWelcome = response.statusText;
			swal.stopLoading();
			swal("Error", $scope.myWelcome, "error");
		});
	};
	
	$scope.addUpdate = () => {
		if($scope.orderday != null){
			if($scope.orderday.id != null){
				$scope.putOrderDay();
			} else {
				$scope.postOrderDay();
			}
		} else {
			console.log("Falta informacion para completar el registro");
		}
	};
	
	$scope.confirmDelete = (orderday) =>{
		swal({
			title: 'Esta seguro de eliminara a',
			text: orderday.titulo,
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then((willDelete)=>{
			if(willDelete){
				$scope.deleteOrderDay(orderday);
			};
		});
	};

	$scope.deleteOrderDay = orderday=> {
		orderdayService.deleteOrderDay(orderday).then(function success(data){
			if(data){
				swal("Exito","Orden del dia eliminado exitosamente", "success");
				$scope.getOrderDays();
			}
		}, function error(){
			swal("Errpr","Orden del dia no eliminado","error");
		});
	};

	$scope.addMudulesOd = function (){
		$location.path('modulood');
	};
	
	$scope.addOrderday = () => {
		$scope.orderday = {
				//nombre: '',
				
		}
	};
	
	$scope.updateOrderday = (orderday) =>{
		$scope.orderday= orderday;
	};
	$scope.submitForm = (isValid) => {
		console.log('validForm');
		console.log(isValid);

		if(isValid) {
			$scope.addUpdate();
		}
	};
	
	$scope.cancelAddUpOrderday = () =>{
		$scope.getOrderDays();
		$scope.orderday = null;
	};

	const initController = () =>{
		$scope.changeTitleTabView('ORDEN DEL DÍA');
		$rootScope.title = "ORDENES DEL DÍA";
		$scope.getOrderDays();
		$scope.getModulosOd();
	};


	angular.element(document).ready(function () {
		initController();
	});
})