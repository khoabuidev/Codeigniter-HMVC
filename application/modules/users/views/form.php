<html>
<head>
<title>My Form</title>
<style>
	.alertLayer {color:#FFFFFF; background:#ff7215; padding:2px 5px; overflow:hidden; display:block; position:absolute; top:-1500px; z-index: 2000; font-size: 12px; line-height: 14px;}
.alertLayer .message {color:#424242; padding:0 0 0 5px; margin:0 }


.loadmask {
    z-index: 100;
    position: absolute;
    top:0;
    left:0;
    -moz-opacity: 0.5;
    opacity: .50;
    filter: alpha(opacity=50);
    background-color: #CCC;
    width: 100%;
    height: 100%;
    zoom: 1;
}
.loadmask-msg {
    z-index: 20001;
    position: absolute;
    top: 0;
    left: 0;
    border:1px solid #6593cf;
    background: #c3daf9;
    padding:2px;
}
.loadmask-msg div {
    padding:5px 10px 5px 25px;
    background: #fbfbfb url('../images/loading.gif') no-repeat 5px 5px;
    line-height: 16px;
	border:1px solid #a3bad9;
    color:#222;
    font:normal 11px tahoma, arial, helvetica, sans-serif;
    cursor:wait;
}
.masked {
    overflow: hidden !important;
}
.masked-relative {
    position: relative !important;
}
.masked-hidden {
    visibility: hidden !important;
}

/**
    Popup
*/
.popup-overlay{position: absolute; top: 0; left: 0; background: #000; width: 100%; height: 100%;z-index:99;}
.wrapPopup,
.itemsPopup{position:absolute; top:-50000px; left:-50000px;z-index:200}
.popup { position:relative;  width:100%;}
</style>
<script src="<?php echo site_url('assets/themes/js/jquery.min.js') ?>"></script>
<script src="<?php echo site_url('assets/themes/js/libs/validate/jquery_validate.js') ?>"></script>
<script src="<?php echo site_url('assets/themes/js/libs/mask/jquery.loadmask.min.js') ?>"></script>
<script src="<?php echo site_url('assets/themes/js/libs/popup/popup_ui.js') ?>"></script>
</head>
<body>

<?php echo validation_errors(); ?>

<?php echo form_open(site_url('users'),['id' => 'frmUser']); ?>
<h1>This is user form</h1>
<h5>Username</h5>
<span class="span-validate">
<input type="text" name="username" id="username" value="<?php echo set_value('username'); ?>" size="50" />
</span>
<h5>Password</h5>
<span class="span-validate">
<input type="text" name="password" id="password" value="<?php echo set_value('password'); ?>" size="50" />
</span>
<h5>Password Confirm</h5>
<span class="span-validate">
<input type="text" name="passconf" id="passconf"  value="<?php echo set_value('passconf'); ?>" size="50" />
</span>
<h5>Email Address</h5>
<span class="span-validate">
<input type="text" name="email" id="email" value="<?php echo set_value('email'); ?>" size="50" />
</span>
<div><input type="submit" value="Submit" /></div>
<?php echo form_close() ?>

<div id="testPopup">Popup test</div>
<script type="text/javascript">
	var URL_POPUP = '<?php echo site_url('users/popup') ?>';
</script>
<script type="text/javascript" src="<?php echo site_url('assets/themes/js/main.js') ?>"></script>
</body>
</html>