// запишем в константы контейнер и массив элементов контейнера
const menu = $('.radialMenu')
const items = $('.menuItem')
const open = $('.openMenu')

// расставляем элементы внутри контейнера, делаем событие по клику на элементы меню
items.each(function(index, item){
    $(item).css({
        left: menu.width() / 2.45 + '0px',
        top: menu.height() / 2.45 + '0px',
        opacity: 0
    })

    $(item).click(function(e){
        alert(item.innerHTML)
    })
})

// открытие контейнера по нажатию центарильной кнопки
open.css('top', menu.height() / 2 - open.height() / 2 + 'px')
open.css('left', menu.width() / 2 - open.width() / 2 + 'px')

let isOpen = false
open.click(function (e) {
    if (!isOpen) {
        // расставляем элементы внутри контейнера
        // переменная начального угла
        let angleStart = -90
        items.each(function(index, item){
            let angle = angleStart + index * (360 / items.length);
            let radius = 130;
            
            $(item).css({
                left: menu.width() / 2.45 + (radius * Math.cos(angle * Math.PI / 180)) + 'px',
                top: menu.height() / 2.45 + (radius * Math.sin(angle * Math.PI / 180)) + 'px',
                opacity: 1
            })
        })
    }
    else{
        // расставляем элементы внутри контейнера
        items.each(function(index, item){
            $(item).css({
                left: menu.width() / 2.45 + '0px',
                top: menu.height() / 2.45 + '0px',
                opacity: 0
            })
        })
    }
    
    isOpen =!isOpen
})