
define(
    [
        'ko',
        'jquery',
        'uiComponent',
        'mage/url',
        'Magento_Checkout/js/model/quote',
        'domReady!',
        'Magento_Ui/js/form/element/abstract'
    ],
    function (ko, $, Component, url, quote) {


        'use strict';
        return Component.extend({
            defaults: {

                template: 'Ter_Cus/checkout/customCheckbox'
            },



            initialize: function () {


                var self = this;
                this._super();

                var result = '';



                let enable = this.myKey2;
                let threshold_value = Number(this.myKey3);
                let countryList = this.myKey;
                let selectedValue = this.myKey4;
                let selectedCountry = this.myKey5;

                let countryMatch = this.showCheckboxByCountry(selectedCountry, countryList);
                let thresholdValueMatch = this.showCheckboxByThreshold(selectedValue, threshold_value);




                if (enable === '1') {


                    if (countryMatch) {
                        if (thresholdValueMatch) {
                            result = true;

                        }
                        else {
                            result = false;
                        }
                    }
                    else {
                        result = false;
                    }
                }
                else {
                    result = false;
                }


                this.showCheckbox = ko.observable(result);



            },



            initObservable: function () {

                this._super()
                    .observe({
                        CheckVals: ko.observable(true)
                    });
                var checkVal = 0;
                var self = this;
                this.CheckVals.subscribe(function (newValue) {




                    var linkUrls = url.build('module/checkout/saveInQuote');
                    if (newValue) {
                        checkVal = 1;

                        $('.actions-toolbar .primary .action.primary.checkout').attr('disabled', false);


                        console.log(self);
                    }
                    else {
                        checkVal = 0;
                        $('.actions-toolbar .primary .action.primary.checkout').attr('disabled', true);
                    }
                    $.ajax({
                        showLoader: true,
                        url: linkUrls,
                        data: { checkVal: checkVal },
                        type: "POST",
                        dataType: 'json'
                    }).done(function (data) {
                        console.log('success');
                    });
                });
                return this;
            },

            showCheckboxByCountry: function (selectedCountry, countryList) {

                console.log("ethi");

                let countryArray = countryList.split(",");
                let result = countryArray.includes(selectedCountry);

                return result;
            },

            showCheckboxByThreshold: function (selectedValue, threshold_value) {
                var self = this;



                console.log(selectedValue);

                return selectedValue > threshold_value ? true : false;

            },


        });
    }
);


