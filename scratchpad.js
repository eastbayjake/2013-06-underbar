    var i;
    var length = obj.length;
    var shuffledArray = [];
    for (i=0; i<length; i++) {
      var flipper = Math.floor(Math.random() * 2)
      if (flipper = 0) {
        shuffledArray.push(obj[i]);
      } else {
        shuffledArray.unshift(obj[i]);
      }
    }
    return shuffledArray;

    for(var j, x, i = obj.length; i; j = parseInt(Math.random() * i), x = obj[--i], obj[i] = obj[j], obj[j] = x);
    return obj;