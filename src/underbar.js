var _ = {};

(function() {

  // Return an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n > array.length) {
      return array;
    } else {
      return Array.prototype.slice.call(array, array.length - n, array.length);
    }
  };

  _.first = function(array, n) {
    if (n === undefined) {
      return array[0];
    } else if (n === 0) {
      return [];
    } else if (n >= array.length) {
      return array;
    } else {
      return Array.prototype.slice.call(array, 0, array.length - 1);
    }
  };

  // Call iterator(value, key, collection) for each element of collection
  _.each = function(obj, iterator) {
    var i, key;
    var length = obj.length;
    var results = [];
    if (Array.isArray(obj)) {
      for (i=0; i<length; i++) {
        results.push(iterator(obj[i], i, obj));
      }
      return results;
    } else {
      for (key in obj) {
        if (!hasOwnProperty.call(obj, key)) continue;
        results.push(iterator(obj[key], key, obj));
      }
      return results;
    }
  };

  /*
   * TIP: Here's an example of a function that needs to iterate, which we've
   * implemented for you. Instead of using a standard `for` loop, though,
   * it uses the iteration helper `each`, which you will need to write.
   */

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = parseInt(index);
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var i;
    var length = collection.length;
    var pass = [];
    for (i=0; i<length; i++) {
      if (iterator(collection[i]) === true) {
        pass.push(collection[i]);
      }
    }
    return pass;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var i;
    var length = collection.length;
    var pass = [];
    for (i=0; i<length; i++) {
      if (iterator(collection[i]) === false) {
        pass.push(collection[i]);
      }
    }
    return pass;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var i;
    var length = array.length;
    var results = [];
    for (i=0; i<length; i++) {
      if (results.indexOf(array[i]) == -1) {
        results.push(array[i]);
      }
    }
    return results;
  };


  /*
   * map() is a useful primitive iteration function that works a lot
   * like each(), but in addition to running the operation on all
   * the members, it also maintains an array of results.
   */

  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var i;
    var length = array.length;
    var results = [];
    for (i=0; i<length; i++) {
      results[results.length] = iterator(array[i])
    }
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(obj, propertyName) {
    return _.map(obj, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName) {
    for (var i=0; i<list.length; i++) {
      list[i] = methodName.call(list[i]);
    }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(obj, iterator, initialValue) {
    if (initialValue == null) {
      initialValue = 0;
    }
    _.each(obj, function(value) {
      return initialValue = iterator(initialValue, value);
    });
    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: A lot of iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item){
      if(wasFound){
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(obj, iterator) {
    var i, flag;
    var length = obj.length;
    if (length === 0) {
      return true;
    }
    for (i=0; i<length; i++) {
      if (iterator(obj[i]) == true) {
        flag = true;
      } else {
        return false;
      }
    }
    return flag;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.any = function(obj, iterator) {
    var i, flag;
    var length = obj.length;
    if (length === 0) {
      return false;
    }
    for (i=0; i<length; i++) {
      if (iterator == null) {
        if (obj[i]) {
          return true;
        } else {
          flag = false;
        }
      } else {
        if (iterator(obj[i])) {
          return true;
        } else {
          flag = false;
        }
      }
    }
    return flag;
  };

  /*
   * These are a couple of helpers for merging objects
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  _.extend = function(obj) {
    var props, key, i;
    var length = arguments.length;
    for (i = 0; i<length; i++) {
      props = arguments[i];
      for (key in props) {
        obj[key] = props[key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var props, key, i;
    var length = arguments.length;
    for (i = 0; i<length; i++) {
      props = arguments[i];
      for (key in props) {
        if (obj[key] == null) {
        obj[key] = props[key];
        }
      }
    }
    return obj;
  };


  /*
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a `closure scope` (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memo = [];
    return function(x) {
      if (memo.hasOwnProperty(x)) {
        return memo[x];
      } else {
        return memo[x] = func(x);
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var parameters = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, parameters); }, wait);
  };


  /*
   * Advanced collection operations
   */

  // Shuffle an array.
  _.shuffle = function(obj) {
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
  };

  /* (End of pre-course curriculum) */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  _.zip = function() {
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  _.flatten = function(nestedArray, result) {
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /*
   * Offroad
   */

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  _.throttle = function(func, wait) {
  };

}).call(this);
