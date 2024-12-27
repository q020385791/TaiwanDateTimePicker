 
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

# 授權
此專案僅供學習與展示用途，歡迎自由使用。