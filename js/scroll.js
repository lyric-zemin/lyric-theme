/*
 * @Author: lyric 
 * @Date: 2020-01-14 13:01:49 
 * @Last Modified by: lyric
 * @Last Modified time: 2020-01-14 15:07:53
 */


 var Scroll = Object.create(null),
     record  // 记录上次current值
 const win = $(window)

 Scroll.fixed = function() {
   const HEIGHT = win.height()
   win.scroll(function() {
    let top = win.scrollTop() > HEIGHT ? HEIGHT : win.scrollTop() < 180 ? 180 : win.scrollTop()
    $('.markdown-toc.editormd-markdown-toc').css({'max-height': top })
   })
 }

 Scroll.check = function() {
   let idArr = $('.reference-link'),
       idTopArr = [], // 记录tab组offset数据
       ID
    for (let i=0; i<idArr.length; i++) {
      let _top = $(idArr[i]).offset().top
      idTopArr.push(_top )
    }
    win.on('scroll.plugin', function() {  // 通过对事件添加命名空间，以便于在pjax时移除事件
      ID && clearTimeout(ID)
      ID = setTimeout(() => {
        _checkTab(idTopArr)
      }, 100)
    })
 }

 function _checkTab(idTopArr) {
    let top = win.scrollTop(),
        targetArr = $('.markdown-toc.editormd-markdown-toc').find('a'),
        current = 0
    for (let i=0; i<idTopArr.length; i++) {
      if (top>=idTopArr[i] && top<idTopArr[i+1] || i === idTopArr.length-1) {
        current = i
        break
      }
      if(top<idTopArr[0]) {
        current = 0
        break
      }
    }
    if (record === current) {
      return
    }
    record = current
    targetArr.removeClass('on')
    $(targetArr[current]).addClass('on')
    
 }

 Scroll.init = function() {
  Scroll.fixed()
  Scroll.check()
 }

 if (Zoom.isPC()) {
  setTimeout(Scroll.init, 50)
  $(document).on('pjax:success', () => {
    win.off('scroll.plugin')
    setTimeout(Scroll.init, 50)
  })
}
