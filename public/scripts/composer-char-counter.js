$(document).ready(function() { 
  // countCharacters();
 $('#tweet-text').on('input', function(){
  // console.log('this------>', this);
  const count = $(this).val().length;
  console.log('count----->', count);
  const counter = 10 - count;
  console.log('counter----->', counter);
  //.text -it will show the output--(counter)
  $('output').text(counter);
  if(counter < 0){
    // $(this).siblings().children('.counter').addClass('counterErr')
    $('output').addClass('counterErr');
  } else {
    // $(this).siblings().children('.counter').removeClass('counterErr')
    $('output').removeClass('counterErr');
  }
 })
});