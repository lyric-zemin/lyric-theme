<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>

        </div><!-- end .row -->
    </div><!-- end .container -->
</div><!-- end #body -->

<footer id="footer" role="contentinfo">
    &copy; <?php echo date('Y'); ?> <a href="<?php $this->options->siteUrl(); ?>" target="_blank"><?php $this->options->title(); ?></a>
</footer><!-- end #footer -->

<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/jquery.pjax/2.0.1/jquery.pjax.min.js"></script>
<script src="<?php $this->options->themeUrl('js/prism.js'); ?>"></script>
<script src="<?php $this->options->themeUrl('js/main.js'); ?>"></script>
<script src="<?php $this->options->themeUrl('js/zoom.js'); ?>"></script>
<script src="<?php $this->options->themeUrl('js/scroll.js'); ?>"></script>

<?php $this->footer(); ?>
</body><!-- end body -->
</html>
