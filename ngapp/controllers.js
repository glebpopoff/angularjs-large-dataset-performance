var angularJSBigDataControllers = angular.module('angularJSBigDataControllers', []);

/*
 * Homepage Controller
 */
angularJSBigDataControllers.controller('HomeCtrl', ['$scope', '$location',
    function ($scope, $location) {
        window.log('controller', 'HomeCtrl: init..');

        $scope.load10K = function () {
            window.log('controller', 'Loading 10K dataset demo');

            $location.path('/data/10K');
        }

        $scope.load100K = function () {
            window.log('controller', 'Loading 100K dataset demo');

            $location.path('/data/100K');
        }

        $scope.load1M = function () {
            window.log('controller', 'Loading 1M dataset demo');

            $location.path('/data/1M');
        }
    }
]);

/*
 * List Controller 
 */
angularJSBigDataControllers.controller('ListCtrl', ['$scope', '$rootScope', 'AppDataService', 'DataShareService', '$routeParams',
    function ($scope, $rootScope, AppDataService, DataShareService, $routeParams) {
        window.log('controller', 'ListCtrl: init..');

        var datasetPath = 'data-file-min-10K.json';
        if ($routeParams.size == '100K')
        {
            datasetPath = 'data-file-min-100K.json';
        } else if ($routeParams.size == '1M')
        {
            datasetPath = 'data-file-min-1M.json';
        } 
        window.log('controller', 'Dataset Path: ' + datasetPath);
        //call the web service to load the dataset
        AppDataService.getData(datasetPath).then(function (response) {
        		if (response && response.data && response.data.length > 0) {
                    window.log('controller', 'ListCtrl: Processing data. Total records: ' + response.data.length);
                    
                    //entire dataset
                    $scope.entire_dataset = response.data;
                    $scope.filtered_data = [];
                    $scope.page_idx = 1;
                    $scope.records_per_page = 25;
                    $scope.hasMoreData = ($scope.entire_dataset.length > $scope.records_per_page) ? true : false;

                    $scope.total_records_dataset = $scope.entire_dataset.length;
                    $scope.total_records = $scope.entire_dataset.length;
                    //contains the first 25 records that will be displayed to the user
                    $scope.data_records = ($scope.entire_dataset.length > $scope.records_per_page) 
                                          ? $scope.entire_dataset.slice(0, $scope.records_per_page) : $scope.entire_dataset;
                
                    
                }

                //search by term (plain JS)
                $scope.performSearch = function () {
                    window.log('controller', 'Searching [Term=' + $scope.searchTerm + ',Use Lodash=' + $scope.useLodash + ',Sort By=' + $scope.sortBy);
                    var timeStart = Date.now();
                    $scope.hasMoreData = ($scope.entire_dataset.length > $scope.records_per_page) ? true : false;

                    if ($scope.searchTerm && $scope.searchTerm.length > 0)
                    {
                        $scope.filtered_data = [];
                        if (!$scope.useLodash)
                        {
                            for (var i=0;i<$scope.entire_dataset.length;i++)
                            {   var tmpObj = $scope.entire_dataset[i];
                                if (tmpObj.firstName.toLocaleLowerCase().indexOf($scope.searchTerm.toLocaleLowerCase()) != -1 ||
                                    tmpObj.lastName.toLocaleLowerCase().indexOf($scope.searchTerm.toLocaleLowerCase()) != -1 ||
                                    tmpObj.company.toLocaleLowerCase().indexOf($scope.searchTerm.toLocaleLowerCase()) != -1
                                    )
                                {
                                    $scope.filtered_data.push(tmpObj);
                                }
                            }
                        } else
                        {
                            $scope.filtered_data = _($scope.entire_dataset)
                                                  .filter(function(e) 
                                                   { 
                                                        return e.firstName.toLocaleLowerCase().indexOf($scope.searchTerm.toLocaleLowerCase()) != -1 ||
                                                                e.lastName.toLocaleLowerCase().indexOf($scope.searchTerm.toLocaleLowerCase()) != -1 ||
                                                                e.company.toLocaleLowerCase().indexOf($scope.searchTerm.toLocaleLowerCase()) != -1
                                            
                                                   })
                                                  .value();
                        }
                        window.log('controller', 'Found: ' + $scope.filtered_data.length + ' records');
                    } else
                    {
                        $scope.filtered_data = $scope.entire_dataset;
                    }

                    //lets see if we need to sort
                    if ($scope.sortBy)
                    {
                        window.log('controller', 'Sorting: ' + $scope.sortBy);

                        if ($scope.useLodash)
                        {
                            $scope.filtered_data = _.sortBy($scope.filtered_data, $scope.sortBy);
                        } else
                        {
                            $scope.filtered_data.sort(function (a, b)
                            {
                                //sort string ascending
                                if ($scope.sortBy == 'name')
                                {
                                    if (a.lastName < b.lastName) return -1;
                                    if (a.lastName > b.lastName) return 1;
                                    return 0;
                                } else if ($scope.sortBy == 'email')
                                {
                                    if (a.email < b.email) return -1;
                                    if (a.email > b.email) return 1;
                                    return 0;
                                } else if ($scope.sortBy == 'company')
                                {
                                    if (a.company < b.company) return -1;
                                    if (a.company > b.company) return 1;
                                    return 0;
                                } else if ($scope.sortBy == 'state')
                                {
                                    if (a.state < b.state) return -1;
                                    if (a.state > b.state) return 1;
                                    return 0;
                                }
                            });
                        }
                    }

                    //update the scope variable
                    if ($scope.filtered_data.length > 0)
                    {
                        $scope.data_execution_time = (Date.now() - timeStart) / 1000;
                        $scope.found_records = $scope.filtered_data.length;
                        $scope.total_records = $scope.filtered_data.length;
                        $scope.data_records = ($scope.filtered_data.length > $scope.records_per_page) 
                                              ? $scope.filtered_data.slice(0, $scope.records_per_page) : $scope.filtered_data;
                    }
                };

                //pagination / see more
                $scope.paginateResultSet = function () {
                    $scope.page_idx += 1;
                    var upperBound = $scope.records_per_page * $scope.page_idx;
                    
                    window.log('controller', 'ListCtrl: paginate. Page IDX: ' + $scope.page_idx + ', UpperBound: ' + upperBound);

                    //contains the first 25 records that will be displayed to the user
                    if ($scope.filtered_data && $scope.filtered_data.length > 0)
                    {
                        $scope.data_records = ($scope.filtered_data.length > upperBound) 
                                               ? $scope.filtered_data.slice(0, upperBound) : $scope.filtered_data;
                    } else
                    {
                        $scope.data_records = ($scope.entire_dataset.length > upperBound) 
                                               ? $scope.entire_dataset.slice(0, upperBound) : $scope.entire_dataset;
                    }
                    $scope.hasMoreData = ($scope.total_records > upperBound) ? true : false;                      
                                      
                };


            });
    }
]);

				