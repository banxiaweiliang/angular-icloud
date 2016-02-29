var reminder = angular.module('reminder', []);
// reminder.filter('search',[function(){
// 	  return function(data,key){
//       var xx=function(items){
//            for(var i=0;i<items.length;i++){
//            	if(items[i].title.indexOf(key)!=-1){
//                             return true;
//            	}
//            }
//            return false;
//       }
//      return function(e,key){
//      	var r=[];
//      	for(var i=0;i<e.length;i++){
//      		if(e[i].name.indexOf(key)!=-1){
//      			r.push(data[i]);
//      		}
//      		if(xx(data[i].items)){
//      			var re=[];
     			
//      			for(var j=0;j<data[i].items.length;j++){
//      				if(data[i].items[j].title.indexOf(key)!=-1){
//      					r.push(data[i].items[j]);
//      				}
//      			}
//      			data[i].items=re;
//            r.push(data[i]);
//      		}
//      	}
//      }
//   }
// }])
reminder.controller('rdCtrl', ['$scope', function($scope){
	$scope.cindex= 0;
	var d=localStorage.data;
	$scope.shijianliebiao = d?JSON.parse(d):[];
		// {
		// 	name:'春节要买的东西',
		// 	color:'red',
		// 	items:[
		// 		{name:'鞭炮',isDone:false,pt:0},
		// 		{name:'葡萄',isDone:false,pt:0},
		// 		{name:'对联',isDone:false,pt:0}
		// 	]
		// },
		// {
		// 	name:'元宵要买的东西',
		// 	color:'blue',
		// 	items:[
		// 		{name:'元宵',isDone:false,pt:0},
		// 		{name:'橘子',isDone:false,pt:0},
		// 		{name:'面条',isDone:false,pt:0}
		// 	]
		// }
		$scope.countDone=function(){
			var lis=$scope.shijianliebiao[$scope.cindex].items;
			var r=0;
			for(var i=0;i<lis.length;i++){
				if(lis[i].isDone){
					r+=1;
				}
			}
			return r;

		}
	
	$scope.showshijian = function (i){
		$scope.cindex = i;
	}
	$scope.addshijian = function (){
             var data={
             	name:'新列表'+($scope.shijianliebiao.length+1),
             	color:$scope.colors[$scope.shijianliebiao.length%7],
             	items:[]
             };
             $scope.shijianliebiao.push(data);
             localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.colors=['purple','green','blue','yellow','brow','pink','orange'];
    
    $scope.deleteItem=function(){
        var r = [];
		for(var i = 0 ;  i<$scope.shijianliebiao.length; i++){
			if(i  != $scope.cindex)	{
				r.push($scope.shijianliebiao[i]);
			}
		}
		$scope.shijianliebiao = r;
		localStorage.data = JSON.stringify($scope.shijianliebiao);
    }
    $scope.addtodo=function(){
    	
         var cu=$scope.shijianliebiao[$scope.cindex];
         var data={title:'新条目'+(cu.items.length+1),isDone:false};
     cu.items.push(data);
     localStorage.data = JSON.stringify($scope.shijianliebiao);
    //   var cu = $scope.shijianliebiao[$scope.cindex];
    // var data = {title:'新条目'+(cu.items.length+1),isDone:false};
    // cu.items.push(data);
    // localStorage.data = JSON.stringify($scope.shijianliebiao);
    }
   $scope.deleteTodo = function(index) {
    var r = [];
    var cu = $scope.shijianliebiao[$scope.cindex]; 
    for(var i=0 ; i<cu.items.length; i++){
      if( i != index){
        r.push(cu.items[i]);
      }
    } 
    $scope.shijianliebiao[$scope.cindex].items = r; 
    localStorage.data = JSON.stringify($scope.shijianliebiao);
  }
  
  $scope.save = function() {
    localStorage.data = JSON.stringify($scope.shijianliebiao);
  }
}])