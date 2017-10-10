<?php
defined('is_running') or die('Not an entry point...');
$fileVersion = '5.1';
$fileModTime = '1507641536';
$file_stats = array (
  'created' => 1507641470,
  'gpversion' => '5.1',
  'modified' => 1507641536,
  'username' => 'admin',
);

$items = array (
  1 => 
  array (
    'type' => 'input',
    'label' => 'Your name',
    'valid' => 'req,minlength=2,maxlength=50',
    'multi_values' => '',
  ),
  2 => 
  array (
    'type' => 'input',
    'label' => 'Your phone',
    'valid' => 'maxlength=30',
    'multi_values' => '',
  ),
  3 => 
  array (
    'type' => 'input',
    'label' => 'Your e-mail',
    'valid' => 'req,email',
    'multi_values' => '',
  ),
  4 => 
  array (
    'type' => 'select',
    'label' => 'Subject',
    'valid' => 'req,minlength=2',
    'multi_values' => 'Appointment,Acknowledgment,Product Enquiry',
  ),
  5 => 
  array (
    'type' => 'textarea',
    'label' => 'Message',
    'valid' => 'req',
    'multi_values' => '',
  ),
  6 => 
  array (
    'type' => 'file',
    'label' => 'file attachment',
    'valid' => '',
    'multi_values' => '',
  ),
);

$data = array (
  'id_sendername' => 1,
  'id_senderemail' => 3,
  'id_sendersubject' => 4,
  'id_sendermessage' => 5,
  'sendcopytosender' => false,
  'message_ta_params' => 'cols="50" rows="5" style="height:20em; width:98%; border:1px solid #ccc;"',
  'Math' => 31,
  'msg_enter_letter' => 'the letter between %a and %c',
  'msg_enter_unique' => 'unique letter in',
  'Captcha' => 
  array (
    'rctheme' => 'clean',
  ),
  'aspam' => 'math',
  'WordWrap' => 50,
  'EnableCKE' => false,
  'ckValues' => 'toolbar : 
[
[\'Bold\', \'Italic\', \'Underline\', \'-\', \'Undo\', \'Redo\', \'-\', \'NumberedList\', \'BulletedList\', \'-\', \'JustifyLeft\', \'JustifyCenter\', \'JustifyRight\', \'-\',
\'Format\', \'-\', \'Link\', \'-\', \'About\']
],
toolbarLocation : \'bottom\',
toolbarStartupExpanded:\'true\',
uiColor : \'#eeeeee\',
height:\'12em\'
',
  'method' => 'smtp',
  'SMTPAuth' => false,
  'SMTPSecure' => '',
  'Host' => '',
  'Port' => 25,
  'Language' => 'en',
  'CharSet' => 'utf-8',
  'validator_errors' => 2,
  'msg_noscript' => 'Unfortunately, JavaScript is currently disabled by this browser. Please enable JavaScript for full functionality.',
  'msg_listing' => '<i>Your data that will be posted in the email:</i>',
  'msg_success' => '<b>Thank You!</b><br/>Your message was successfully sent!☺<br/>We\'ll get back to you as soon as possible.',
  'msg_fail' => '<b>Sorry</b><br/>We encountered an error, when sending your message ☹',
  'msg_rcerror' => 'The reCAPTCHA wasn\'t entered correctly. Go back and try it again. (reCAPTCHA said: [ERRORCODE])',
  'msg_presubject' => 'Message from my website: ',
  'msg_sendcopytosender' => 'Send the copy of this form also to your email',
);

