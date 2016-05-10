//Normal jQuery
function scaleCourseItem() {
    var courseImageWidth = jQuery('.courseList .courseItem .courseImage').width();
    var courseImageHeight = ( courseImageWidth * 410 ) / 530;
    jQuery('.courseList .courseItem').css('height',courseImageHeight+'px');
    setTimeout('scaleCourseItem()',300);        
};
//AngularJS
var elearning = angular.module('elearningApp',[]);

elearning.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

elearning.run(function($http) {
    var viewportWidth = jQuery(document).width();
    var buttonWidth = (viewportWidth-8)/5;
    var buttonHeight = buttonWidth - 10;
    jQuery('.bottomNav .nav-inline li').width(buttonWidth);    
    jQuery('.bottomNav .nav-inline li').height(buttonHeight);
    var appTitleWidth = viewportWidth - 140;
    jQuery('.appTitle').width(appTitleWidth);
    jQuery('#elearningApp').css('padding-bottom',buttonHeight+'px');
    setTimeout('scaleCourseItem()',300);
    videojs.options.flash.swf = "video-js/video-js.swf";    
});

elearning.factory('appSettings',['$sce',function($sce) {
    var thisClickNo = 0;
    var settings = {
        currentView: "home",
        language: "en_gb",
        root: "http://e.igniting.hk/e1/",
        rootUrl: "http://e.igniting.hk/e1/en/index.php?option=com_elearning_webservice"
    };
    /*
    var user = {
        id: 913,
        password: "$2y$10$azTKk58qtfJnf3DUvPapEu6W7sxm9rV7Vk1IpFQFomUvZx7hyGWnu",
        name: "Mr Test",
        member_no: "AXPIE334OESG",
        point: 19825,
        image: "img/LearnIcons/noimage.png"
    };
    */
    var user = {};
    var currentTask = '';
    var currentCourse = {};
    var currentLession = {};
    var modal = {
        'none': true,
        'confirm': false,
        'loading': false    
    };
    var advancedCourseFilter  = {};  
    return {
        getAdvancedCourseFilter: function() {
            return advancedCourseFilter;    
        },
        setAdvancedCourseFilter: function(v) {
            advancedCourseFilter = v;
        },
        getCurrentCourse: function() {
            return currentCourse;
        },
        setCurrentCourse: function(c){
            currentCourse = c;
        },
        getRateView: function(v) {
            switch(parseFloat(v)) {
                case 0:
                    var html = '<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                    break;
                case 0.5:
                    var html = '<i class="fa fa-star-half-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                    break;
                case 1:
                    var html = '<i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                    break;
                case 1.5:
                    var html = '<i class="fa fa-star"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                    break;
                case 2:
                    var html = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                    break;
                case 2.5:
                    var html = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                    break;
                case 3:
                    var html = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                    break;
                case 3.5:
                    var html = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star-o"></i>';
                    break;
                case 4:
                    var html = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i>';
                    break;
                case 4.5:
                    var html = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-o"></i>';
                    break;
                case 5:
                    var html = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
                    break;
            }
            return $sce.trustAsHtml(html);
        },
        getModal: function(v) {
            return modal[v];    
        },
        setModal: function(v) {
            angular.forEach(modal,function(e,k) {
                if(k==v) {
                    modal[k] = true;
                }else{
                    modal[k] = false;
                }                  
            });    
        },
        getCurrentTask: function() {
            return currentTask;
        },
        setCurrentTask: function(v) {
            currentTask = v;
        },
        getUser: function() {
            return user;
        },
        setUser: function(u) {
            user = u;  
        },
        getCurrentView: function() {
            return settings.currentView;
        },
        setCurrentView: function(v) {
            if(v=='profile' || v=='coursedetail') {
                if(user.id>0) {
                    jQuery('.topbar').removeClass('bigger').addClass('smaller');
                    settings.currentView = v;
                    jQuery('.bottomNav .nav-inline li').removeClass('active');
                    jQuery('.bottomNav .nav-inline li.'+v).addClass('active');    
                }else{
                    jQuery('#myLoginModal').modal();
                    currentTask = {task:'setCurrentView',value:v};    
                }    
            }else{
                if(v=='home') {
                    jQuery('.topbar').removeClass('smaller').addClass('bigger');                        
                }else{
                    jQuery('.topbar').removeClass('bigger').addClass('smaller');
                }
                settings.currentView = v;
                jQuery('.bottomNav .nav-inline li').removeClass('active');
                jQuery('.bottomNav .nav-inline li.'+v).addClass('active');
            }

        },
        isCurrentView: function(v) {
            return (v==settings.currentView);
        },
        convertHtml: function(val) {
            return $sce.trustAsHtml(val);
        },
        changeLanguage: function(val)  {
            settings.language = val;
        },
        getLanguage: function() {
            return settings.language;   
        },
        getAppClickNo: function() {
            return thisClickNo;
        },
        setAppClickNo: function(val) {
            thisClickNo = val;
        },
        getRootUrl: function() {
            return settings.rootUrl;
        },
        getImageSrc: function(src) {
            if(src=='' || typeof src == 'undefined') {
                return "img/defaul_course.png";
            }
            return settings.root + src;
        },
        showCourseDetail: function(item) {
            this.setCurrentCourse(item);
            this.setCurrentView('coursedetail');    
        },
        getCurrentLession: function() {
            return currentLession;
        },
        setCurrentLession: function(c){
            currentLession = c;
            this.setCurrentView('lessiondetail');
        }
    }
}]);

elearning.controller('homeView',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.appSettings =  appSettings;
    $scope.label = {
        more: "more",
        featured_courses: "Featured Courses",
        popular_courses: "Popular Courses",
        latest_courses: "Latest Courses"
    };
    $scope.featuredCourses = [];
    $scope.popularCourses = [];
    $scope.latestCourses = [];
    $scope.mainSlide = [];
    $scope.home = '';
    
    appSettings.setModal('loading');
    jQuery('#myModal').modal({'backdrop':'static'});
    $http.post(appSettings.getRootUrl(),{"task":"getHomeView"},{cache:true}).then(function(xhr) {
        if(xhr.data.error==false) {
            if(xhr.data.slideshow.length>0) {
                angular.forEach(xhr.data.slideshow,function(v,k) {
                    $scope.mainSlide.push(v); 
                });  
            }
            if(xhr.data.featured.length>0) {
                angular.forEach(xhr.data.featured,function(v,k) {
                    $scope.featuredCourses.push(v); 
                });  
            }
            if(xhr.data.popular.length>0) {
                angular.forEach(xhr.data.popular,function(v,k) {
                    $scope.popularCourses.push(v); 
                });  
            }
            if(xhr.data.latest.length>0) {
                angular.forEach(xhr.data.latest,function(v,k) {
                    $scope.latestCourses.push(v); 
                });  
            }
            jQuery('.mainSlide .carousel').carousel({
                interval: 5000
            })
            appSettings.setModal('none');
            jQuery('#myModal').modal('hide');                              
        }       
    },function() {
        //Show error modal popup
        appSettings.setModal('none');
        jQuery('#myModal').modal('hide');
    });
}]);

elearning.controller('courseView',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.filter1Options = [
        {"id":0,"name":"Select","name_hk":"Select","name_cn":"Select"},
        {"id":1,"name":"Popular","name_hk":"Popular","name_cn":"Popular"},
        {"id":2,"name":"Latest","name_hk":"Latest","name_cn":"Latest"},
        {"id":3,"name":"Most subscription within 10 days","name_hk":"Most subscription within 10 days","name_cn":"Most subscription within 10 days"},
        {"id":4,"name":"Course Title","name_hk":"Course Title","name_cn":"Course Title"},
        {"id":5,"name":"Teacher Name","name_hk":"Teacher Name","name_cn":"Teacher Name"},
        {"id":6,"name":"Subscription Amt","name_hk":"Subscription Amt","name_cn":"Subscription Amt"},
        {"id":7,"name":"Modified Time","name_hk":"Modified Time","name_cn":"Modified Time"},
        {"id":8,"name":"Added Time","name_hk":"Added Time","name_cn":"Added Time"},
        {"id":9,"name":"End Time","name_hk":"End Time","name_cn":"End Time"}
    ];
    $scope.appSettings = appSettings;
    $scope.hasMore = true;
    $scope.courseList = [];
    $scope.courseCategories = [{"id":0,"name":"Category"}];
    $scope.filter1 = $scope.filter1Options[0];
    $scope.category = $scope.courseCategories[0];
    $scope.searchword = "";
    $scope.updateCourseList = function($event) {
        $scope.courseList = [];
        $scope.loadMoreCourse();
    };   
    $scope.loadMoreCourse = function() {
        $scope.hasMore = false;
        appSettings.setModal('loading');
        jQuery('#myModal').modal({'backdrop':'static'});
        var advancedFitler = appSettings.getAdvancedCourseFilter();
        $scope.user = appSettings.getUser();
        var startItem = $scope.courseList.length;
        $http.post(appSettings.getRootUrl(),{"task":"getCourses","start":startItem,"filter1":$scope.filter1.id,"category_id":$scope.category.id,"searchword":$scope.searchword,"advanced":advancedFitler},{headers:{"Authorization":"key="+$scope.user.id+";token="+$scope.user.password}}).then(function(xhr) {
            if(xhr.data.error==false) {
                if(xhr.data.data.length>0) {
                    angular.forEach(xhr.data.data,function(v,k) {
                        $scope.courseList.push(v); 
                    });
                    if($scope.courseList.length>=xhr.data.total) {
                        $scope.hasMore = false;    
                    }else{
                        $scope.hasMore = true;
                    }    
                }else{
                    $scope.hasMore = false;
                }
                appSettings.setModal('none');
                jQuery('#myModal').modal('hide');                               
            }       
        },function() {
            //Show error modal popup
            jQuery('#myModal').modal('hide');
        });        
    };
    $scope.loadCategories = function() {
        $http.post(appSettings.getRootUrl(),{"task":"getCourseCategories"},{cache:true}).then(function(xhr) {
            if(xhr.data.error==false) {
                if(xhr.data.data.length>0) {
                    angular.forEach(xhr.data.data,function(v,k) {
                        $scope.courseCategories.push(v); 
                    });      
                }                               
            }       
        },function() {
            //Show error modal popup
        });
    };
    $scope.$watch(
        function () {
            return appSettings.getCurrentView(); 
        }, 
        function (value) {
            if(value=='courselist') {
                if($scope.courseList.length<=0) {
                    $scope.loadMoreCourse();
                }
                if($scope.courseCategories.length<=1) {
                    $scope.loadCategories();
                }
            }else{
                appSettings.setAdvancedCourseFilter({});
                $scope.courseList = [];
            }      
        }
    );
    $scope.$watch(function() {
        return appSettings.getLanguage();
    },function(n) {
        switch(n) {
            case 'en_gb':
                $scope.label = {search:"Search"}
                break;
            case 'zh_tw':
                $scope.label = {search:"Search"}
                break;
            case 'zh_cn':
                $scope.label = {search:"Search"}
                break;
        }
    }); 
}]);

elearning.controller('courseDetail',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.appSettings = appSettings;
    $scope.label = {
        discussion: "Discussion",
        lession: "Lession",
        level: "Level:",
        points: "Points:",
        name: "Name:",
        profile: "Profile:",
        free:"Free"
    };
    $scope.$watch(function() {
        return appSettings.getCurrentCourse();
    },function(n,o) {
        $scope.course = {};
        $scope.user = appSettings.getUser();
        if(jQuery.isEmptyObject(n)==false) {
            appSettings.setModal('loading');
            jQuery('#myModal').modal({'backdrop':'static'});
            $http.post(appSettings.getRootUrl(),{"task":"getCourseDetail","course":n},{cache:true,headers:{"Authorization":"key="+$scope.user.id+";token="+$scope.user.password}}).then(function(xhr) {
                if(xhr.data.error==false) {
                    $scope.course = xhr.data.course;
                    //console.log($scope.course);                                
                }else{
                    
                }
                appSettings.setModal('none');
                jQuery('#myModal').modal('hide');       
            },function() {
                //Show error modal popup
                appSettings.setModal('none');
                jQuery('#myModal').modal('hide');
            });
        }      
    });
    $scope.showCourseByTeacher = function() {
        appSettings.setAdvancedCourseFilter({"teacher":$scope.course.author});
        appSettings.setCurrentView('courselist');
    };    
}]);

elearning.controller('lessionDetail',['$window','$scope','$http', 'appSettings', function($window,$scope,$http,appSettings) {
    $scope.appSettings = appSettings;
    $scope.$watch(function() {
        return appSettings.getCurrentView()
    },function(n,o) {
        if(n=='lessiondetail') {
            
            var playerVideo = jQuery('<video id="elearning_lession_media" class="video-js vjs-default-skin" poster="img/BeABCLogoWhite.png" data-setup=\'{}\' webkit-playsinline></video>');
            
            appSettings.setModal('loading');
            $scope.user = appSettings.getUser();
            $http.post(appSettings.getRootUrl(),{"task":"getLessionDetail","course":appSettings.getCurrentCourse(),"lession":appSettings.getCurrentLession()},{headers:{"Authorization":"key="+$scope.user.id+";token="+$scope.user.password}}).then(function(xhr) {
                if(xhr.data.error==false) {
                    console.log(xhr.data.media);
                    if(xhr.data.media.local) {
                        playerVideo.append('<source src="http://e.igniting.hk/e1/media/videos/'+xhr.data.media.local+'" type="video/mp4">');
                    }
                    if(xhr.data.media.video_sub) {
                        playerVideo.append('<track kind="captions" src="http://e.igniting.hk/e1/'+xhr.data.media.video_sub[0].videosuburl+'" srclang="en" label="English" default></track>');                               
                        playerVideo.append('<track kind="subtitles" src="http://e.igniting.hk/e1/'+xhr.data.media.video_sub[1].videosuburl+'" srclang="en" label="English" default></track>'); 
                    }
                    jQuery('#playerContainer').append(playerVideo);            
            
                    playerHeight = $window.innerHeight*520/1920;
                    //playerHeight = $window.innerWidth*9/16;
                    var myPlayer = videojs('elearning_lession_media',{
                        "width":$window.innerWidth,
                        "height": playerHeight,
                        "preload": "none",
                        "controls": true,
                        children: {
                            controlBar: {
                                children: {
                                    volumeControl: false 
                                }
                            }
                        }
                    },function() {
                        if(xhr.data.media.video_sub) {
                            jQuery('.vjs-captions-button').click();
        				    jQuery('.vjs-subtitles-button').click();
                        }
                    });
                }
                appSettings.setModal('none');
                jQuery('#myModal').modal('hide');       
            },function() {
                //Show error modal popup
                appSettings.setModal('none');
                jQuery('#myModal').modal('hide');
            });            
            
        }else{
            if(jQuery('#elearning_lession_media').length>0) {
                videojs('elearning_lession_media').dispose();    
            }            
        }
    })
}]);

elearning.controller('blogView',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.appSettings = appSettings;
}]);

elearning.controller('contactView',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.$watch(
        function () {
            return appSettings.getLanguage(); 
        }, 
        function (value) {
            switch(value) {
                case 'en_gb':
                    $scope.label = {submit: "Send",message: "Message",email: "Email",subject: "Subject"};
                    break;
                case 'zh_tw':
                    $scope.label = {submit: "Send TW",message: "Message TW",email: "Email TW",subject: "Subject TW"};
                    break;
                case 'zh_cn':
                    $scope.label = {submit: "Send CN",message: "Message CN",email: "Email CN",subject: "Subject CN"};
                    break;
            }
        }
    );
    
    $scope.formData = {subject:"",email:"",message:""};
    $scope.submitForm = function() {
        $http.post(appSettings.getRootUrl(),{"task":"sendContactUs","formdata":$scope.formData},{cache:true}).then(function(xhr) {
            if(xhr.data.error==false) {
                $scope.formData = {subject:"",email:$scope.formData.email,message:""};
                //Show complete popup                              
            }       
        },function() {
            //Show error modal popup
        });    
    };
    $scope.appSettings =  appSettings;
}]);

elearning.controller('profileView',['$compile','$scope','$http', 'appSettings', function($compile,$scope,$http,appSettings) {
    $scope.appSettings = appSettings;
    $scope.$watch(
        function () {
            return appSettings.getLanguage(); 
        }, 
        function (value) {
            switch(value) {
                case 'en_gb':
                    $scope.label = {
                        name: "Username",
                        member_no: "Membership No.",
                        point: "EarnPoints",
                        dashboard: "Dashboard",
                        favorite: "My Favorite",
                        profile: "Profile",
                        addpoint: "Add Point",
                        buyaccounts: "Buy Accouts",
                        buycoupons: "Buy Coupons",
                        logout: "Log out",
                        are_you_sure: "Are you sure?",
                        yes: "Yes",
                        no: "No"
                    };
                    break;
                case 'zh_tw':
                    $scope.label = {
                        name: "Username",
                        member_no: "Membership No.",
                        point: "EarnPoints",
                        dashboard: "Dashboard",
                        favorite: "My Favorite",
                        profile: "Profile",
                        addpoint: "Add Point",
                        buyaccounts: "Buy Accouts",
                        buycoupons: "Buy Coupons",
                        logout: "Log out",
                        are_you_sure: "Are you sure?",
                        yes: "Yes",
                        no: "No"
                    };
                    break;
                case 'zh_cn':
                    $scope.label = {
                        name: "Username",
                        member_no: "Membership No.",
                        point: "EarnPoints",
                        dashboard: "Dashboard",
                        favorite: "My Favorite",
                        profile: "Profile",
                        addpoint: "Add Point",
                        buyaccounts: "Buy Accouts",
                        buycoupons: "Buy Coupons",
                        logout: "Log out",
                        are_you_sure: "Are you sure?",
                        yes: "Yes",
                        no: "No"
                    };
                    break;
            }
        }
    );
    
    $scope.$watch(function(){
        return appSettings.getUser();
    },function(n,o) {
        $scope.user = n;
    });
    $scope.showFavorite = function() {
        appSettings.setAdvancedCourseFilter({"favorite":1});
        appSettings.setCurrentView('courselist');
    };
    $scope.doLogout = function() {
        appSettings.setCurrentTask({'task':'doLogout'});
        appSettings.setModal('confirm');
        jQuery('#myModal').modal('show');
    };
    
    
}]);

elearning.controller('addPointView',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.appSettings = appSettings;
    $scope.pointvalue = 100000;
    $scope.label = {
        coupon_code: "Coupon code",
        confirm: "Confirm" ,
        online_purchase: "Online purchase",
        buy: "Buy",
        unit: "units ",
        points: "points",
        total: "Total"   
    };
    $scope.currencies = [
        {name:"HKD",value:888},
        {name:"RMB",value:100},
        {name:"USD",value:17}
    ];
    $scope.form = {
        unit: 5,
        currency: $scope.currencies[0],
        method: "paypal"
    };    
    $scope.doAddPoint = function() {
        $scope.user = appSettings.getUser();
        if($scope.form.method == "paypal") {
            var total = $scope.form.unit * $scope.form.currency.value;
            var paymentDetails = new PayPalPaymentDetails(total, "0.00", "0.00");
            var payment = new PayPalPayment(total, $scope.form.currency.name, "eLearn: Add point", "Sale", paymentDetails);
            appSettings.setModal('loading');
            jQuery('#myModal').modal({'backdrop':'static'});
            PayPalMobile.renderSinglePaymentUI(payment, function(pm) {
                //on success
                $http.post(appSettings.getRootUrl(),{"task":"addPoint","form":$scope.form,"payment":pm},{headers:{"Authorization":"key="+$scope.user.id+";token="+$scope.user.password}}).then(function(xhr) {
                    if(xhr.data.error==false) {
                        $scope.user.point = xhr.data.point;
                        appSettings.setUser($scope.user);                    
                    }
                    appSettings.setModal('none');
                    jQuery('#myModal').modal("hide");    
                },function() {
                    appSettings.setModal('none');
                    jQuery('#myModal').modal("hide"); 
                });
            }, function(result) {
                //on user cancel
                appSettings.setModal('none');
                jQuery('#myModal').modal("hide");
            });    
        }else{
            $http.post(appSettings.getRootUrl(),{"task":"addPoint","form":$scope.form},{headers:{"Authorization":"key="+$scope.user.id+";token="+$scope.user.password}}).then(function(xhr) {
                if(xhr.data.error==false) {
                         
                }     
            },function() {
                //Show error modal popup
            });
        }        
    };
    $scope.coupon_code = '';
    $scope.doAddCoupon = function() {
        console.log($scope.coupon_code);
    };
    $scope.notAllowSubmit = true;
    $scope.needUpdated = true;
    $scope.$watch(function() {
        return appSettings.getCurrentView();    
    },function(n,o) {
        if(n=='addpoint' && $scope.needUpdated) {
            $http.post(appSettings.getRootUrl(),{"task":"getAddPointPrice"},{cache:true}).then(function(xhr) {
                if(xhr.data.error==false) {
                    $scope.pointvalue = xhr.data.ppu;
                    $scope.currencies[0].value = xhr.data.hkd;
                    $scope.currencies[1].value = xhr.data.rmb;
                    $scope.currencies[2].value = xhr.data.usd;                           
                }
                $scope.notAllowSubmit = false;
                $scope.needUpdated = false;       
            },function() {
                //Show error modal popup
                $scope.notAllowSubmit = false;
                $scope.needUpdated = false;
            });       
        }
    });
}]);

elearning.controller('buyAccountView',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.appSettings = appSettings;
    $scope.label = {
        buy_more_account: "Buy more accounts",
        number_account: "Number of accounts",
        accounts: "accounts",
        payment_method: "Payment method",
        your_accounts: "Your accounts",
        username: "Username",
        password: "Password",
        salename:"Salename",
        status: "Status",
        created: "Created",
        changestatus: "Change status",
        remark: "Remark",
        confirm: "Confirm" ,
        total: "Total",
        buy: "Buy",
        select_currency: "Select currency"   
    };
    $scope.currencies = [
        {name:"HKD",value:125},
        {name:"RMB",value:100},
        {name:"USD",value:17}
    ];
    $scope.form = {
        numberaccount: 5,
        currency: $scope.currencies[0],
        method: "paypal"
    };
    $scope.notAllowSubmit = true;
    $scope.needUpdated = true;
    $scope.$watch(function() {
        return appSettings.getCurrentView();    
    },function(n,o) {
        if(n=='buyaccount' && $scope.needUpdated) {
            $http.post(appSettings.getRootUrl(),{"task":"getBuyAccountPrice"},{cache:true}).then(function(xhr) {
                if(xhr.data.error==false) {
                    $scope.currencies[0].value = xhr.data.hkd;
                    $scope.currencies[1].value = xhr.data.rmb;
                    $scope.currencies[2].value = xhr.data.usd;                           
                }
                $scope.notAllowSubmit = false;
                $scope.needUpdated = false;       
            },function() {
                //Show error modal popup
                $scope.notAllowSubmit = false;
                $scope.needUpdated = false;
            });       
        }
    });
}]);

elearning.controller('buyCouponView',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.appSettings = appSettings;
    $scope.label = {
        points: "points",
        coupons: "coupons",
        payment_method: "Payment method",
        total: "Total",
        buy: "Buy",
        select_currency: "Select currency"   
    };
    $scope.currencies = [
        {name:"HKD",value:10},
        {name:"RMB",value:12},
        {name:"USD",value:5}
    ];
    $scope.form = {
        coupon: 5,
        point_per_coupon: 500,
        currency: $scope.currencies[0],
        method: "paypal"
    };
    $scope.notAllowSubmit = true;
    $scope.needUpdated = true;
    $scope.doBuyCoupon = function() {
        $scope.user = appSettings.getUser();
        if($scope.form.method == "paypal") {
            var total = $scope.form.coupon * $scope.form.currency.value;
            var paymentDetails = new PayPalPaymentDetails(total, "0.00", "0.00");
            var payment = new PayPalPayment(total, $scope.form.currency.name, "eLearn: Add point", "Sale", paymentDetails);
            appSettings.setModal('loading');
            jQuery('#myModal').modal({'backdrop':'static'});
            PayPalMobile.renderSinglePaymentUI(payment, function(pm) {
                //on success
                $http.post(appSettings.getRootUrl(),{"task":"buyCoupon","form":$scope.form,"payment":pm},{headers:{"Authorization":"key="+$scope.user.id+";token="+$scope.user.password}}).then(function(xhr) {
                    if(xhr.data.error==false) {
                        //confirm done                    
                    }
                    appSettings.setModal('none');
                    jQuery('#myModal').modal("hide");    
                },function() {
                    appSettings.setModal('none');
                    jQuery('#myModal').modal("hide"); 
                });
            }, function(result) {
                //on user cancel
                appSettings.setModal('none');
                jQuery('#myModal').modal("hide");
            });    
        }else{
            $http.post(appSettings.getRootUrl(),{"task":"addPoint","form":$scope.form},{headers:{"Authorization":"key="+$scope.user.id+";token="+$scope.user.password}}).then(function(xhr) {
                if(xhr.data.error==false) {
                         
                }     
            },function() {
                //Show error modal popup
            });
        }    
    };
    $scope.$watch(function() {
        return appSettings.getCurrentView();    
    },function(n,o) {
        if(n=='buycoupon' && $scope.needUpdated) {
            $http.post(appSettings.getRootUrl(),{"task":"getBuyCouponPrice"},{cache:true}).then(function(xhr) {
                if(xhr.data.error==false) {
                    $scope.form.point_per_coupon = xhr.data.ppu;
                    $scope.currencies[0].value = xhr.data.hkd;
                    $scope.currencies[1].value = xhr.data.rmb;
                    $scope.currencies[2].value = xhr.data.usd;                           
                }
                $scope.notAllowSubmit = false;
                $scope.needUpdated = false;       
            },function() {
                //Show error modal popup
                $scope.notAllowSubmit = false;
                $scope.needUpdated = false;
            });       
        }
    });
}]);

elearning.controller('bottomNav',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.showView = function(v) {
        appSettings.setCurrentView(v);        
    };
}]);

elearning.controller('topNav',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.langLabel = {
        first: {code:"en_gb", name:"Eng", apptitle:"ABC Learning"},
        second: {code:"zh_tw", name:"繁", apptitle:"寫意學堂"},
        third: {code:"zh_cn", name:"简", apptitle:"写意学堂"}
    };

    $scope.changeLanguage = function() {
        $scope.langLabel = {
            first: $scope.langLabel.second,
            second: $scope.langLabel.third,
            third: $scope.langLabel.first
        };
        appSettings.changeLanguage($scope.langLabel.first.code);    
    };
    $scope.devInfo = function() {
        var click_no = appSettings.getAppClickNo() + 1;
        if(click_no>=7) {
            alert("Developer Info:\nEmail: nguyenkhanh87@gmail.com\nSkype: nguyenkhanh.17286\nThank you for your interest.");
            appSettings.setAppClickNo(0);
        }else{
            appSettings.setAppClickNo(click_no);
        }    
    };
}]);

elearning.controller('loginModal',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.appSettings = appSettings;
    $scope.$watch(
        function () {
            return appSettings.getLanguage(); 
        }, 
        function (value) {
            switch(value) {
                case 'en_gb':
                    $scope.label = {
                        sign_in: "Sign in",
                        or: "Or",
                        username: "Username",
                        password: "Password",
                        log_in: "Log-in",
                        forgot_username: "Forgot username",
                        forgot_password: "Forgot password",
                        new_register: "New register",
                        username_required: "Username is required!",
                        password_required: "Password is required!"    
                    };
                    break;
                case 'zh_tw':
                    $scope.label = {
                        sign_in: "Sign in",
                        or: "Or",
                        username: "Username",
                        password: "Password",
                        log_in: "Log-in TW",
                        forgot_username: "Forgot username",
                        forgot_password: "Forgot password",
                        new_register: "New register",
                        username_required: "Username is required!",
                        password_required: "Password is required!"    
                    };
                    break;
                case 'zh_cn':
                    $scope.label = {
                        sign_in: "Sign in",
                        or: "Or",
                        username: "Username",
                        password: "Password",
                        log_in: "Log-in CN",
                        forgot_username: "Forgot username",
                        forgot_password: "Forgot password",
                        new_register: "New register",
                        username_required: "Username is required!",
                        password_required: "Password is required!"    
                    };
                    break;
            }
        }
    );
    
    $scope.user = {};
    $scope.blockLogin = false;
    $scope.doLogin = function() {
        $scope.blockLogin = true;
        $http.post(appSettings.getRootUrl(),{"task":"doLogin","user":$scope.user},{cache:true}).then(function(xhr) {
            if(xhr.data.error==false) {
                appSettings.setUser(xhr.data.user);
                jQuery('#myLoginModal').modal('hide');
                $scope.user = {};
                var currentTask = appSettings.getCurrentTask();
                if(currentTask.task=='setCurrentView') {
                    appSettings.setCurrentView(currentTask.value);
                }                             
            }
            $scope.blockLogin = false;       
        },function() {
            //Show error modal popup
            $scope.blockLogin = false;
        });    
    };
    $scope.openRegisterModal = function() {
        appSettings.setCurrentTask({'task':'showRegisterModal'});
        jQuery('#myLoginModal').modal('hide');
        jQuery('#myRegisterModal').modal('show');    
    };
}]);

elearning.controller('defaultModal',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.appSettings = appSettings;
    $scope.$watch(
        function () {
            return appSettings.getLanguage(); 
        }, 
        function (value) {
            switch(value) {
                case 'en_gb':
                    $scope.label = {
                        are_you_sure: "Are you sure?",
                        yes: "Yes",
                        no: "No"
                    };
                    break;
                case 'zh_tw':
                    $scope.label = {
                        are_you_sure: "Are you sure?",
                        yes: "Yes",
                        no: "No"
                    };
                    break;
                case 'zh_cn':
                    $scope.label = {
                        are_you_sure: "Are you sure?",
                        yes: "Yes",
                        no: "No"
                    };
                    break;
            }
        }
    );
    $scope.confirmAction = function(v) {
        jQuery('#myModal').modal('hide');
        appSettings.setModal('none');
        if(v) {
            var currentTask = appSettings.getCurrentTask();
            switch(currentTask.task) {
                case 'doLogout':
                    appSettings.setUser({});
                    appSettings.setCurrentView('home');
                    break;
            }
        }
    };
}]);

elearning.controller('registerModal',['$scope','$http', 'appSettings', function($scope,$http,appSettings) {
    $scope.appSettings = appSettings;
    $scope.currency = [
        {id:"usd",name:"USD",value:8888},
        {id:"hkd",name:"HKD",value:8888},
        {id:"rmb",name:"RMB",value:8888}
    ];
    $scope.user = {
        name: "",
        username: "",
        email: "",
        password1: "",
        password2: "",
        currency: $scope.currency[0]
    };
    $scope.checkUsername = function() {
        $http.post(appSettings.getRootUrl(),{"task":"checkUsernameExisted","username":$scope.user.username}).then(function(xhr) {
            if(xhr.data.error==false) {
                if(xhr.data.isExisted==true) {
                    $scope.registerForm.formUsername.$setValidity("userExisted", false);    
                }else{
                    $scope.registerForm.formUsername.$setValidity("userExisted", true);   
                }                                    
            }       
        },function() {
            //Nothing to do
        });
    };
    $scope.checkEmail = function() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test($scope.user.email)) {
            $http.post(appSettings.getRootUrl(),{"task":"checkEmailExisted","email":$scope.user.email}).then(function(xhr) {
                if(xhr.data.error==false) {
                    if(xhr.data.isExisted==true) {
                        $scope.registerForm.formEmail.$setValidity("emailExisted", false);    
                    }else{
                        $scope.registerForm.formEmail.$setValidity("emailExisted", true);
                    }                                    
                }       
            },function() {
                //Nothing to do
            });   
        }else{
            $scope.registerForm.formEmail.$setValidity("email", false);        
        }
        
    };
    $scope.doRegister = function() {
        $scope.allowSelectCurrency = true;
        //Make paypal purchase first, if success then create user in system
        $http.post(appSettings.getRootUrl(),{"task":"doRegister","user":$scope.user}).then(function(xhr) {
            if(xhr.data.error==false) {
                if(xhr.data.user) {
                    appSettings.setUser(xhr.data.user);     
                }
                jQuery('#myRegisterModal').modal('hide');                                   
            }else{
                jQuery('#myRegisterModal').modal('hide');
            }
            $scope.allowSelectCurrency = true;       
        },function() {
            jQuery('#myRegisterModal').modal('hide');
            $scope.allowSelectCurrency = true;
        });
        //Reset user 
        $scope.user = {
            name: "",
            username: "",
            email: "",
            password1: "",
            password2: "",
            currency: $scope.currency[0]
        };
        $scope.registerForm.formName.$setPristine();
        $scope.registerForm.formUsername.$setPristine();
        $scope.registerForm.formEmail.$setPristine();
        $scope.registerForm.passWord.$setPristine();
        $scope.registerForm.confirmPass.$setPristine();
    };
    $scope.allowSelectCurrency = true;
    $scope.$watch(function() {
        return appSettings.getCurrentTask();
    },function(n,o) {
        if(n.task=='showRegisterModal') {
            $http.post(appSettings.getRootUrl(),{"task":"getRegisterPrice"},{cache:true}).then(function(xhr) {
                if(xhr.data.error==false) {
                    $scope.currency[0].value = xhr.data.usd;                                     
                    $scope.currency[1].value = xhr.data.hkd;                                     
                    $scope.currency[2].value = xhr.data.rmb;
                    $scope.allowSelectCurrency = false;                                    
                }       
            },function() {
                $scope.allowSelectCurrency = false;
            });
            appSettings.setCurrentTask(o);    
        }
    });
    $scope.$watch(
        function () {
            return appSettings.getLanguage(); 
        }, 
        function (value) {
            switch(value) {
                case 'en_gb':
                    $scope.label = {
                        name: "Name",
                        username: "Username",
                        email: "Email",
                        password1: "Password",
                        password2: "Confirm password",
                        submit: "Register",
                        cancel: "Cancel",
                        register: "Register",
                        payment_info: "Payment Information",
                        payment_method: "Payment Method",
                        payment_method_name: "Paypal",
                        password_not_match: "Password not matched.",
                        required: "Required!",
                        invalid_email: "Invalid email address.",
                        user_existed: "Username existed.",
                        email_existed: "Email existed."
                    };
                    break;
                case 'zh_tw':
                    $scope.label = {
                        name: "Name",
                        username: "Username",
                        email: "Email",
                        password1: "Password",
                        password2: "Confirm password",
                        submit: "Register",
                        cancel: "Cancel",
                        register: "Register",
                        payment_info: "Payment Information",
                        payment_method: "Payment Method",
                        payment_method_name: "Paypal",
                        password_not_match: "Password not matched.",
                        required: "Required!",
                        invalid_email: "Invalid email address.",
                        user_existed: "Username existed.",
                        email_existed: "Email existed."
                    };
                    break;
                case 'zh_cn':
                    $scope.label = {
                        name: "Name",
                        username: "Username",
                        email: "Email",
                        password1: "Password",
                        password2: "Confirm password",
                        submit: "Register",
                        cancel: "Cancel",
                        register: "Register",
                        payment_info: "Payment Information",
                        payment_method: "Payment Method",
                        payment_method_name: "Paypal",
                        password_not_match: "Password not matched.",
                        required: "Required!",
                        invalid_email: "Invalid email address.",
                        user_existed: "Username existed.",
                        email_existed: "Email existed."
                    };
                    break;
            }
        }
    );
}]);

//Init whole app
//'load', 'deviceready', 'offline', and 'online'
document.addEventListener('deviceready', function() {
    angular.bootstrap(document.getElementById('elearningApp'), ['elearningApp']);
    var clientIDs = {
       "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
       "PayPalEnvironmentSandbox": "Abh4iyGeII5hXKdqu8_TZerw5aQl4d_4kEOViCr3d7Rth7onci74z9d-yulJVulaQ91_RgJWZ62tpVRj"
     };
     PayPalMobile.init(clientIDs, function() {
        var config = new PayPalConfiguration({merchantName: "eLearn", merchantPrivacyPolicyURL: "http://e.igniting.hk/e1", merchantUserAgreementURL: "http://e.igniting.hk/e1"});
        PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", config, function() {
            //All set up is done.
        });   
     });
     setInterval(function() {
        if (StatusBar.isVisible) {
            StatusBar.hide();
        }
     },1000);     
}, false);

// Deleted this line before complied.
//angular.bootstrap(document.getElementById('elearningApp'), ['elearningApp']);
 