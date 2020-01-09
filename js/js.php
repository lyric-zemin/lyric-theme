<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>

<?php if ($this->pathinfo === '/archives/cursor.html') : ?>
   <script type="text/javascript">
    setTimeout(function() {
        var code = document.querySelectorAll('code');
        for (var i= 0; i< code.length; i++) {
            var _i = code[i];
            if (_i.innerText.indexOf('url') !== -1) { // 自定义cursor单独通过样式处理
                // var realpath = _i.innerText.replace(/^url\((.+)\),default/, '$1')
                _i.classList.add('url')
            } else {
                _i.style.cursor = _i.innerText.trim()
            }
        }
    }, 50)
   </script>
<?php endif; ?>