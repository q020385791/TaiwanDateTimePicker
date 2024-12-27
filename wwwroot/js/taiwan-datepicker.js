//實作注意事項
//單一欄格式需使用id = "AnnSDate" type = "text"
//多欄或是動態欄位需要使用class
//單欄
//<input asp-for="UrbanBasicCaseDTO.UrbanAskForAdvice.TWAnnSDateString" id="AnnSDate" type="text" class="form-control" required alt="公告期間">
//$("#AnnSDate").taiwanDatepicker();

//多欄MeetDateTime class對應
//<input asp-for="UrbanBasicCaseDTO.UrbanAskForAdvice.UrbanAskForAdviceForums[0].TWMeetDateTimeString" type="text" class="form-control MeetDateTime" style="margin-right: 5px; flex-shrink: 0; width: auto;" />
//$(".MeetDateTime").taiwanDatepicker();


//模型要隱性轉換 example 要預設好Date型別的值
//        public DateTime AnnSDate { get; set; }

//        public string TWAnnSDateString
//{
//    get
//    {
//               int taiwanYear = AnnSDate.Year - 1911;
//        return $"{taiwanYear}-{AnnSDate.Month:D2}-{AnnSDate.Day:D2}";
//    }
//    set
//    {
//        //民國轉西元
//        if (!string.IsNullOrWhiteSpace(value)) {
//            var parts = value.Split('-');
//            if (parts.Length == 3) {
//                        int taiwanYear = int.Parse(parts[0]);
//                        int year = taiwanYear + 1911;
//                        int month = int.Parse(parts[1]);
//                        int day = int.Parse(parts[2]);

//                try {
//                    AnnSDate = new DateTime(year, month, day);
//                }
//                catch (Exception ex)
//                {
//                    LogHelper.LogExceptionMessage(ex);
//                }

//            }
//        }
//        else {
//            AnnSDate = DateTime.MinValue;
//        }
//    }

//}

(function ($) {
    $.fn.taiwanDatepicker = function (options) {
        // 預設參數
        var defaults = {
            dateFormat: 'yy-mm-dd',
            changeYear: true,
            changeMonth: true,
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"]
        };

        // 合併使用者自定義選項
        var settings = $.extend({}, defaults, options);

        // 套用到每個選定的元素
        return this.each(function () {
            $(this).attr("readonly", "readonly").datepicker($.extend({}, settings, {
                beforeShow: function (input, inst) {
                    var currentValue = $(input).val();
                    if (currentValue) {
                        var dateParts = currentValue.split('-');
                        var taiwanYear = parseInt(dateParts[0]);
                        if (taiwanYear < 1911) {
                            $(input).datepicker("setDate", new Date(taiwanYear + 1911, dateParts[1] - 1, dateParts[2]));
                        }
                    }
                    setTimeout(function () {
                        $(".ui-datepicker-year option").each(function () {
                            var year = parseInt($(this).val());
                            $(this).text(year - 1911);
                        });
                    }, 50);
                },
                onChangeMonthYear: function (year, month, inst) {
                    setTimeout(function () {
                        $(".ui-datepicker-year option").each(function () {
                            var year = parseInt($(this).val());
                            $(this).text(year - 1911);
                        });
                    }, 100);
                },
                onClose: function (dateText, inst) {
                    if (inst.selectedYear && dateText) {
                        var dateParts = dateText.split('-');
                        var westernYear = parseInt(dateParts[0]);
                        if (westernYear > 1911) {
                            var taiwanYear = westernYear - 1911;
                            var newDateText = taiwanYear + '-' + dateParts[1] + '-' + dateParts[2];
                            $(this).val(newDateText);
                        }
                    }
                }
            }));
        });
    };
}(jQuery));
