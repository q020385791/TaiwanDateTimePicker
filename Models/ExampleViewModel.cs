namespace DateTimePickerROC.Models
{
    public class ExampleViewModel
    {
        public  DateTime ExampleDate { get; set; }
        public string TWExampleDateString
        {
            get
            {
                int taiwanYear = ExampleDate.Year - 1911;
                return $"{taiwanYear}-{ExampleDate.Month:D2}-{ExampleDate.Day:D2}";
            }
            set
            {
                if (!string.IsNullOrWhiteSpace(value))
                {
                    var parts = value.Split('-');
                    if (parts.Length == 3)
                    {
                        int taiwanYear = int.Parse(parts[0]);
                        int year = taiwanYear + 1911;
                        int month = int.Parse(parts[1]);
                        int day = int.Parse(parts[2]);
                        ExampleDate = new DateTime(year, month, day);
                    }
                }
                else
                {
                    ExampleDate = DateTime.MinValue;
                }
            }
        }
        public DateTime ExampleDateWithTime { get; set; }

        public string TWExampleDateWithTimeString
        {
            get
            {
                int taiwanYear = ExampleDateWithTime.Year - 1911;
                return $"{taiwanYear}-{ExampleDateWithTime.Month:D2}-{ExampleDateWithTime.Day:D2} {ExampleDateWithTime:HH:mm:ss}";
            }
            set
            {
                if (!string.IsNullOrWhiteSpace(value))
                {
                    try
                    {
                        // 拆分日期與時間部分
                        var dateTimeParts = value.Split(' ');
                        if (dateTimeParts.Length >= 1)
                        {
                            var dateParts = dateTimeParts[0].Split('-');
                            if (dateParts.Length == 3)
                            {
                                int taiwanYear = int.Parse(dateParts[0]);
                                int year = taiwanYear + 1911;
                                int month = int.Parse(dateParts[1]);
                                int day = int.Parse(dateParts[2]);

                                int hour = 0, minute = 0, second = 0;
                                if (dateTimeParts.Length == 2)
                                {
                                    var timeParts = dateTimeParts[1].Split(':');
                                    if (timeParts.Length >= 2)
                                    {
                                        hour = int.Parse(timeParts[0]);
                                        minute = int.Parse(timeParts[1]);
                                        if (timeParts.Length == 3)
                                        {
                                            second = int.Parse(timeParts[2]);
                                        }
                                    }
                                }

                                ExampleDateWithTime = new DateTime(year, month, day, hour, minute, second);
                                return;
                            }
                        }
                    }
                    catch
                    {
                        // 若格式錯誤，設定為 MinValue 或可選擇拋出例外
                    }
                }

                ExampleDateWithTime = DateTime.MinValue;
            }
        }


    }
}
