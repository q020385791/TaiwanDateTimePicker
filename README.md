 
 # Demo 頁面說明文件

此專案展示了使用 ASP.NET Core MVC 實現的簡單日期選擇器，支持西元與民國日期的轉換功能。

---

## 專案簡介

本專案主要包含以下組件：

1. **控制器 (Controller)**: `HomeController.cs` - 處理頁面的邏輯。
2. **視圖模型 (ViewModel)**: `ExampleViewModel.cs` - 封裝供視圖使用的資料，包含民國日期格式的支援。
3. **視圖 (View)**: `Demo.cshtml` - 負責顯示日期選擇器與提交功能的 Razor 視圖。

---

## 功能說明

- **日期顯示與轉換**:
  - 支援顯示西元日期與民國日期格式。
  - 民國日期格式會自動轉換為 `DateTime` 資料類型。

- **表單處理**:
  - 提供表單供使用者選擇與提交日期。
  - 顯示提交後的日期資料，並回傳更新後的頁面。

- **jQuery UI 日期選擇器**:
  - 使用 jQuery UI 的 `datepicker` 元件。
  - 修改 `datepicker` 的行為以顯示與處理民國格式的日期。
---

## 專案結構

### `HomeController.cs`

`HomeController` 包含以下操作：

- `Index()`: 返回首頁 (本範例中未作自訂化處理)。
- `Demo()`: 
  - 處理 GET 請求，顯示日期選擇器，並帶入目前的預設日期。
  - 返回視圖時會使用 `ExampleViewModel` 提供資料。
- `DemoSubmit()`:
  - 處理 POST 請求，接收使用者提交的日期。
  - 可在該方法中進行中斷點觀察提交的值。
  - 返回更新後的視圖。

### `ExampleViewModel.cs`

此視圖模型包含以下內容：

- `ExampleDate`: 用於儲存日期的 `DateTime` 屬性。
- `TWExampleDateString`: 
  - 一個計算屬性，用於將日期轉換為民國格式。
  - 同時也支援將民國日期格式的字串轉換回 `DateTime`。

#### 民國日期轉換邏輯示例：

```csharp
// 轉換為民國日期格式
int taiwanYear = ExampleDate.Year - 1911;
return $"{taiwanYear}-{ExampleDate.Month:D2}-{ExampleDate.Day:D2}";
```

```csharp
// 從民國日期字串轉換回 DateTime
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
此 Razor 視圖包含：

- 一個表單，用於讓使用者選擇並提交日期。
- jQuery UI 日期選擇器，支持西元與民國格式的轉換。
- 提交按鈕將觸發 DemoSubmit 方法。

# jQuery UI 日期選擇器修改
在 Demo.cshtml 中引用了 jQuery UI 並進行自訂：
1.**引用所需資源**：
```charp
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
```

2.**初始化與自訂日期選擇器**：
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

    // 將民國日期初始化為日期選擇器的值
    let initialDate = $("#exampleDate").val();
    if (initialDate) {
        let parts = initialDate.split('-');
        let westernYear = parseInt(parts[0]) + 1911;
        $("#exampleDate").datepicker("setDate", westernYear + "-" + parts[1] + "-" + parts[2]);
    }
});
```

3.**自訂 HTML**：
```html
<input id="exampleDate" name="ExampleDate" type="text" />
<input id="taiwanDateDisplay" type="text" readonly />
```


# 使用方法
1.克隆此專案到本地。     
2.使用 Visual Studio 打開專案。        
3.確保 NuGet 套件已成功還原。     
4.建置並運行專案。      
5.在瀏覽器中進入 /Home/Demo 頁面，即可查看 Demo 功能。


# 提示 
1.民國日期格式限制：     

- 提交的日期需要符合民國格式，例如：112-05-12。       
若格式錯誤，可能會導致轉換失敗。 


2. jQuery UI 日期選擇器：
- 請確保頁面已正確引用 jQuery 和 jQuery UI 的相關資源。    
- 自訂日期選擇器時，注意日期格式與民國年的轉換邏輯。

# 開發環境
- 開發框架: ASP.NET Core MVC
- 前端框架: jQuery UI
- IDE: Visual Studio
- 語言: C# (後端) 和 Razor + jQuery (前端)


# 授權
此專案僅供學習與展示用途，歡迎自由使用。