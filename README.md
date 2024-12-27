 
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

# ���v
���M�׶ȨѾǲ߻P�i�ܥγ~�A�w��ۥѨϥΡC