Обновление генератора yeogurt, работающего на gulp.</br>
Конфигурация: jade, scss, js (без автотестеров).</br>
Изменено:</br>
1) Обновлен jade до версии pug.<br>
2) Доработано автоопределение путей для scss модулей. Теперь не нужно постоянно открывать main.scss и импортировать вручную новый модуль. Установлен sassGlob, позволяющий указывать папку с модулями и другими файлами scss разных уровней переопределения.</br>
3) Добавлен coffeeScript. js компилируется в то же место, где находится coffee-файл, а потом уже летит в папку dest. Это сделано для того, чтоб с проекта можно было в любой момент отключить coffeeScript, при этом не потеряв нативных js-модулей.</br>
4) Через cdn добавлен jQuery последней версии (в layout/base.pug), но это уже мелочи.