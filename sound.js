function Sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = 'none';
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }    
}

Sound.prototype.mutePage = function() {
  
  function muteMe(elem) {
    if (elem.muted === false) {
      elem.muted = true;      
    } else elem.muted = false;
  }

  var videos = document.querySelectorAll('video'),
      audios = document.querySelectorAll('audio');  

  [].forEach.call(videos, function(video) { muteMe(video); });
  [].forEach.call(audios, function(audio) { muteMe(audio); });
}

// WARNING NEW GOOGLE AUTOPLAY POLICY 
// chrome://flags/#autoplay-policy