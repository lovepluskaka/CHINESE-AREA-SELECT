(function() {
    var defaultCallback = function(name, id) {
        console.log(id + ':' + name);
    };

    function initSelect(Dom, param) {
        var $select = $(Dom);

        this.init = {
            $select: $select, // jquery selector
            clickEvent: param.clickEvent || defaultCallback // callback
        }

        this.beginInit();
    };


    initSelect.prototype = {
        beginInit: function() {
            var len = areaJson.length,
                provincesDom = [],
                $that = this;

            areaJson.forEach(function(province) {
                var cities = province.cities,
                    citiesDom = [];

                cities.forEach(function(city) {
                    var areas = city.cities,
                        areasDom = [];
                    areas.forEach(function(area) {
                        var areaDom = '<li><a class="item" data-value="' + area.id + '" data-type="province">' + area.name + '</a></li>';
                        areasDom.push(areaDom);
                    })
                    areasDom = areasDom.join('');
                    var cityDom = '<li><a class="item" data-value="' + city.id + '" data-type="province">' + city.name +
                        '</a><div class="sub-menu" style="margin-left: -28px;"><ul>' + areasDom + '</ul></div></li>';

                    citiesDom.push(cityDom);
                })

                citiesDom = citiesDom.join('');
                var provinceDom = '<li><a class="item" data-value="' + province.id + '" data-type="province">' + province.name + '</a><div class="sub-menu"><ul>' +
                    citiesDom + '</ul></div></li>';
                provincesDom.push(provinceDom);
            });

            provincesDom = provincesDom.join('');
            var finnelDom = '<div class="menu-list"><ul>' + provincesDom + '</ul></div>';

            $that.init.$select.find('.menu-body').append(finnelDom);
            $that.bindEvent();
        },
        bindEvent: function() {
            var $select = this.init.$select,
                $that = this;
            $select.on('click', function() {
                $select.find('.menu-body').show();
            });
            $select.find('.item').on('click', function() {
                var newValue = $(this).text();
                newId = $(this).context.dataset.value;
                $select.find('.menu-text').text(newValue);
                $select.find('.menu-text').data('value', newId);
                $('.menu-body').hide();
                $that.init.clickEvent(newValue, newId);
                return false;
            });
        }
    }



    if (window) {
        window.initSelect = initSelect;
    }

    if ($ && jQuery) {
        $.initSelect = jQuery.initSelect = initSelect;
    }

    if (typeof define === 'function' && define.amd) {
        define("initSelect", [jQuery], function() {});
    }

})();