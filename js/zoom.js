/*
 * @Author: lyric 
 * @Date: 2020-01-10 13:38:14 
 * @Last Modified by: lyric
 * @Last Modified time: 2020-01-13 15:25:18
 */


/**
 * 图片放大类
 *
 * @class Zoom
 */
class Zoom {
  constructor(wrap) {
    if (this.IsPC()) {
      this.wrap = wrap
      this.init()
    } else {
      console.log('%cMobile','line-height:28px;padding:4px;background:#3f51b5;color:#fff;font-size:14px;')
    }
  }

  init() {
    var self = this
    $(this.wrap).find('img').not('.emoji').addClass('zoom-in')
    $(this.wrap).find('img').not('.emoji').click(function() {
      self._getSrc(this)
      self._createHtml()
    })
  }

  _getSrc(self) {
    this.img = $(self).attr('src')
    this.alt = $(self).attr('alt')
  }

  _createHtml() {
    var self = this
    var $wrap = $('.zoom-wrap')
    if ($wrap.length) {
      var $img = $wrap.find('img')
      $img.attr('src', self.img)
      $img.attr('alt', self.alt)
      $img.attr('class', 'slideInLeft')
      $wrap.show(0)
    } else {
      var $h = $(`
        <div class="zoom-wrap">
          <div class="zomm-inner">
            <div class="img-box">
              <img src="${self.img}" alt="${self.alt}" class="slideInLeft" />
            </div>
          </div>
        </div>
        `)
      $('body').append($h)
      self._addEvent()
    }
  }

  _addEvent() {
    var $wrap = $('.zoom-wrap'),
        $img = $wrap.find('img')
    $img.on('animationend', function() {
      if($img.attr('class') === 'slideOutLeft') { $wrap.hide(0) }
    })
    $wrap.click(function() {
      $img.attr('class', 'slideOutLeft')
    })
    $(document).on('keyup', function(e) {
      if (e.keyCode === 27) {
        $img.attr('class', 'slideOutLeft')
      }
    })
    $(window).scroll(function() {
      $img.attr('class', 'slideOutLeft')
    })
  }

  IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > -1) {
            flag = false;
            break;
        }  
    }
    return flag;
  }
}

//  实例化Zoom
 setTimeout(function() { new Zoom('.post-content') }, 50)
 $(document).on('pjax:success', () => {
  setTimeout(function() { new Zoom('.post-content') }, 50)
})
