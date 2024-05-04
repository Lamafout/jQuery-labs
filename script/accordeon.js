$('.taskHeader').click(function(){
    let container = $(this).next()
    if (container.css('display') == 'flex'){
        container.slideUp('fast')
    }
    else{
        container.slideDown('fast')
        container.css('display', 'flex')

    }
})
