# 🗓 民國/西元 日期 + 時間 選擇器 Demo

此專案展示如何在 **ASP.NET Core MVC** 中整合民國（ROC）與西元日期格式選擇器，並新增 **時間選擇功能**。  
前端使用 **jQuery UI** + **Timepicker Addon**，支援動態日期與時間轉換。

![Demo](https://raw.githubusercontent.com/q020385791/TaiwanDateTimePicker/refs/heads/main/wwwroot/tt.gif)
---

## 📌 專案架構

- **Controller**：`HomeController.cs`  
- **ViewModel**：`ExampleViewModel.cs`  
- **View**：`Demo.cshtml`  
- **JavaScript 擴充插件**：`taiwan-datepicker.js`  
- **時間選擇插件**：`jquery-ui-timepicker-addon`

---

## 🔧 功能簡介

- ✅ 民國與西元格式轉換（自動轉換為 `DateTime`）
- ✅ 支援「日期 + 時間」欄位
- ✅ 表單提交後自動解析時間格式
- ✅ jQuery UI 客製化按鈕：「今天」、「清除」、「確定」
- ✅ 民國年份自動顯示（113年等）

---

## 🧪 使用方式

1. Clone 專案
2. 使用 Visual Studio 開啟
3. 還原 NuGet 套件
4. 執行後前往 `/Home/Demo` 頁面

---

## 💻 Demo.cshtml 表單範例

```html
<form asp-action="DemoSubmit" asp-controller="Home">
  <input asp-for="TWExampleDateString" id="ExampleDate" type="text" class="form-control" />
  <input asp-for="TWExampleDateWithTimeString" id="ExampleDateWithTime" type="text" class="form-control" />
  <button type="submit">送出</button>
</form>
```

---

## 📜 ViewModel 日期轉換邏輯

```csharp
// 顯示民國格式
int taiwanYear = ExampleDate.Year - 1911;
return $"{taiwanYear}-{ExampleDate.Month:D2}-{ExampleDate.Day:D2}";
```

```csharp
// 轉換民國回 DateTime
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

---

## 🔌 前端資源引入

```html
<link href="~/css/jquery-ui.css" rel="stylesheet" />
<script src="~/js/jquery.min.js"></script>
<script src="~/js/jquery-ui.min.js"></script>
<script src="~/js/jquery-ui-timepicker-addon.min.js"></script>
<script src="~/js/taiwan-datepicker.js"></script>
```

```javascript
document.addEventListener("DOMContentLoaded", function () {
  $("#ExampleDate").taiwanDatepicker();
  $("#ExampleDateWithTime").taiwanDatepickerWithTime();
});
```

---

## ⚠️ 注意事項與實作建議

### ✅ 單欄用法

```html
<input id="ExampleDate" type="text" />
```

```javascript
$("#ExampleDate").taiwanDatepicker();
```

### ✅ 多欄或動態欄位

```html
<input class="MeetDateTime" type="text" />
```

```javascript
$(".MeetDateTime").taiwanDatepicker();
```

### ✅ Model 預設值（否則轉換會失敗）

```csharp
public DateTime ExampleDate { get; set; }
```

### ✅ 民國格式例外處理建議

```csharp
catch (Exception ex)
{
    LogHelper.LogExceptionMessage(ex);
}
```

---

## 🛠️ 開發環境

- **後端框架**：ASP.NET Core MVC  
- **前端套件**：jQuery, jQuery UI, jQuery UI Timepicker Addon  
- **IDE**：Visual Studio  
- **語言**：C#, Razor, JavaScript (jQuery)

---

## 📄 授權 License

此專案僅供學習與展示用途，歡迎自由使用與修改。
