 
 # Demo �����������

���M�׮i�ܤF�ϥ� ASP.NET Core MVC ��{��²������ܾ��A����褸�P���������ഫ�\��C

---

## �M��²��

���M�ץD�n�]�t�H�U�ե�G

1. **��� (Controller)**: `HomeController.cs` - �B�z�������޿�C
2. **���ϼҫ� (ViewModel)**: `ExampleViewModel.cs` - �ʸ˨ѵ��ϨϥΪ���ơA�]�t�������榡���䴩�C
3. **���� (View)**: `Demo.cshtml` - �t�d��ܤ����ܾ��P����\�઺ Razor ���ϡC

---

## �\�໡��

- **�����ܻP�ഫ**:
  - �䴩��ܦ褸����P�������榡�C
  - �������榡�|�۰��ഫ�� `DateTime` ��������C

- **���B�z**:
  - ���Ѫ��ѨϥΪ̿�ܻP�������C
  - ��ܴ���᪺�����ơA�æ^�ǧ�s�᪺�����C

- **jQuery UI �����ܾ�**:
  - �ϥ� jQuery UI �� `datepicker` ����C
  - �ק� `datepicker` ���欰�H��ܻP�B�z����榡������C
---

## �M�׵��c

### `HomeController.cs`

`HomeController` �]�t�H�U�ާ@�G

- `Index()`: ��^���� (���d�Ҥ����@�ۭq�ƳB�z)�C
- `Demo()`: 
  - �B�z GET �ШD�A��ܤ����ܾ��A�ña�J�ثe���w�]����C
  - ��^���Ϯɷ|�ϥ� `ExampleViewModel` ���Ѹ�ơC
- `DemoSubmit()`:
  - �B�z POST �ШD�A�����ϥΪ̴��檺����C
  - �i�b�Ӥ�k���i�椤�_�I�[��檺�ȡC
  - ��^��s�᪺���ϡC

### `ExampleViewModel.cs`

�����ϼҫ��]�t�H�U���e�G

- `ExampleDate`: �Ω��x�s����� `DateTime` �ݩʡC
- `TWExampleDateString`: 
  - �@�ӭp���ݩʡA�Ω�N����ഫ������榡�C
  - �P�ɤ]�䴩�N�������榡���r���ഫ�^ `DateTime`�C

#### �������ഫ�޿�ܨҡG

```csharp
// �ഫ���������榡
int taiwanYear = ExampleDate.Year - 1911;
return $"{taiwanYear}-{ExampleDate.Month:D2}-{ExampleDate.Day:D2}";
```

```csharp
// �q�������r���ഫ�^ DateTime
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
```

# Demo.cshtml
�� Razor ���ϥ]�t�G

- �@�Ӫ��A�Ω����ϥΪ̿�ܨô������C
- jQuery UI �����ܾ��A����褸�P����榡���ഫ�C
- ������s�NĲ�o DemoSubmit ��k�C

# jQuery UI �����ܾ��ק�
�b Demo.cshtml ���ޥΤF jQuery UI �öi��ۭq�G
1.**�ޥΩһݸ귽**�G
```charp
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
```

2.**��l�ƻP�ۭq�����ܾ�**�G
```javascript
$(function () {
    $("#exampleDate").datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function (dateText, inst) {
            let taiwanYear = parseInt(dateText.split('-')[0]) - 1911;
            let taiwanDate = taiwanYear + "-" + dateText.split('-')[1] + "-" + dateText.split('-')[2];
            $("#taiwanDateDisplay").val(taiwanDate);
        }
    });

    // �N��������l�Ƭ������ܾ�����
    let initialDate = $("#exampleDate").val();
    if (initialDate) {
        let parts = initialDate.split('-');
        let westernYear = parseInt(parts[0]) + 1911;
        $("#exampleDate").datepicker("setDate", westernYear + "-" + parts[1] + "-" + parts[2]);
    }
});
```

3.**�ۭq HTML**�G
```html
<input id="exampleDate" name="ExampleDate" type="text" />
<input id="taiwanDateDisplay" type="text" readonly />
```


# �ϥΤ�k
1.�J�����M�ר쥻�a�C     
2.�ϥ� Visual Studio ���}�M�סC        
3.�T�O NuGet �M��w���\�٭�C     
4.�ظm�ùB��M�סC      
5.�b�s�������i�J /Home/Demo �����A�Y�i�d�� Demo �\��C


# ���� 
1.�������榡����G     

- ���檺����ݭn�ŦX����榡�A�Ҧp�G112-05-12�C       
�Y�榡���~�A�i��|�ɭP�ഫ���ѡC 


2. jQuery UI �����ܾ��G
- �нT�O�����w���T�ޥ� jQuery �M jQuery UI �������귽�C    
- �ۭq�����ܾ��ɡA�`�N����榡�P����~���ഫ�޿�C

# �}�o����
- �}�o�ج[: ASP.NET Core MVC
- �e�ݮج[: jQuery UI
- IDE: Visual Studio
- �y��: C# (���) �M Razor + jQuery (�e��)


# ���v
���M�׶ȨѾǲ߻P�i�ܥγ~�A�w��ۥѨϥΡC