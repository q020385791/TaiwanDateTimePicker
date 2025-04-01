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

(function ($)
{
    $.fn.taiwanDatepicker = function (options)
    {
        // 預設參數
        var defaults = {
            dateFormat: 'yy-mm-dd',
            changeYear: true,
            changeMonth: true,
            showButtonPanel: true, // 顯示底部按鈕區域
            currentText: "今天", // 「今天」按鈕
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            autoClose: false // 預設不自動關閉
        };

        // 合併使用者自定義選項
        var settings = $.extend({}, defaults, options);

        function addCustomButtons(inst)
        {
            setTimeout(function ()
            {
                var buttonPane = $(inst.dpDiv).find(".ui-datepicker-buttonpane");

                // 隱藏原生的「確定」按鈕
                buttonPane.find("button.ui-datepicker-close").hide();

                // 確保不重複新增按鈕
                buttonPane.find(".ui-datepicker-clear, .ui-datepicker-confirm").remove();

                // 新增「清除」按鈕
                $("<button type='button' class='ui-datepicker-clear ui-state-default ui-priority-primary ui-corner-all'>清除</button>")
                    .appendTo(buttonPane)
                    .click(function (event)
                    {
                        event.stopPropagation();
                        $(inst.input).val(""); // 清空輸入框，但不關閉日曆
                    });

                // 新增「確定」按鈕
                $("<button type='button' class='ui-datepicker-confirm ui-state-default ui-priority-primary ui-corner-all'>確定</button>")
                    .appendTo(buttonPane)
                    .click(function ()
                    {
                        $(inst.input).datepicker("hide"); // 點擊「確定」後關閉日曆
                    });

                // 監聽「今天」按鈕點擊，設定當天日期
                buttonPane.find(".ui-datepicker-current").off("click").on("click", function (event)
                {
                    event.preventDefault();//阻止預設行為
                    var today = new Date();
                    var taiwanYear = today.getFullYear() - 1911;
                    var formattedDate = taiwanYear + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

                    $(inst.input).val(formattedDate); // 更新輸入框
                    $(inst.input).datepicker("setDate", today); // 設定 datepicker 的選擇日期
                    addCustomButtons(inst); // 確保按鈕仍然顯示
                });
            }, 10);
        }

        // 套用到每個選定的元素
        return this.each(function ()
        {
            $(this).attr("readonly", "readonly").datepicker($.extend({}, settings, {
                beforeShow: function (input, inst)
                {
                    var currentValue = $(input).val();
                    if (currentValue)
                    {
                        var dateParts = currentValue.split('-');
                        var taiwanYear = parseInt(dateParts[0]);
                        if (taiwanYear < 1911)
                        {
                            $(input).datepicker("setDate", new Date(taiwanYear + 1911, dateParts[1] - 1, dateParts[2]));
                        }
                    }

                    setTimeout(function ()
                    {
                        // 轉換年份顯示為民國年
                        $(".ui-datepicker-year option").each(function ()
                        {
                            var year = parseInt($(this).val());
                            $(this).text(year - 1911);
                        });

                        // 新增「清除」與「確定」按鈕
                        addCustomButtons(inst);
                    }, 50);
                },
                onChangeMonthYear: function (year, month, inst)
                {
                    setTimeout(function ()
                    {
                        $(".ui-datepicker-year option").each(function ()
                        {
                            var year = parseInt($(this).val());
                            $(this).text(year - 1911);
                        });

                        // 保持「清除」與「確定」按鈕
                        addCustomButtons(inst);
                    }, 100);
                },
                onSelect: function (dateText, inst)
                {
                    // 讓 `datepicker` 保持開啟，但避免閃爍
                    inst.input.blur(); // 阻止 `onSelect` 自動關閉 `datepicker`
                },
                onClose: function (dateText, inst)
                {
                    if (inst.selectedYear && dateText)
                    {
                        var dateParts = dateText.split('-');
                        var westernYear = parseInt(dateParts[0]);
                        if (westernYear > 1911)
                        {
                            var taiwanYear = westernYear - 1911;
                            var newDateText = taiwanYear + '-' + dateParts[1] + '-' + dateParts[2];
                            $(inst.input).val(newDateText);
                        }
                    }
                }
            }));
        });
    };
}(jQuery));


(function ($)
{
    $.fn.taiwanDatepickerWithTime = function (options)
    {
        // 預設參數
        var defaults = {
            dateFormat: 'yy-mm-dd',
            changeYear: true,
            changeMonth: true,
            timeText: "時間",
            minuteText: "分",
            secondText: "秒",
            currentText: "現在", // 「現在」按鈕
            closeText: "確定", // 「確定」按鈕
            showButtonPanel: true, // 確保顯示按鈕區域
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            timeFormat: 'HH:mm', // 設定時間格式
            controlType: 'select', // 讓時間選擇更方便
            oneLine: true
        };

        // 合併使用者自定義選項
        var settings = $.extend({}, defaults, options);

        function addClearButton(inst)
        {
            setTimeout(function ()
            {
                // 確保按鈕區域存在
                var buttonPane = $(inst.dpDiv).find(".ui-datepicker-buttonpane");

                // 先移除舊的清除按鈕，避免重複新增
                buttonPane.find(".ui-datepicker-clear").remove();

                $("<button type='button' class='ui-datepicker-clear ui-state-default ui-priority-primary ui-corner-all'>清除</button>")
                    .appendTo(buttonPane)
                    .click(function ()
                    {
                        $(inst.input).val(""); // 清空輸入框
                    });
            }, 10);
        }

        // 套用到每個選定的元素
        return this.each(function ()
        {
            $(this).attr("readonly", "readonly").datetimepicker($.extend({}, settings, {
                beforeShow: function (input, inst)
                {
                    var currentValue = $(input).val();
                    if (currentValue)
                    {
                        var dateTimeParts = currentValue.split(' ');
                        var dateParts = dateTimeParts[0].split('-');
                        var taiwanYear = parseInt(dateParts[0]);

                        if (taiwanYear < 1911)
                        {
                            var westernYear = taiwanYear + 1911;
                            var newDate = new Date(westernYear, dateParts[1] - 1, dateParts[2]);
                            if (dateTimeParts.length > 1)
                            {
                                var timeParts = dateTimeParts[1].split(':');
                                newDate.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
                            }
                            $(input).datetimepicker("setDate", newDate);
                        }
                    }

                    setTimeout(function ()
                    {
                        // 轉換年份顯示為民國年
                        $(".ui-datepicker-year option").each(function ()
                        {
                            var year = parseInt($(this).val());
                            $(this).text(year - 1911);
                        });

                        // 新增「清除」按鈕
                        addClearButton(inst);
                    }, 10);
                },
                onChangeMonthYear: function (year, month, inst)
                {
                    setTimeout(function ()
                    {
                        $(".ui-datepicker-year option").each(function ()
                        {
                            var year = parseInt($(this).val());
                            $(this).text(year - 1911);
                        });

                        // 保持「清除」按鈕
                        addClearButton(inst);
                    }, 100);
                },
                onSelect: function (dateText, inst)
                {
                    // 當日期被選擇時，重新添加清除按鈕
                    addClearButton(inst);
                },
                onClose: function (dateText, inst)
                {
                    if (inst.selectedYear && dateText)
                    {
                        var dateTimeParts = dateText.split(' ');
                        var dateParts = dateTimeParts[0].split('-');
                        var westernYear = parseInt(dateParts[0]);

                        if (westernYear > 1911)
                        {
                            var taiwanYear = westernYear - 1911;
                            var newDateText = taiwanYear + '-' + dateParts[1] + '-' + dateParts[2];
                            if (dateTimeParts.length > 1)
                            {
                                newDateText += ' ' + dateTimeParts[1]; // 加上時間
                            }
                            $(inst.input).val(newDateText);
                        }
                    }
                }
            }));
        });
    };
}(jQuery));




