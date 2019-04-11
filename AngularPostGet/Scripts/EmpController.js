app.controller('myController', function ($scope, myService) {
    //GetAll burada karsılamam lazım
    $scope.divEmployee = false; //açılışta edit kısmı gözükmesin diye.
    GetAllEmp();

    //get datanın icine getemployeesdeki bilgileri aldı getdataya attı. get employees benim
    //servicejs te tanımladıgım fonksiyon
    function GetAllEmp() { 
        var getData = myService.getEmployees();
    getData.then(function (response) {  //veriyi getiren kısım
        $scope.employee = response.data;
    }, function () {

        alert("veriler getirilemedi");
            });

    }

    //ekleme mi güncelleme mi diye önce bir kontrol yapıcaz.

    $scope.AddUpdateEmployee = function () {
        var Employee = {
            FirstName: $scope.employeeName,
            LastName: $scope.employeeLastName
        };
        var getAction = $scope.Action;
        if (getAction === "Update") {
            Employee.EmployeeID = $scope.employeeId;
            var getData = myService.UpdateEmp(Employee);
            GetAllEmp();
        }
        else {
            var get = myService.AddEmp(Employee);
            GetAllEmp();
        }
    };

    $scope.Divac = function () {
        $scope.Action = "Add";
        $scope.divEmployee = true;
    };

    $scope.editEmployee = function (Employee) {
        //verileri çekip textboxlara akataran kısım olmalı burası.
        //Edit butonuna bastığımızda bana id verdiği için idli bir methoda ihtiyacım olacak.
        console.log(Employee);
        //Angularda tüm işlemleri JS ler içerisinde yönetiriz.
        //C# ta biz bunların hepsini controllerda yapıyorduk.

        var getData = myService.getByID(Employee.EmployeeID);
        getData.then(function (emp) {
            //burası da modelimden gelenleri methodumdan gelenelere eşitleme yaptığım kısım olacak
            $scope.Employee = emp.data;
            $scope.employeeId = Employee.EmployeeID;
            $scope.employeeName = Employee.FirstName;
            $scope.employeeLastName = Employee.LastName;

            //şimdi update mi add mi olduğumu anlayabilirim.
            //edite bastıysa updatetir benim için 
            $scope.Action = "Update";

            $scope.divEmployee = true;
        

        });
    }

    //silme
    $scope.Deletet = function (employee) {

        var getdataa = myService.DeleteEmp(employee);
        getdataa.then(function (msg) {
            GetAllEmp();
            alert("Employee Deleted");

        });
    }

});