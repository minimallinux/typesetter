<?php
defined('is_running') or die('Not an entry point...');
$fileVersion = '5.1';
$fileModTime = '1507836130';
$file_stats = array (
  'created' => 1507836120,
  'gpversion' => '5.1',
  'modified' => 1507836130,
  'username' => 'admin',
);

$file_sections = array (
  0 => 
  array (
    'type' => 'wrapper_section',
    'content' => '',
    'gp_label' => 'Section Wrapper',
    'gp_color' => '#555',
    'contains_sections' => 2,
    'attributes' => 
    array (
      'class' => 'gpRow',
    ),
  ),
  1 => 
  array (
    'type' => 'text',
    'content' => '<div><h2>Lorem Ipsum</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>',
    'attributes' => 
    array (
      'class' => ' gpCol-6',
    ),
  ),
  2 => 
  array (
    'type' => 'gallery',
    'content' => '<ul class="gp_gallery"><li><a class="gallery_gallery" data-arg="gallery_gallery" href="/Typesetter/include/imgs/default_image.jpg" data-cmd="gallery"><img src="/Typesetter/include/imgs/default_image.jpg" alt="default image" /><span class="caption">Image caption</span></a></li></ul>',
    'attributes' => 
    array (
      'class' => 'gpCol-6 gallery-theme-tiles gallery-size-xl',
    ),
    'images' => 
    array (
      0 => '/Typesetter/include/imgs/default_image.jpg',
    ),
    'captions' => 
    array (
      0 => 'Image caption',
    ),
    'modified' => 1507836130,
    'modified_by' => 'admin',
  ),
);

$meta_data = array (
  'file_number' => 12,
  'file_type' => 'gallery,text,wrapper_section',
  'gallery_dir' => '/image',
);