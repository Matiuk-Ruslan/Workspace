# Workspace

## WebService: RealtyService

* Postman: [./postman/Sandbox.postman_collection.json](./postman/Sandbox.postman_collection.json)
* Endpoint: `{{AddressSite}}/0/rest/RealtyService/GetTotalPrice`
* Logger: `select * from dbo.Logger with(nolock)`

## Install: Developer

* Версия Creatio: `8.0.6.3522_SalesEnterprise_Softkey_MSSQL_ENU`
* Настройка clio:
  * Установить название вашей среды разработки из конфигурации clio в конфигурацию workspace: 
    * Путь: `.clio/workspaceEnvironmentSettings`
      * Свойство: `Environment`
  * Подключитесь к запущеному приложению:
    * `clio ping`
  * Установить clio в приложение:
    * `clio install-gate`
  * Очистите Redis и перезапустите приложение
    * `clio flushdb`
    * `clio restart`
  * Установите рабочее пространство и пакет `Sandbox` в приложение
    * `clio pushw` 
      * ***P.S. Команду нужно выполнить в папке Workspace***
  * Очистите Redis и перезапустите приложение
    * `clio flushdb`
    * `clio restart`

## Install: User

* Пакет для установки базовыми средствами: `Sandbox_v1.0.0.zip`
* После установки пакета требуется очистка Redis и перезапуск приложения
