app.controller('electronicFileCtrl', function($scope, $rootScope, $stateParams, $state, LoginService, factory, MenuHasSubMenuService) {
	$rootScope.title = "AngularJS Login Sample";    
	$scope.bgClassBody  = 'bg-body-panel';
	angular.element('body').removeClass($scope.bgClassBody);
	$scope.userData = LoginService.getUserData();
	$scope.modulosod = [];

	$scope.subMenus = [];
	
	$scope.setIndexMenu=(index)=>{
		console.log(index);
		MenuHasSubMenuService.setIndexMenu(index);
	};
	$scope.setIndexMenu=(index)=>{
		console.log(index);
		MenuHasSubMenuService.setIndexMenu(index);
	};
	
	$scope.getSubMenu=(indexMenu)=>{
		factory.get('components/data/menu/index_menu.json').then(function mySuccess(data) {				
			$scope.menus = data;
			console.log("Menus Electronic", $scope.menus);
			angular.forEach($scope.menus, function(val, key){
				if(val.id == 14){	
					angular.forEach(val.childs, function(val1, key1){
						if(val1.id == indexMenu){	
							$scope.subMenus = val1.childs;
						}
					});
				}
			});
		}, function myError(response) {
			$scope.myWelcome = response.statusText;
			swal("Error",$scope.myWelcome, "error");			
		});
		
	};

	$scope.validateRol = (menu) =>{
		let index = menu.roles.indexOf($scope.userRol);
		let res = (index >= 0? true : false);
		return res;
	};
	
	const constructor =()=>{
		
		if(!LoginService.isAuthenticated()) {
			$rootScope.title = "sin sesion";
		}else{
			if($rootScope.userSession){
				
				$scope.rols = [];
				$scope.userRol = $rootScope.userSession.user.userRol.roleName;
				if(MenuHasSubMenuService.getIndexMenu() > 0){
					console.log('GetSubMenus ');
					console.log(MenuHasSubMenuService.getIndexMenu());
					$scope.getSubMenu(MenuHasSubMenuService.getIndexMenu());
				}
				$rootScope.title = "MENÚ DE OPCIONES";
			}else{
				//TODO
				swal("Error","SIN USUARIO EN SESIÓN", "error");	
			}			
		}
	}

	angular.element(document).ready(function(){
		constructor();
	});	

});