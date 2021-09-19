/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {
  // loadTweets();
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      const tweetElements =  createTweetElement(tweet);
      // $("#tweets-container").append(tweetElements);
      $("#tweets-container").prepend(tweetElements);
    }
  };
  function createTweetElement(obj) {
    const $tweet = `
      <article class="tweet-container">
        <header class="tweet-header">  
          <div class="identity">    
            <img src="${obj.user.avatars}">
            <h5>${obj.user.name}</h5>
          </div>   
          <h5 class="tweet-id">${obj.user.handle}</h5>
        </header>
        <p>${obj.content.text}</p>
        <footer>
          <span>${timeago.format(obj.created_at)}</span>
          <div>
            <i class="fas fa-heart"></i>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
          </div>
        </footer>
      </article>
    `;
    return $tweet;
  }
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json"
    })
      .then(function(tweets) {
        console.log("tweets -------",tweets);
        renderTweets(tweets);
      }).catch(function(err) {
        console.log(err);
      });
  };

  $('form').submit(function(event) {
    event.preventDefault();
    $('#error-msg').html("");
    $('#error').slideUp();
    const val = $('#tweet-text').val();
    if (!val) {
      // alert("Your tweet is empty.Please say something.");
      // return;
      $('#error-msg').html($(`<i class="fas fa-exclamation-triangle"></i>Your tweet is empty.Please say something.<i class="fas fa-exclamation-triangle"></i>`));
      $('#error').slideDown();
    } //else if ($(this).find('.counter').val() < 0) {
    else if (val.length > 140) {
      // alert("Your tweet characters exceeded the maximum limit!");
      // return;
      $('#error-msg').html($(`<i class="fas fa-exclamation-triangle"></i>TYour tweet characters exceeded the maximum limit! <i class="fas fa-exclamation-triangle"></i>`));
      $('#error').slideDown();
    } else {
      //
      const escaped = escape($(this).serialize());
      console.log('escaped--->', escaped);
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: escaped // this ==> form; and serialized fn turn the form data into queryString. //Jquery- need data to serialize
      })
        .then(function(response) {
          console.log("response from line 95----", response);
          loadTweets();
         
        }).catch(function(err) {
          console.log(err);
        });
  
      //fetch tweets from server
      $('#tweet-text').val(''); 
      $('#counter').val('140');
    }
    
  });
  loadTweets();

});