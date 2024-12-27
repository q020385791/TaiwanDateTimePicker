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
    }
}
