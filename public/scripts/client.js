/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function () { 
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container 
    for (let tweet of tweets) {  
      const tweetElements =  createTweetElement(tweet)
      //  $("#tweets-container").append(tweetElements);
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
          // <span>${timeago.format(obj.created_at)}</span>
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
    $('form').submit(function(event) {
      event.preventDefault();
      if (!$(this).find('#tweet-text').val()) {
        alert("Tell me something, the tweet is empty.");
        return;
      } else if ($(this).find('.counter').val() < 0) {
        alert("Character number exceeds the maximum limit!");
        return;
      }
    $.ajax({
      url: '/tweets', 
       method: 'POST',
       data: $(this).serialize() // this ==> form; and serialized fn turn the form data into queryString.
       //Jquery- need data to serialize
     })
     .then(function(response) {
      console.log("response from line 95----", response);
    }).catch(function(err) {
      console.log(err)
    });   
  })
    //fetch tweets from server
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
          console.log(err)
        });       
    } 
   loadTweets();
});
   
