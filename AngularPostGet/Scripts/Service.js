//post get metodu nereye gidecek onu tutmus oluyorum burda.

app.service('myService', function ($http) {
    //get all employes
    this.getEmployees = function () { //this $scope aynı şeyi temsil ediyor.
        return $http.get("/Home/GetAll");

    }


    this.getByID = function (EmpID) {
        var response = $http({
            method: "post",
            url: "/Home/getByID",
            //ıd benim için parametre olduğu için params diye yolluyoruz.
            params: {
                id: JSON.stringify(EmpID)
            }
        });
        return response;
    }

    this.UpdateEmp = function (employee) {
        var response = $http({
            method: "post",
            url: "/Home/UpdateEmployee",
            data: JSON.stringify(employee),
            dataType: "json"

        });

        return response;
    }


    this.AddEmp = function (employee) {
        var response = $http({
            method: "post",
            url: "/Home/Ekle",
            data: JSON.stringify(employee),
            dataType: "json"

        });

        return response;

    }

    this.DeleteEmp = function (employee) {
        var response = $http({
            method: "post",
            url: "/Home/DeleteEmp",
            data: JSON.stringify(employee),
            dataType: "json"

        });

        return response;
    }



});