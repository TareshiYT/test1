$('.tile > svg').hover(function(){
  $(this).parents().toggleClass("hovered");
})
$('.tile .content').hover(function(){
  $(this).parents().toggleClass("hovered");
})