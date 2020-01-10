/*
 * @Author: lyric 
 * @Date: 2020-01-09 12:46:17 
 * @Last Modified by: lyric
 * @Last Modified time: 2020-01-10 11:52:05
 */


/**
 *  启用pjax功能实现页面懒加载
 */
$(function() {
  // a标签 注册pjax 
  $(document).pjax('a[target!=_blank]', { container: '#body', fragment: '#body', timeout: 5000} )
  // 链接被激活的时候触发 取消的时候阻止pjax
  $(document).on('pjax:click', () => {
      $('.loading').fadeIn()
  })
  // 无论结果如何 在ajax响应完成后触发
  $(document).on('pjax:complete', () => {
      changeNav()
      $('.loading').fadeOut()
  })
  // 浏览器前进后退替换内容之后
  $(document).on('pjax:end', () => {
      changeNav()
  })

  var changeNav = function changeNav() {
        var curNav = location.href
        $('#nav-menu a').removeClass('current')
        $('#nav-menu a').each((index, item) => {
            if ( $(item).attr('href') === curNav ) {
                $(item).addClass('current')
            }
        })
    }
})


/**
 *  点击爱心效果
 */
$(function() {
  $('head').append(`
  <style>
    .heart {
        position: relative;
        width: 20px;
        height: 15px;
        animation: fade 1.2s linear;
    }
    .heart:before,
    .heart:after {
        position: absolute;
        content: "";
        left: 10px;
        top: 0;
        width: 10px;
        height: 15px;
        background: var(--c);
        -moz-border-radius: 50% 50% 0 0;
        border-radius: 50% 50% 0 0;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
                transform: rotate(-45deg);
        -webkit-transform-origin: 0 100%;
        -moz-transform-origin: 0 100%;
            -ms-transform-origin: 0 100%;
            -o-transform-origin: 0 100%;
                transform-origin: 0 100%;
    }
    .heart:after {
        left: 0;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -o-transform: rotate(45deg);
                transform: rotate(45deg);
        -webkit-transform-origin: 100% 100%;
        -moz-transform-origin: 100% 100%;
            -ms-transform-origin: 100% 100%;
            -o-transform-origin: 100% 100%;
                transform-origin :100% 100%;
    }
  </style>
  `)
  
  $('body').click(e => {
      let {clientX: x, clientY: y} = e
      $('body').append(`<div class="heart" style="position:fixed;z-index:999;left:${x - 10}px;top:${y - 7}px;--c:rgb${rgb()}"></div>`)
      $('.heart').on('animationend', function() {
          $(this).remove()
      })
  })

  function rgb(){ //rgb颜色随机
      var r = Math.floor(Math.random()*256);
      var g = Math.floor(Math.random()*256);
      var b = Math.floor(Math.random()*256);
      var rgb = '('+r+','+g+','+b+')';
      return rgb;
  }
})


/**
 * 添加页面置顶按钮
 */
$(function() {
    $('head').append(`
        <style>
            #top {
                position:fixed;
                z-index:999;
                right:20px;
                bottom:5%;
                width: 3.5em;
                height: 3.5em;
                background:#fff;
                text-align: center;
                line-height: 3.5em;
                box-shadow: 2px 2px 10px rgba(0,0,0,0.12);
                cursor: pointer;
                animation: bounceIn .5s ease-out;
            }
        </style>
    `)
    $('body').append(`<div id="top">Top</div>`)
    $('#top').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 400)
        $('#top').css({
            animationName: 'bounceOut'
        })
    })

    var before = 0, after = 0, ID;
    // 通过判断滚轮滚动的方向显示Top按钮
    var toggleTop = function() {
        after = $(window).scrollTop()
        // 快速滑动置顶按钮才会出现
        if (after + 100 <= before) {
            $('#top').show()
        }
        if (after > before || after === 0) {
            $('#top').hide()
            $('#top').css({
                animationName: 'bounceIn'
            })
        }
        before = after
    }
    // 添加监听事件监听滚动，通过定时器节流
    $(window).scroll(function() {
        ID && clearTimeout(ID)
        ID = setTimeout(toggleTop, 50)
    })
})


/**
 * console "Lyric ❤ Echo"
 */
console.log('%cLyric ❤ Echo%c www.lyric.me',
            'line-height:28px;padding:4px;background:#3f51b5;color:#fff;font-size:14px;','padding:4px; color:#673ab7');


/** 
 * prism.js 启动 (需要editormd解析完成后执行,利用定时器延时执行)
*/
setTimeout(Prism.highlightAll, 50)
$(document).on('pjax:success', () => {
    setTimeout(Prism.highlightAll, 50)
})
